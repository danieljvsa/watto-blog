import { Header } from '../components/Header'
import { MiniPost } from '../components/MiniPost'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <MiniPost />
          <MiniPost />
        </div>
      </main>
    </div>
  )
}
