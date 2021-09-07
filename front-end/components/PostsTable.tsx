import { parseCookies } from 'nookies'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { PostsContext } from '../contexts/PostsContext'
import { api } from '../services/axios'
import styles from '../styles/Components/UsersTable.module.scss'

interface User {
    id: number,
    username: string,
    password: string,
    email: string,
    IsAdministrator: number
}

export function PostsTable(){
    const {posts, destroy, activeCreatePostModal, activeUpdatePostModal} = useContext(PostsContext)

    return(
        <main className={styles.main}>
            <button onClick={activeCreatePostModal}>+ Novo Post</button>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHeader}>
                        <th>Imagem</th>
                        <th>Titulo</th>
                        <th>Post</th>
                        <th>Feito por</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.image}</td>
                            <td>{post.title}</td>
                            <td>{post.post}</td>
                            <td>{post.user.username}</td>
                            <td onClick={() => destroy(post.id)}>-</td>
                            <td onClick={() => (activeUpdatePostModal(post))}>&gt;</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}