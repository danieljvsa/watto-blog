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
                <label>
                    Image
                    <input type="text" defaultValue={currentPost?.image} {...register('image')}/>
                </label>
                <label>
                    Titulo 
                    <input type="text" defaultValue={currentPost?.title} {...register('title')}/>
                </label>
                <label>
                    Post
                    <input type="textarea" defaultValue={currentPost?.post} {...register('post')}/>
                </label>
                <button type="submit">Atualizar</button>
                <button onClick={closeUpdatePostModal}>Cancelar</button>
            </form>
        </div>
    )
}


