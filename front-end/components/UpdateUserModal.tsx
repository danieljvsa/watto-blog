import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/components/UpdateUserModal.module.scss'
import { useForm } from 'react-hook-form'

export function UpdateUserModal(){
    const {closeUpdateUserModal, update, currentUser} = useContext(AuthContext)
    const { register, handleSubmit } = useForm();

    async function handleSignIn(data: any) {
        await update(data)
        closeUpdateUserModal()
    }

    return (
        <div className={styles.overlay}>
            <form onSubmit={handleSubmit(handleSignIn)} className={styles.container}>
                <label>
                    Username
                    <input type="text" defaultValue={currentUser?.username} {...register('username')}/>
                </label>
                <label>
                    Email 
                    <input type="email" defaultValue={currentUser?.email} {...register('email')}/>
                </label>
                <label>
                    {
                    (currentUser?.IsAdministrator == 1) 
                    ? 
                    (<input type="checkbox" checked {...register('IsAdministrator')}/>) 
                    : 
                    (<input type="checkbox" {...register('IsAdministrator')}/>)}
                    Administrador
                </label>
                <button type="submit">Atualizar</button>
                <button onClick={closeUpdateUserModal}>Cancelar</button>
            </form>
        </div>
    )
}