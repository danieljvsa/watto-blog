import Head from 'next/head'
import React from 'react'
import { Header } from '../components/Header'
import { MiniPost } from '../components/MiniPost'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | Watto</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <MiniPost />
        </div>
      </main>
    </div>
  )
}
