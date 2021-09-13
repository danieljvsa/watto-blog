import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React, { useContext, useState } from 'react'
import { HeaderAdmin } from '../../components/HeaderAdmin'
import { LoginForm } from '../../components/LoginForm'
import { PostsTable } from '../../components/PostsTable'
import { UsersTable } from '../../components/UsersTable'
import { AuthContext } from '../../contexts/AuthContext'
import styles from '../../styles/Home.module.scss'

export default function Home() {
  const {isPosts} = useContext(AuthContext)
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Dashboard | Watto</title>
      </Head>
      <HeaderAdmin />
      <main className={styles.main}> 
        {(isPosts) ? (
          <PostsTable />
        ) : (
          <UsersTable />
        )}
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