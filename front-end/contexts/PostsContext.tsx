import { parseCookies } from "nookies";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/axios";
import { CreatePostModal } from "../components/CreatePostModal";
import { UpdatePostModal } from "../components/UpdatePostModal";

interface User {
    id: number,
    username: string,
    password: string,
    email: string,
    IsAdministrator: number
}

interface updateData {
    title: string,
    image: string,
    post: string,
}

interface createData {
    title: string,
    image: string,
    post: string,
}

interface Post {
    id: number,
    image: string,
    title: string,
    post: string,
    created_at: string,
    user: User,
    postDate: PostDate
}

interface PostDate{
    day: number,
    month: number,
    year: number
}

interface PostsContextType {
    posts: Post[],
    create: (data: createData) => void,
    destroy: (id: number) => void,
    update: (user: updateData) => void,
    closeCreatePostModal: () => void,
    activeCreatePostModal: () => void,
    closeUpdatePostModal: () => void,
    activeUpdatePostModal: (post: Post) => void,
    currentPost: Post | null,
    isLike: boolean,
    activeIsLike: () => void,
    value: boolean,
    search: (data: string) => Promise<void>,
    postTitle: string
}

export const PostsContext = createContext({} as PostsContextType)

export function PostsProvider({children}: any) {
    const [posts, setPosts]  = useState([])
    const [currentPost, setCurrentPost] = useState<Post | null>(null)
    const { 'watto-uservalue': IsAdministrator } = parseCookies()
    const [isCreatePostModal, setIsCreatePostModal] = useState(false)
    const [isUpdatePostModal, setIsUpdatePostModal] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [postTitle, setPostTitle] = useState('')
    const [value, setValue] = useState(false)
    
    

    useEffect(() => {
        api.get(`/posts`).then(
            res => {
                setPosts(res.data)
                
            }
        )
    }, [posts])

    async function update({title, post, image}: updateData) {
        try {
            if (currentPost != null) {
                
                await api.put(`/posts/${currentPost.id}`, {title, post, image})
                
            }
        } catch (error) {
            console.log(error)   
        }
    }

    async function destroy(id: number) {
        try {
            if (IsAdministrator == '1') {
                await api.delete(`/posts/${id}`)
                setPosts(posts.filter((post: Post) => post.id !== id))
            }
            else{
                console.log('You dont have permission')
            }   
        } catch (error) {
            console.log(error)
        }
    }

    async function create({title, image, post}: createData) {   
        await api.post(`/posts`, {title, image, post})
    }

    function putPost(post: Post){
        setCurrentPost(post)
    }

    function closeCreatePostModal(){
        setIsCreatePostModal(false)
    }

    function activeCreatePostModal(){
        setIsCreatePostModal(true)
    }

    function closeUpdatePostModal(){
        setIsUpdatePostModal(false)
    }

    function activeUpdatePostModal(post: Post){
        putPost(post)
        setIsUpdatePostModal(true)
    }

    function activeIsLike(){
        if(isLike == false){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
    }

    async function search(data: any) {
        if (data.value == "" || data.value == undefined) {
            setValue(false)
        }else{
            setValue(true)
            setPostTitle(data.value)
        }
    }

    return (
        <PostsContext.Provider value={{search ,value ,postTitle ,posts, create, destroy, update, closeCreatePostModal, closeUpdatePostModal, activeCreatePostModal, activeUpdatePostModal, currentPost, isLike, activeIsLike}}>
            {children}
            {isCreatePostModal && <CreatePostModal />}
            {isUpdatePostModal && <UpdatePostModal />}
        </PostsContext.Provider>
    )
}