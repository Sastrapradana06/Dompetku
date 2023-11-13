"use client";

import styles from './navHome.module.css'
import imgUser from "../sidebar/imgUser.jpg";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImgProfilLoading from "../loading/img-profil-loading";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';

export default function CardImage({ handleSidebar }: { handleSidebar: Function }) {
  const [isUserProfil, setIsUserProfil] = useState<boolean>(false)
  const [user] = useStore(
    useShallow((state: any) => [state.user])
  )

  useEffect(() => {
    if(!isUserProfil) {
      setTimeout(() => {
        setIsUserProfil(true)
      }, 5000)
    }
  }, [isUserProfil])



  return (
    <>
      {user ? (
        <div className={styles.img_user} onClick={() => handleSidebar()}>
          {/* <Image src={user.image === "none" ? imgUser : user.image || ""} alt="imgUser" width={0} height={0} /> */}
          {isUserProfil ? (
            <Image src={user.image === "none" ? imgUser : user.image || ""} alt="imgUser" width={0} height={0} />
          ) : (
            <ImgProfilLoading />
          )}
        </div>
      ) : (
        <div onClick={() => handleSidebar()}>
          <ImgProfilLoading />
        </div>
      )}
    </>
  )
};