import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/components/CreateUserModal.module.scss'
import { useForm } from 'react-hook-form'

export function CreateUserModal(){
    const {closeCreateUserModal, create} = useContext(AuthContext)
    const { register, handleSubmit } = useForm();

    async function handleSignIn(data: any) {
        await create(data)
        closeCreateUserModal()
    }

    return (
        <div className={styles.overlay}>
            <form onSubmit={handleSubmit(handleSignIn)} className={styles.container}>
                <label className={styles.input} >
                    Username <br />
                    <input type="text" placeholder="username" {...register('username')}/>
                </label> <br />
                <label className={styles.input}>
                    Email <br />
                    <input type="email" placeholder="email@example.pt" {...register('email')}/>
                </label> <br />
                <label className={styles.input}>
                    Password <br />
                    <input type="password" placeholder="********" {...register('password')}/>
                </label> <br /> 
                <label className={styles.inputAd}>
                    <input type="checkbox" {...register('IsAdministrator')}/>
                    Administrador
                </label> <br /> <br />
                <div className={styles.buttonDiv}>
                    <button type="submit">Criar</button>
                    <button onClick={closeCreateUserModal}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}