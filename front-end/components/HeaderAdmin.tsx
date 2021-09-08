import Link from 'next/link'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/Components/HeaderAdmin.module.scss'

export function HeaderAdmin(){
    const {isAdminBar, activePosts, isPosts, closePosts} = useContext(AuthContext)
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                {
                    (isAdminBar) ? (
                        <>
                            <Link href="/"><p>Watto</p></Link>
                            <>{
                                (isPosts) ? (
                                    <Link href="#"><a onClick={closePosts}>Users</a></Link>
                                ) : (
                                    <Link href="#"><a onClick={activePosts}>Posts</a></Link>
                                )
                            }
                            </>
                            
                        </>
                    ) :  (
                        <>
                            <p>Watto</p>
                            <Link href="/"><a>blog</a></Link>
                        </>
                    )
                }
            </div>
        </header>
    )
}