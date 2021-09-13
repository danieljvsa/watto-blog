

import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
            <div className={styles.main_header}>
                <h3>Bem vindo, {username} </h3>
                <button onClick={activeCreateUserModal}>+ Novo Utilizador</button>
            </div>
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
                            <td onClick={() => destroy(user.id)} className={styles.delete}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></td>
                            <td onClick={() => (activeUpdateUserModal(user))} className={styles.edit}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}