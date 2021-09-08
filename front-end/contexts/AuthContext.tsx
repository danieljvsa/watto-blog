import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from 'nookies'
import Router  from 'next/router'
import {api} from '../services/axios'
import { CreateUserModal } from "../components/CreateUserModal";
import { UpdateUserModal } from "../components/UpdateUserModal";



interface AuthContextType {
    signIn: ({email, password}: signInData) => void,
    create: (data: createData) => void,
    closeCreateUserModal: () => void,
    activeCreateUserModal: () => void,
    destroy: (id: number) => void,
    putUser: (user: User) => void,
    update: (user: updateData) => void, 
    closeUpdateUserModal: () => void,
    activeUpdateUserModal: (user: User) => void,
    closePosts: () => void,
    activePosts: () => void,
    isPosts: boolean,
    isAdminBar: boolean,
    user: User | null,
    username: string,
    currentUser: User | null,
    users: User[]
   
}

interface signInData{
    email: string,
    password: string
}

interface updateData {
    username: string,
    email: string,
    IsAdministrator: number
}

interface createData {
    username: string,
    password: string,
    email: string,
    IsAdministrator: number
}

interface User {
    id: number,
    username: string,
    password: string,
    email: string,
    IsAdministrator: number
}

export const AuthContext = createContext({} as AuthContextType)


export function AuthProvider({children}: any) {
    const [user, setUser] = useState<User | null>(null)
    const [username, setUsername] = useState('')
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [isCreateUserModal, setIsCreateUserModal] = useState(false)
    const [isUpdateUserModal, setIsUpdateUserModal] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [isPosts, setIsPosts] = useState(false)
    const [isAdminBar, setIsAdminBar] = useState(false)

    const isAuthenticated = !!user

    useEffect(() => {
        const { 'wattouser-username': username } = parseCookies()
        api.get('/users').then(res => {
            setUsers(res.data)
        })
        if (username) {
            setUsername(username)
        }
    }, [users])    

    async function signIn({email, password}: signInData) {
        
        await api.post('/authenticate', {email, password}).then(
            res => {
                setUser(res.data.user)
                setCookie(undefined, 'wattoauth-token', res.data.token.token, {
                    maxAge: 60 * 60 * 1 // 1 hour
                })
                setCookie(undefined, 'wattouser-username', res.data.user.username, {
                    maxAge: 60 * 60 * 1 // 1 hour
                })
                setCookie(undefined, 'watto-uservalue', res.data.user.IsAdministrator, {
                    maxAge: 60 * 60 * 1 // 1 hour
                })

                api.defaults.headers['Authorization'] = `Bearer ${res.data.token.token}`
                setIsAdminBar(true)
            }
        )
        Router.push('/admin/dashboard')
       
    }

    function putUser(user: User){
        setCurrentUser(user)
    }

    async function update({email, IsAdministrator, username}: updateData) {
        try {
            if (currentUser != null) {
                if (user?.IsAdministrator == 1) {
                    await api.put(`/users/${currentUser.id}`, {email, IsAdministrator, username})
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
        if (user?.IsAdministrator == 1) {
            await api.delete(`/users/${id}`)
            setUsers(users.filter((user: User) => user.id !== id))
        }
        else{
            console.log('You dont have permission')
        }
    }

    async function create({email, password, username, IsAdministrator}: createData) {
        try {
            if (user?.IsAdministrator == 1) {
                await api.post(`/register`, {email, password, username, IsAdministrator})
                
            }
            else{
                console.log('You dont have permission')
            }
        } catch (error) {
            console.log(error)
        }
    }

    function closeCreateUserModal(){
        setIsCreateUserModal(false)
    }

    function activeCreateUserModal(){
        setIsCreateUserModal(true)
    }

    function closeUpdateUserModal(){
        setIsUpdateUserModal(false)
    }

    function activeUpdateUserModal(user: User){
        putUser(user)
        setIsUpdateUserModal(true)
    }

    function activePosts(){
        setIsPosts(true)
    }

    function closePosts(){
        setIsPosts(false)
    }

    return (
        <AuthContext.Provider value={{ isPosts, activePosts, closePosts, isAdminBar, signIn, user, username, create, closeCreateUserModal, activeCreateUserModal, destroy, update, putUser, currentUser, closeUpdateUserModal, activeUpdateUserModal, users }}>
            {children}
            {isCreateUserModal && <CreateUserModal />}
            {isUpdateUserModal && <UpdateUserModal />}
        </AuthContext.Provider>
    )
}