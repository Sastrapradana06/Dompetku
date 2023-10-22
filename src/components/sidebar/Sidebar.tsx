"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from './siderbar.module.css'
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase/service";
import { signOutUser } from "@/lib/firebase/init";

export default function Sidebar() {
  const router = useRouter();
  const auth = getAuth(app)

  const handleErrorSignOut= (callback:Function) => {
    if(callback) {
      // console.log('Berhasil', callback);
      router.push('/login')
    } else {
      console.log('error signOut');
      
    }
  }


  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Sidebar</h1>
        </div>
        <div className={styles.link}>
          <Link href={'/about'}>About</Link>
        </div>
        <div className="">
          <button onClick={() => signOutUser(handleErrorSignOut)} className={styles.btn}>Sign Out</button>
        </div>
      </div>
    </nav>
  )
};
