import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from 'nookies'
import Router  from 'next/router'
import {api} from '../services/axios'


interface AuthContextType {
    isAuthenticated: boolean,
    signIn: ({email, password}: signInData) => void,
    user: User | null,
    currentUser: string
   
}

interface signInData{
    email: string,
    password: string
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
    const [currentUser, setCurrentUser] = useState('')
   
    const isAuthenticated = !!user

    useEffect(() => {
        const { 'wattoauth-token': token } = parseCookies()
        const { 'wattouser-username': username } = parseCookies()
        if (username) {
            setCurrentUser(username)
        }
        
        
        
    })    

    function signIn({email, password}: signInData) {
        
        api.post('/authenticate', {email, password}).then(
            res => {
                setUser(res.data.user)
                setCookie(undefined, 'wattoauth-token', res.data.token.token, {
                    maxAge: 60 * 60 * 1 // 1 hour
                })
                setCookie(undefined, 'wattouser-username', res.data.user.username, {
                    maxAge: 60 * 60 * 1 // 1 hour
                })

                api.defaults.headers['Authorization'] = `Bearer ${res.data.token.token}`
            }
        )
        Router.push('/admin/dashboard')
       
    }


    return (
        <AuthContext.Provider value={{isAuthenticated, signIn, user, currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}