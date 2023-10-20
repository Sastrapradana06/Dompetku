"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from './siderbar.module.css'
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase/service";

export default function Sidebar() {
  const router = useRouter();
  const auth = getAuth(app)
  
  const handleSignOut = async () => {
    signOut(auth)
    .then(() => {
      document.cookie = ("token=")
      router.push('/login')
    }).catch((error) => {
      console.log(error.code);
      
    });

    // const res = await fetch('api/logout', {
    //   method: 'POST',
    // })

    // const response = await res.json()
    // console.log(response);
    // if(response.status === 200) {
    //   router.push('/login')
    // } else {
    //   console.log('failed logout');
    // }
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
          <button onClick={handleSignOut} className={styles.btn}>Sign Out</button>
        </div>
      </div>
    </nav>
  )
};
