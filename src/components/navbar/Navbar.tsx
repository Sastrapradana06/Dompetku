"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase/service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import useUserStore from "@/store/store";

export default function Navbar() {
  const [uid, setUid] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleSignOut = () => {
    const auth = getAuth(app);

    signOut(auth)
      .then(() => {
        // router.push('/login')
        console.log("user keluar");
        setUid(undefined);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className="">
          <h1 onClick={() => router.push("/")}>Finansial</h1>
          <p>{uid}</p>
        </div>
        <div className={styles.list}>
          <Link href={"/home"}>Home</Link>
        </div>
        <div className={styles.login}>
          {uid ? (
            <button className={styles.btn_out} onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button className={styles.btn_login}>
              <Link href={"/login"}>Login</Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
