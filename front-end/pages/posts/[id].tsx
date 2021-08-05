import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../../components/Header'
import { Post } from '../../components/Post'

import styles from '../../styles/Home.module.scss'

export default function PostPage() {
  return (
    <div className={styles.homepage}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <Post />
        </div>
      </main>
    </div>
  )
}