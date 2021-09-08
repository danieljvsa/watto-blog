

import { parseCookies } from 'nookies'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { api } from '../services/axios'
import styles from '../styles/Components/UsersTable.module.scss'

interface User {
    id: number,
    username: string,
    password: string,
    email: string,
    IsAdministrator: number
}

export function UsersTable(){
    const {username, activeCreateUserModal, destroy, activeUpdateUserModal, users} = useContext(AuthContext)

    return(
        <main className={styles.main}>
            <h3>Bem vindo, {username} </h3>
            <button onClick={activeCreateUserModal}>+ Novo Utilizador</button>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHeader}>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Administrador</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{(user.IsAdministrator == 0) ? ('Não') : ('Sim') }</td>
                            <td onClick={() => destroy(user.id)}>-</td>
                            <td onClick={() => (activeUpdateUserModal(user))}>&gt;</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}