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


  return (
    <>
      {user ? (
        <div className={styles.img_user} onClick={() => handleSidebar()}>
          <Image src={user.image === "none" ? imgUser : user.image || ""} alt="imgUser" width={35} height={35} />
        </div>
      ) : (
        <div onClick={() => handleSidebar()}>
          <ImgProfilLoading />
        </div>
      )}
    </>
  )
};