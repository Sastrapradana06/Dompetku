"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useRef, useState, useEffect} from "react";
import avatar from "@/components/sidebar/imgUser.jpg";
import { updateProfilUser, uploadImages } from "@/lib/firebase/db";
import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import AlertMessage from "@/components/alert/Alert";
import { setTimeOutState, getUserWithLocalStorage } from "@/utils";

// const getUser:any = getUserWithLocalStorage()
export default function EditProfil() {
  const [user, updateUser] = useStore(useShallow((state: any) => [state.user, state.updateUser]));
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [urlImage, setUrlImage] = useState<string | any>(user ? user.image : '');
  const [username, setUsername] = useState<string | any>(user ? user.name : '');
  const [usaha, setUsaha] = useState<string | any>(user ? user.usaha : '');
  const [isMessage, setIsMessage] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<string | undefined>('')

  useEffect(() => {
    if(!user) {
      const getUser:any = getUserWithLocalStorage()
      if(getUser) {
        const {name, image, usaha} = getUser
        updateUser(getUser)
        setUrlImage(image)
        setUsername(name)
        setUsaha(usaha)
      }
    }
  }, [user, updateUser])


  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleBtnFile = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = async  (e: any) => {
    const file = e.target.files[0]
    const url = URL.createObjectURL(e.target.files[0])
    setUrlImage(url)
    setFile(file)

  };

  const handleSubmitUpdate = async (e:any) => {
    e.preventDefault();
    setIsLoading(true)
    const { user_id, image} = user;
    let newUrlImage = urlImage

    if(file) {
      const uploadImage = await uploadImages(file, user_id, image)
      if(uploadImage) { 
        setUrlImage(uploadImage)
        newUrlImage = uploadImage
      } else {
        setIsMessage("Gagal Perbarui Profil");
        setTimeOutState(setIsMessage)
        setIsLoading(false)
        setFile(undefined)
        return false
      }
    } 

    const dataUpdate = { userId: user_id, newUrlImage, username, usaha };
    await updateProfilUser(dataUpdate, (data: any) => {
      if (data) {
        updateUser(data);
        localStorage.setItem("data-user", JSON.stringify(data));
        setIsMessage("Profil Berhasil Diperbarui");
        setTimeOutState(setIsMessage);
      } else {
        setIsMessage("Gagal Perbarui Profil");
        setTimeOutState(setIsMessage)
      }
      setIsLoading(false)
      setFile(undefined)
    })
  }

  return (
    <div className={styles.edit_profil}>
      {isMessage ? <AlertMessage message={isMessage} /> : null}
      <div className={styles.img}>
        <div className={styles.card_img}>
          <Image src={urlImage === "none" ? avatar : urlImage || ""} alt="Image User" width={100} height={100} />
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className={styles.input_img} name="image"/>
        <button onClick={handleBtnFile}>Ganti</button>
      </div>
      <form onSubmit={handleSubmitUpdate} className={styles.form} >
        <div className={styles.username}>
          <label htmlFor="">*Ganti Username</label>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={styles.usaha}>
          <label htmlFor="">*Ganti Usaha Anda (Job Anda)</label>
          <input type="text" name="usaha" value={usaha} onChange={(e) => setUsaha(e.target.value)} />
        </div>
      <button className={styles.btn_ubah} type="submit" disabled={isLoading}>
        {isLoading ? 'Loading' : 'Ubah'}
      </button>
      </form>
    </div>
  );
}
