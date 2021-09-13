import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parseCookies } from 'nookies'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { PostsContext } from '../contexts/PostsContext'
import { api } from '../services/axios'
import styles from '../styles/Components/PostsTable.module.scss'

export function PostsTable(){
    const {posts, destroy, activeCreatePostModal, activeUpdatePostModal} = useContext(PostsContext)

    return(
        <main className={styles.main}>
            <div className={styles.main_header}>
                <button onClick={activeCreatePostModal}>+ Novo Post</button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHeader}>
                        <th>Titulo</th>
                        <th>Post</th>
                        <th>Feito por</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td><p>{post.title}</p></td>
                            <td><p>{post.post}</p></td>
                            <td><p>{post.user.username}</p></td>
                            <td onClick={() => destroy(post.id)} className={styles.delete}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></td>
                            <td onClick={() => (activeUpdatePostModal(post))} className={styles.edit}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}