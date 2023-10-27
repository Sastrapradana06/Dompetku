"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./navHome.module.css";
import { signOutUser } from "@/lib/firebase/init";
import Sidebar from "../sidebar/Sidebar";
import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { usePathname } from "next/navigation";
import { useState } from "react";
import PopUpComponent from "../pop-up-component/pop-up-signOut";

export default function NavHome() {
  const [isPopUp, setIsPopUp] = useState<Boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const navOff = ["/", "/login", "/register"];
  const [isSidebar, setIsSidebar] = useStore(useShallow((state: any) => [state.isSidebar, state.setIsSidebar]));

  // console.log({pathname});

  const handleErrorSignOut = (callback: Function) => {
    if (callback) {
      // console.log('Berhasil', callback);
      router.push("/login");
    } else {
      console.log("error signOut");
    }
  };

  const handleSignOut = () => {
    signOutUser(handleErrorSignOut)
    setIsPopUp(false)
  }

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
            <div className={styles.img_user} onClick={() => setIsSidebar(true)}></div>
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
