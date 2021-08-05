import Link from 'next/link'
import React from 'react'
import styles from '../styles/Components/HeaderAdmin.module.scss'

export function HeaderAdmin(){
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <p>Watto</p>
                <Link href="/"><a>blog</a></Link>
            </div>
        </header>
    )
}