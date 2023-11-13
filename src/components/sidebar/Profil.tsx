"use client";

import styles from "./sidebar.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProfilLoading from "../loading/profil-loading";
import imgUser from './imgUser.jpg'
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';

export default function Profil({ handleShowImg }: { handleShowImg: Function }) {
  const [user] = useStore(
    useShallow((state: any) => [state.user])
  )

  return (
    <>
      {user ? (
        <div className={styles.profil} id="profil">
          <div className={styles.img_user} onClick={() => handleShowImg(user?.image)}>
            <Image src={user?.image === 'none' ? imgUser : user?.image} alt="imgUser" width={0} height={0} />
          </div>
          <div className={styles.username}>
            <h2>{user?.name}</h2>
            <p>{user?.usaha}</p>
          </div>
        </div>
      ) : (
        <ProfilLoading />
      )}
    </>
  );
}
