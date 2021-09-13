import Head from 'next/head'
import { HeaderAdmin } from '../components/HeaderAdmin'
import { LoginForm } from '../components/LoginForm'
import styles from '../styles/Home.module.scss'

export default function Login() {
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Login | Watto</title>
      </Head>
      <HeaderAdmin />
      <main className={styles.main}>
        <div className={styles.content}>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}