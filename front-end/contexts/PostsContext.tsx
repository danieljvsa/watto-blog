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
    user: User
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
    currentPost: Post | null
}

export const PostsContext = createContext({} as PostsContextType)

export function PostsProvider({children}: any) {
    const [posts, setPosts]  = useState([])
    const [currentPost, setCurrentPost] = useState<Post | null>(null)
    const { 'watto-uservalue': IsAdministrator } = parseCookies()
    const [isCreatePostModal, setIsCreatePostModal] = useState(false)
    const [isUpdatePostModal, setIsUpdatePostModal] = useState(false)
    

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
                if (IsAdministrator == '1') {
                    await api.put(`/posts/${currentPost.id}`, {title, post, image})
                }
                else{
                    console.log('You dont have permission')
                }
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
        if (IsAdministrator == '1') {
            await api.post(`/posts`, {title, image, post})
        }
        else{
            console.log('You dont have permission')
        }
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

    return (
        <PostsContext.Provider value={{posts, create, destroy, update, closeCreatePostModal, closeUpdatePostModal, activeCreatePostModal, activeUpdatePostModal, currentPost}}>
            {children}
            {isCreatePostModal && <CreatePostModal />}
            {isUpdatePostModal && <UpdatePostModal />}
        </PostsContext.Provider>
    )
}