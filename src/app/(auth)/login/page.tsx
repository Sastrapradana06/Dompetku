"use client";

import Link from "next/link";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInUser, signInWithGoogle } from "@/lib/firebase/auth";
import PopUp from "@/components/pop-up/pop_up";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const router = useRouter();

  const [updateUser, setDataRiwayatKeluar, setDataRiwayatMasuk, clearRiwayat] = useStore(
    useShallow((state: any) => [state.updateUser, state.setDataRiwayatKeluar, state.setDataRiwayatMasuk, state.clearRiwayat])
  )

  const handleCallbackSiginGoogle = (data:any) => {
    setIsLoading(true);
    setError(undefined);
    setIsPopUp(true);
    if (data) {
      updateUser(data)
      setDataRiwayatKeluar([])
      setDataRiwayatMasuk([])
      setIsLoading(false);
      router.push("/home");
    } else {
      setIsPopUp(false);
      console.log("failed");
      setError("Gagal Login");
      setIsLoading(false);
    }
  };

  const login = async (e: any) => {
    e.preventDefault();
    setError(undefined);
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (user.email && user.password) {
      setIsLoading(true);
      signInUser(user.email, user.password, (data:any) => {
        if(data) {
          updateUser(data)
          localStorage.setItem("data-user", JSON.stringify(data));
          clearRiwayat()
          e.target.reset();
          setIsLoading(false);
          setIsPopUp(true);
          router.push("/home");
        } else {
          setError("Harap Pastikan Data Sudah Anda Benar!");
          e.target.reset();
          setIsPopUp(false);
          setIsLoading(false);
        }
      });
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
            <button className={styles.google} onClick={() => signInWithGoogle(handleCallbackSiginGoogle)}>
              Google
            </button>
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
