import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/components/LevelUpModal.module.css'
import { useForm } from 'react-hook-form'

export function UpdateUserModal(){
    const {closeUpdateUserModal, update, currentUser} = useContext(AuthContext)
    const { register, handleSubmit } = useForm();

    async function handleSignIn(data: any) {
        await update(data)
    }

    return (
        <div className={styles.overlay}>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <label>
                    Username
                    <input type="text" defaultValue={currentUser?.username} {...register('username')}/>
                </label>
                <label>
                    Email 
                    <input type="email" defaultValue={currentUser?.email} {...register('email')}/>
                </label>
                <label>
                    <input type="checkbox" defaultValue={currentUser?.IsAdministrator} {...register('IsAdministrator')}/>
                    Administrador
                </label>
                <button type="submit">Criar</button>
                <button onClick={closeUpdateUserModal}>Cancelar</button>
            </form>
        </div>
    )
}