import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/components/LevelUpModal.module.css'
import { useForm } from 'react-hook-form'

export function CreateUserModal(){
    const {closeCreateUserModal, create} = useContext(AuthContext)
    const { register, handleSubmit } = useForm();

    async function handleSignIn(data: any) {
        await create(data)
    }

    return (
        <div className={styles.overlay}>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <label>
                    Username
                    <input type="text" placeholder="username" {...register('username')}/>
                </label>
                <label>
                    Email 
                    <input type="email" placeholder="email@example.pt" {...register('email')}/>
                </label>
                <label>
                    Password
                    <input type="password" placeholder="********" {...register('password')}/>
                </label>
                <label>
                    <input type="checkbox" {...register('IsAdministrator')}/>
                    Administrador
                </label>
                <button type="submit">Criar</button>
                <button onClick={closeCreateUserModal}>Cancelar</button>
            </form>
        </div>
    )
}