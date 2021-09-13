import { far } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import React, { useContext } from 'react'
import { PostsContext } from '../contexts/PostsContext'
import styles from '../styles/Components/MiniPost.module.scss'

export function MiniPost(){
    const {posts, isLike, activeIsLike, postTitle} = useContext(PostsContext)

    interface PostDate{
        day: number,
        month: number,
        year: number
    }

    interface User {
        id: number,
        username: string,
        password: string,
        email: string,
        IsAdministrator: number
    }

    interface Post {
        id: number,
        image: string,
        title: string,
        post: string,
        created_at: Date,
        user: User,
        postDate: PostDate
    }

    function handlePost(post: Post){
        
        /*let day = post.created_at.getDate()
        let month  = post.created_at.getMonth()
        let year = post.created_at.getUTCFullYear()

        let postDate = post.postDate = {day, month, year}
        console.log(postDate)*/
        console.log(post.created_at)
        //return postDate
    }
    
    return(
        <>
            {posts.map( post =>(
                (post.title.toLowerCase().includes(postTitle.toLowerCase())) ? (
                    
                    <div className={styles.post} key={post.id}>
                        <div className={styles.img}>
                            <img src={post.image} alt="Image post" />
                        </div>
                        <div className={styles.header_post}>
                            <span>{post.created_at.substring(0, 10)}</span>
                            <i className={styles.like} onClick={activeIsLike}><FontAwesomeIcon icon={(isLike == false) ? faHeart : solidHeart } ></FontAwesomeIcon></i>
                        </div>
                        <div className={styles.body_post}>
                            <h3 className={styles.title}><Link href="/"><a>{post.title}</a></Link></h3>
                            <p className={styles.description}>{post.post}</p>
                        </div>
                    </div>
                ) : (
                    ""
                )
            ))}
        </>
    )
}