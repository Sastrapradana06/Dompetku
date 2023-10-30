"use client";

import Link from "next/link";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getUserLogin, signInUser, signInWithGoogle } from "@/lib/firebase/init";
import PopUp from "@/components/pop-up/pop_up";

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const router = useRouter();
  //   console.log('dari login', user);
  //   if(user) {
  //     const userData = await getUserLogin(user.email)
  //     console.log({userData});
      
  //   }
  // })
  // console.log({user});

  const handleCallbackSiginGoogle = (callback:Function) => {
    setIsLoading(true)
    setError(undefined)
    setIsPopUp(true)
    if(callback) {
      console.log('succes');
      setIsLoading(false)
      router.push('/home')
    } else {
      setIsPopUp(false)
      console.log('failed');
      setError('Gagal Login')
      setIsLoading(false)
    }
  }

  const login = async (e: any) => {
    e.preventDefault();
    setError(undefined)
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    
    const handleCallbackSigin = (callback:Function) => {
      if(callback) {
        console.log('Berhasil', callback);
        e.target.reset()
        setIsLoading(false)
        setIsPopUp(true)
        router.push('/home')
      } else {
        console.log('Gagal', callback);
        setError('Harap Pastikan Data Sudah Anda Benar!')
        e.target.reset()
        setIsPopUp(false)
        setIsLoading(false)
      }
    }

    if(user.email && user.password) {
      setIsLoading(true)
      signInUser(user.email, user.password, handleCallbackSigin)
    } else {
      setError("Isi Data Anda");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {isPopUp ? <PopUp /> : null}
        <div className={styles.title}>
          <h1>Login Page</h1>
          {error ? <p className={styles.error}>{error}</p> : null}
        </div>
        <form onSubmit={login} className={styles.form}>
          <div className={styles.email}>
            <label htmlFor="">Email</label>
            <input type="email" name="email" />
          </div>
          <div className={styles.pw}>
            <label htmlFor="">Password</label>
            <input type="password" name="password" />
          </div>
          <button type="submit" className={styles.btn_login} disabled={isLoading}>
            {isLoading ? "Loading" : "Login"}
          </button>
        </form>
        <div className={styles.bottom}>
          <div className={styles.opsi_login}>
            <p>Login Dengan</p>
            <button className={styles.google} onClick={() => signInWithGoogle(handleCallbackSiginGoogle)}>Google</button>
          </div>
          <div className={styles.register}>
            <p>Belum Memiliki Akun?</p>
            <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
