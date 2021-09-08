import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import { PostsProvider } from '../contexts/PostsContext'


function MyApp({ Component, pageProps }: AppProps) {

  return(
    <AuthProvider >
      <PostsProvider>
        <Component {...pageProps} />
      </PostsProvider>
    </AuthProvider> 
  )
}
export default MyApp
