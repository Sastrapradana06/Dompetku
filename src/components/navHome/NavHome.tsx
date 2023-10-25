"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from './navHome.module.css'
import { signOutUser } from "@/lib/firebase/init";
import Sidebar from "../sidebar/Sidebar";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow'
import { usePathname } from "next/navigation";

export default function NavHome() {
  const router = useRouter();
  const pathname = usePathname()
  const navOff = ['/', '/login', '/register']
  const [isSidebar, setIsSidebar] = useStore(
    useShallow((state:any) => [state.isSidebar, state.setIsSidebar])
  );

  // console.log({pathname});
  

  const handleErrorSignOut= (callback:Function) => {
    if(callback) {
      // console.log('Berhasil', callback);
      router.push('/login')
    } else {
      console.log('error signOut');
      
    }
  }


  return (
    <>
      {navOff.includes(pathname) ? (
        null
      ) : (
        <nav className={styles.nav}>
          {/* {isSidebar ? <Sidebar /> :null} */}
          <Sidebar />
          <div className={styles.container}>
            <div className={styles.img_user} onClick={() => setIsSidebar(true)}>
            </div>
            <div className="">
              <button onClick={() => signOutUser(handleErrorSignOut)} className={styles.btn}>Sign Out</button>
            </div>
          </div>
        </nav>
      )}
    </>
  )
};
