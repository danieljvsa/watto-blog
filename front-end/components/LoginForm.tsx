import Link from 'next/link'
import React, { useContext } from 'react'
import styles from '../styles/Components/Login.module.scss'
import {useForm} from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'

export function LoginForm(){
    const { register, handleSubmit } = useForm()
    const { signIn } = useContext(AuthContext)

    interface signInData{
        email: string,
        password: string
    }

    async function handleSingIn(data: signInData){
        await signIn(data)
    }

    return(
        <div className={styles.login}>
            <form onSubmit={handleSubmit(handleSingIn)}>
                <label className={styles.input}>
                    Email <br />
                    <input type="email" placeholder="example@example.pt" {...register('email')} /> <br />
                </label>
                <label className={styles.input}>
                    Password <br />
                    <input type="password" placeholder="*******" {...register('password')} /> <br />
                </label>
                <div className={styles.button_div}>
                    <button type="submit">
                        <Link href="/login">
                            <a>Entrar</a>
                        </Link>
                    </button>
                </div>
            </form>
        </div>
    )
}