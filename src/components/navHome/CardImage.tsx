"use client";
import { getUserWithLocalStorage } from "@/utils";
import styles from './navHome.module.css'
import imgUser from "../sidebar/imgUser.jpg";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImgProfilLoading from "../loading/img-profil-loading";

interface User {
  image: string;
}
export default function CardImage({ handleSidebar }: { handleSidebar: Function }) {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    console.log(user);
      if (!user) {
        const userData = getUserWithLocalStorage();
        setUser(userData);
      }
  }, [user])

  return (
    <>
      {user ? (
        <div className={styles.img_user} onClick={() => handleSidebar()}>
          <Image src={user?.image === "none" ? imgUser : user?.image || ""} alt="imgUser" width={0} height={0} />
        </div>
      ) : (
        <div onClick={() => handleSidebar()}>
          <ImgProfilLoading />
        </div>
      )}
    </>
  )
};