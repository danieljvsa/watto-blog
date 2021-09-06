import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from 'nookies'
import Router  from 'next/router'
import {api} from '../services/axios'
import { CreateUserModal } from "../components/CreateUserModal";
import { UpdateUserModal } from "../components/UpdateUserModal";



interface AuthContextType {
    isAuthenticated: boolean,
    signIn: ({email, password}: signInData) => void,
    create: (data: createData) => void,
    closeCreateUserModal: () => void,
    activeCreateUserModal: () => void,
    destroy: (id: number) => void,
    putUser: (user: User) => void,
    update: (user: updateData) => void, 
    closeUpdateUserModal: () => void,
    activeUpdateUserModal: (user: User) => void,
    user: User | null,
    username: string,
    currentUser: User | null
   
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
   
    const isAuthenticated = !!user

    useEffect(() => {
        const { 'wattouser-username': username } = parseCookies()
        if (username) {
            setUsername(username)
        }
    })    

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
            }
        )
        Router.push('/admin/dashboard')
       
    }

    function putUser(user: User){
        setCurrentUser(user)
    }

    async function update(data: updateData) {
        if (currentUser != null) {
            if (user?.IsAdministrator == 1) {
                await api.put(`/users/${currentUser.id}`, {data})
            }
            else{
                console.log('You dont have permission')
            }
        }
    }

    async function destroy(id: number) {
        if (user?.IsAdministrator == 1) {
            await api.delete(`/users/${id}`)
        }
        else{
            console.log('You dont have permission')
        }
    }

    async function create(data: createData) {
        if (user?.IsAdministrator == 1) {
            await api.post(`/users/`, {data})
            closeCreateUserModal()
        }
        else{
            console.log('You dont have permission')
            closeCreateUserModal()
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

    return (
        <AuthContext.Provider value={{isAuthenticated, signIn, user, username, create, closeCreateUserModal, activeCreateUserModal, destroy, update, putUser, currentUser, closeUpdateUserModal, activeUpdateUserModal }}>
            {children}
            {isCreateUserModal && <CreateUserModal />}
            {isUpdateUserModal && <UpdateUserModal />}
        </AuthContext.Provider>
    )
}