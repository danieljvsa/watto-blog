import Link from 'next/link'
import React from 'react'
import styles from '../styles/Components/Login.module.scss'

export function LoginForm(){
    return(
        <div className={styles.login}>
            <form action="" method="post">
                <label className={styles.input}>
                    Email <br />
                    <input type="email" placeholder="example@example.pt" /> <br />
                </label>
                <label className={styles.input}>
                    Password <br />
                    <input type="password" placeholder="*******" /> <br />
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