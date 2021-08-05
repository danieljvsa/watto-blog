import Link from 'next/link'
import React from 'react'
import styles from '../styles/Components/Header.module.scss'

export function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <p>Watto</p>
                <Link href="/"><a>blog</a></Link>
            </div>
            <div className={styles.search}>
                <input type="search" placeholder="Pesquisar no blog"/>
            </div>
        </header>
    )
}