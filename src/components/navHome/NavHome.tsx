"use client";

import { useRouter } from "next/navigation";
import styles from "./navHome.module.css";
import { signOutUser} from "@/lib/firebase/init";
import Sidebar from "../sidebar/Sidebar";
import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import PopUpComponent from "../pop-up-component/pop-up-signOut";
import { getUserWithLocalStorage } from "@/utils";
import Image from "next/image";
import imgUser from '../sidebar/imgUser.jpg'


interface User {
  name: string;
  image: string ;
  usaha: string;
}


export default function NavHome() {
  const [isPopUp, setIsPopUp] = useState<Boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const router = useRouter();
  const pathname = usePathname();
  const navOff = ["/", "/login", "/register"];
  const [setIsSidebar] = useStore(useShallow((state: any) => [state.setIsSidebar]));

  const handleErrorSignOut = (callback: Function) => {
    if (callback) {
      router.push("/login");
      localStorage.clear()
    } else {
      console.log("error signOut");
    }
  };

  const handleSignOut = () => {
    signOutUser(handleErrorSignOut)
    setIsPopUp(false)
  }

  useEffect(() => {
    console.log(user);
      if (!user) {
        const userData = getUserWithLocalStorage();
        setUser(userData);
      }
  }, [user])



  return (
    <>
      {navOff.includes(pathname) ? null : (
        <nav className={styles.nav}>
          {isPopUp ? (
            <PopUpComponent>
              <div className={styles.card}>
                <div className={styles.teks_card}>
                  <p>Apakah Anda Yakin Ingin Keluar?</p>
                </div>
                <div className={styles.btn_card}>
                  <button className={styles.yakin} onClick={handleSignOut}>Yakin</button>
                  <button className={styles.tidak} onClick={() => setIsPopUp(false)}>Tidak</button>
                </div>
              </div>
            </PopUpComponent>
          ) : null}
          <Sidebar />
          <div className={styles.container}>
            <div className={styles.img_user} onClick={() => setIsSidebar(true)}>
              <Image src={user?.image === 'none' ? imgUser : user?.image || ''} alt="imgUser" width={0} height={0} />
            </div>
            <div className="">
              <button onClick={() => setIsPopUp(true)} className={styles.btn}>
                Sign Out
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
