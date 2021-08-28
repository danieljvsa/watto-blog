import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React from 'react'
import { HeaderAdmin } from '../../components/HeaderAdmin'
import { LoginForm } from '../../components/LoginForm'
import { UsersTable } from '../../components/UsersTable'
import styles from '../../styles/Home.module.scss'

export default function Home() {
    
  return (
    <div className={styles.homepage}>
      <HeaderAdmin />
      <main className={styles.main}> 
          <UsersTable />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {['wattoauth-token']: token} = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }

    }

  }

  return{
    props: {}
  }
}