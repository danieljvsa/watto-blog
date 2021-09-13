import Link from 'next/link'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { PostsContext } from '../contexts/PostsContext';
import styles from '../styles/Components/Header.module.scss'

export function Header(){
    const {value, search} = useContext(PostsContext)
    const { register, handleSubmit } = useForm();

    async function handleSignIn(data: any) {
        await search(data)
    }
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <p>Watto</p>
                <Link href="/login"><a>Login</a></Link>
            </div>
            <form className={styles.search} onSubmit={handleSubmit(handleSignIn)}>
                <input type="search" placeholder="Pesquisar no blog" {...register('value')} />
            </form>
        </header>
    )
}