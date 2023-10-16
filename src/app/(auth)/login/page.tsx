'use client'

import Link from 'next/link'
import styles from './login.module.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '@/lib/firebase/service'
import { useShallow } from 'zustand/react/shallow'
import useUserStore from '@/store/store'

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [updateEmailUser] = useUserStore(
    useShallow((state:any) => [state.updateEmailUser])
  )
  // console.log({user});

  const login = async (e:any) => {
    e.preventDefault()
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    if(user.email && user.password) {
      setIsLoading(true)

      const auth = getAuth(app)
      await signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const users = userCredential.user;
        console.log(users.uid);
        updateEmailUser(user.email)
        document.cookie = `uid=${users.uid}; path=/`

        e.target.reset()
        setIsLoading(false)
        router.push('/home')
      })
      .catch((error) => {
        console.log({error});
        setError('Data Yang Anda Masukkan Tidak Benar')
        setIsLoading(false)
      });
      
    } else {
      setError('Isi Data Anda')
    }
  }
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Login Page</h1>
          {error ? (
            <p className={styles.error}>{error}</p>
          ) : null}
        </div>
        <form onSubmit={login} className={styles.form}>
          <div className={styles.email}>
            <label htmlFor="">Email</label>
            <input type="email" name='email'/>
          </div>
          <div className={styles.pw}>
            <label htmlFor="">Password</label>
            <input type="password" name='password'/>
          </div>
          <button type="submit" className={styles.btn_login}  disabled={isLoading}>{isLoading ? 'Loading' : 'Login'}</button>
        </form>
        <div className={styles.bottom}>
          <div className={styles.opsi_login}>
            <p>Login Dengan</p>
            <button className={styles.google} >Google</button>
          </div>
          <div className={styles.register}>
            <p>Belum Memiliki Akun?</p>
            <Link href={'/register'}>Register</Link>
          </div>
        </div>
      </div>
    </main>
  )
};
