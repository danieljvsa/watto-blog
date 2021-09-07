import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/components/LevelUpModal.module.css'
import { useForm } from 'react-hook-form'
import { PostsContext } from '../contexts/PostsContext'

export function CreatePostModal(){
    const {create, closeCreatePostModal} = useContext(PostsContext)
    const { register, handleSubmit } = useForm();

    async function handleSignIn(data: any) {
        await create(data)
    }

    return (
        <div className={styles.overlay}>
            <form onSubmit={handleSubmit(handleSignIn)}>
            <label>
                    Image
                    <input type="text" placeholder="https://t.ctcdn.com.br/8FplhVkDQdAatiUcehCimgkGJlI=/512x288/smart/i257652.jpeg" {...register('image')}/>
                </label>
                <label>
                    Titulo 
                    <input type="text" placeholder="Como salvar imagens mais leves e compactas para Web no Photoshop - Canaltech" {...register('title')}/>
                </label>
                <label>
                    Post
                    <input type="textarea" placeholder="O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão." {...register('post')}/>
                </label>
                <button type="submit">Criar</button>
                <button onClick={closeCreatePostModal}>Cancelar</button>
            </form>
        </div>
    )
}