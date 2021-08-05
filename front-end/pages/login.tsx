import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header'
import { HeaderAdmin } from '../components/HeaderAdmin'
import { LoginForm } from '../components/LoginForm'
import { MiniPost } from '../components/MiniPost'
import styles from '../styles/Home.module.scss'

export default function Login() {
  return (
    <div className={styles.homepage}>
      <HeaderAdmin />
      <main className={styles.main}>
        <div className={styles.content}>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}