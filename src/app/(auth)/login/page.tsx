"use client";

import Link from "next/link";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword, getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase/service";
import { useShallow } from "zustand/react/shallow";
import useUserStore from "@/store/store";

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [updateEmailUser] = useUserStore(useShallow((state: any) => [state.updateEmailUser]));
  const auth = getAuth(app)
  onAuthStateChanged(auth, (user) => {
    console.log(user);
  })
  // console.log({user});

  const login = async (e: any) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (user.email && user.password) {
      setIsLoading(true);
      setError(undefined)

      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then( async (userCredential) => {
          const user = userCredential.user;
          const token = await user.getIdToken()
          // console.log(token);
          document.cookie = (`token=${token}`)
          
          e.target.reset();
          setIsLoading(false);
          router.push("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          setError('Harap Pastikan Data Anda Sudah Benar!')
          e.target.reset();
          setIsLoading(false);
          console.log({ errorCode });
        });

      // const response = await fetch('/api/login', {
      //   method: "POST",
      //   body: JSON.stringify({
      //     email: user.email,
      //     password: user.password
      //   })
      // })

      // const responseBody = await response.json();
      // switch (responseBody.status) {
      //   case 200:
      //     e.target.reset()
      //     setIsLoading(false)
      //     router.push('/home')
      //     break;
      //   case 500:
      //     e.target.reset()
      //     setIsLoading(false)
      //     setError('Email Sudah Terdaftar')
      //     break;
      //   default:
      //     setError('Login Failed')
      //     break;
      // }
    } else {
      setError("Isi Data Anda");
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.container}>
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
            <button className={styles.google}>Google</button>
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
