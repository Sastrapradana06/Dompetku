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

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className="">
          <h1 onClick={() => router.push("/")} className={styles.brand}>BisnisKu_</h1>
          <p>{uid}</p>
        </div>
        <div className={styles.login}>
          <button className={styles.btn_login}>
            <Link href={"/login"}>Login</Link>
          </button>
        </div>
      </div>
    </nav>
  );
}
