import Link from 'next/link'
import React from 'react'
import styles from '../styles/Components/Post.module.scss'

export function Post(){
    return(
        <div className={styles.post}>
            <div className={styles.img}>
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80" alt="Image post" />
            </div>
            <div className={styles.header_post}>
                <span>02 de Julho de 2021</span>
                <img src="/assets/heart-icon.svg" alt="heart" className={styles.like} />
            </div>
            <div className={styles.body_post}>
                <h3 className={styles.title}>Agora é oficial: o Windows 11 está vindo</h3>
                <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vestibulum auctor est. Nam vitae finibus ante. Duis lobortis tellus vel diam fringilla, eu ullamcorper ex iaculis.</p>
            </div>
        </div>
    )
}