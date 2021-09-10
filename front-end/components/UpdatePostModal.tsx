import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/components/UpdatePostModal.module.scss'
import { useForm } from 'react-hook-form'
import { PostsContext } from '../contexts/PostsContext'

export function UpdatePostModal(){
    const {update, currentPost, closeUpdatePostModal} = useContext(PostsContext)
    const { register, handleSubmit } = useForm();

    async function handleSignIn(data: any) {
        await update(data)
        closeUpdatePostModal()
    }

    return (
        <div className={styles.overlay}>
            <form onSubmit={handleSubmit(handleSignIn)} className={styles.container}>
                <label className={styles.input}>
                    Image <br />
                    <input type="text" defaultValue={currentPost?.image} {...register('image')}/>
                </label> <br />
                <label className={styles.input}>
                    Titulo <br />
                    <input type="text" defaultValue={currentPost?.title} {...register('title')}/>
                </label> <br />
                <label className={styles.inputAd}>
                    Post <br />
                    <textarea defaultValue={currentPost?.post} {...register('post')} rows={9} cols={30}/>
                </label> <br />
                <div className={styles.buttonDiv}>
                    <button type="submit">Atualizar</button>
                    <button onClick={closeUpdatePostModal}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}


