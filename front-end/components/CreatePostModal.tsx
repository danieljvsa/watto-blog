import { useContext } from 'react'
import styles from '../styles/components/CreatePostModal.module.scss'
import { useForm } from 'react-hook-form'
import { PostsContext } from '../contexts/PostsContext'

export function CreatePostModal(){
    const {create, closeCreatePostModal} = useContext(PostsContext)
    const { register, handleSubmit } = useForm();

    async function handleSignIn(data: any) {
        await create(data)
        closeCreatePostModal()
    }

    return (
        <div className={styles.overlay}>
            <form onSubmit={handleSubmit(handleSignIn)} className={styles.container}>
                <label  className={styles.input}>
                    Image <br />
                    <input type="text" placeholder="https://t.ctcdn.com.br/8FplhVkDQdAatiUcehCimgkGJlI=/512x288/smart/i257652.jpeg" {...register('image')}/>
                </label><br />
                <label className={styles.input}>
                    Titulo <br />
                    <input type="text" placeholder="Como salvar imagens mais leves e compactas para Web no Photoshop - Canaltech" {...register('title')}/>
                </label><br />
                <label className={styles.inputAd}>
                    Post <br />
                    <textarea placeholder="O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão." {...register('post')} rows={9} cols={30}/>
                </label><br />
                <div className={styles.buttonDiv} >
                    <button type="submit">Criar</button>
                    <button onClick={closeCreatePostModal}>Cancelar</button>
                </div>
                
            </form>
        </div>
    )
}