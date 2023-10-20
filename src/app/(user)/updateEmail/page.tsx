"use client";
import { useState } from "react";
import styles from "./updateEmail.module.css";
import { useRouter } from "next/navigation";
import { getAuth, updateEmail, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { app } from "@/lib/firebase/service";

export default function UpdateEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const route = useRouter();

  const HandleUpdateEmail = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const valueInput = e.target.email.value;
    console.log(valueInput);

    const auth = getAuth(app);
    const users = auth.currentUser
    console.log({users});
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log({ user });
        updateEmail(user, valueInput)
          .then( async () => {
            await sendEmailVerification(user);
            setError('succes')
            e.target.reset();
            setIsLoading(false);
          })
          .catch((error) => {
            e.target.reset();
            setIsLoading(false);
            console.log(error);
          });
      } else {
        console.log("ga ada");

        // User is signed out
        // ...
      }
    });

    // try {
    //   const res = await fetch('/api/updateEmail', {
    //     method: "POST",
    //     body : JSON.stringify({
    //       newEmail: valueInput
    //     })
    //   })

    //   const resBody = await res.json()
    //   console.log({resBody});
    //   if(resBody === 200)  {
    //     // route.push('/login')
    //     e.target.reset()
    //     setIsLoading(false)
    //   } else {
    //     setError('Email Sudah Digunakan')
    //     e.target.reset()
    //     setIsLoading(false)
    //   }

    // } catch (err) {
    //   console.log(err);
    //   setIsLoading(false)
    //   e.target.reset()
    // }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={HandleUpdateEmail} className={styles.form}>
        {error ? <p>{error}</p> : null}
        <label htmlFor="">Masukkan Email Baru</label>
        <input type="email" name="email" size={35} required />
        <button type="submit" disabled={isLoading}>
          {!isLoading ? "Ubah" : "Loading"}
        </button>
      </form>
    </main>
  );
}
