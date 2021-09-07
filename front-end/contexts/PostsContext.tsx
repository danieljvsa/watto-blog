import { parseCookies } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/axios";

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
    const { 'wattouser-username': IsAdministrator } = parseCookies()
    const [isCreatePostModal, setIsCreatePostModal] = useState(false)
    const [isUpdatePostModal, setIsUpdatePostModal] = useState(false)
    

    useEffect(() => {
        api.get(`/posts`).then(
            res => {
                setPosts(res.data)
            }
        )
    }, [])

    async function update(data: updateData) {
        if (currentPost != null) {
            if (IsAdministrator == '1') {
                await api.put(`/users/${currentPost.id}`, {data})
            }
            else{
                console.log('You dont have permission')
            }
        }
    }

    async function destroy(id: number) {
        if (IsAdministrator == '1') {
            await api.delete(`/users/${id}`)
        }
        else{
            console.log('You dont have permission')
        }
    }

    async function create(data: createData) {
        if (IsAdministrator == '1') {
            await api.post(`/posts/`, {data})
            //closeCreateUserModal()
        }
        else{
            console.log('You dont have permission')
            //closeCreateUserModal()
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
        </PostsContext.Provider>
    )
}