import { parseCookies } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/axios";

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
    post: string
}

interface PostsContextType {
    posts: Post[]
}

export const PostsContext = createContext({} as PostsContextType)

export function PostsProvider({children}: any) {
    const [posts, setPosts]  = useState([])
    const [currentPost, setCurrentPost] = useState<Post | null>(null)
    const { 'wattouser-username': IsAdministrator } = parseCookies()

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

    return (
        <PostsContext.Provider value={{posts}}>
            {children}
        </PostsContext.Provider>
    )
}