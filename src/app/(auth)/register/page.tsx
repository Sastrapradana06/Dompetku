'use client'

import { useRouter } from 'next/navigation'
import styles from './register.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { app } from '@/lib/firebase/service'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import useUserStore from '@/store/store'
// import { useShallow } from 'zustand/react/shallow'


export default function RegisterPage() {
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const register = async (e:any) => {
    e.preventDefault()
    const user = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirm: e.target.confirm.value,
    }

    if(user.name && user.email) {
      if(user.password === user.confirm) {
        setIsLoading(true)
        const auth = getAuth(app)
        await createUserWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
            const users = userCredential.user;
            e.target.reset()
            setIsLoading(false)
            // console.log({users});
            router.push('/login')
            
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false)
            setError('Email Sudah Terdaftar')
            e.target.reset()
          })
      } else {
        setError('Confirm Password Tidak Sama')
      }
    } else {
      setError('Isi Data Anda Dengan Benar')
      e.target.reset()
    }
    
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Register Page</h1>
          {error ? (
            <p className={styles.error}>{error}</p>
          ) : null}
        </div>
        <form onSubmit={register} className={styles.form}>
          <div className={styles.email}>
            <label htmlFor="">Username</label>
            <input type="text" name='username'/>
          </div>
          <div className={styles.email}>
            <label htmlFor="">Email</label>
            <input type="email" name='email' required/>
          </div>
          <div className={styles.pw}>
            <label htmlFor="">Password</label>
            <input type="password" name='password' required/>
          </div>
          <div className={styles.pw}>
            <label htmlFor="">Confirm Password</label>
            <input type="password" name='confirm'/>
          </div>
          <button type="submit" className={styles.btn_login} disabled={isLoading}>{isLoading ? 'Loading' : 'Register'}</button>
        </form>
        <div className={styles.bottom}>
          <div className={styles.opsi_login}>
            <p>Register Dengan</p>
            <button className={styles.google}>Google</button>
          </div>
          <div className={styles.register}>
            <p>Sudah Memiliki Akun?</p>
            <Link href={'/login'}>Login</Link>
          </div>
        </div>
      </div>
    </main>
  )
};