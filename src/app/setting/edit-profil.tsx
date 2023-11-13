'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useRef, useState } from 'react'
import avatar from '@/components/sidebar/imgUser.jpg'
import { updateProfilUser } from '@/lib/firebase/db'
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';


// const dataUser = getUserWithLocalStorage()
export default function EditProfil() {
  const [user, updateUser] = useStore(
    useShallow((state: any) => [state.user, state.updateUser])
  )
  
  const [urlImage, setUrlImage] = useState<string | any>(user ? user.image : '')
  const [username, setUsername] = useState<string | any>(user ? user.name : '')
  const [usaha, setUsaha] = useState<string | any>(user ? user.usaha : '')


  // console.log({dataUser, urlImage});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleBtnFile = () => {
    if(fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleFileChange = (e:any) => {
    const file = URL.createObjectURL(e.target.files[0])
    setUrlImage(file)
    console.log({urlImage});
  }

  const updateUserData = async () => {
    const {user_id} = user
    const dataUpdate = {userId:user_id, urlImage, username, usaha}
    await updateProfilUser(dataUpdate, (data:any) => {
      if(data) {
        updateUser(data)
        localStorage.setItem("data-user", JSON.stringify(data));
        console.log('berhasil update');
      } else {
        console.log('gagal update');
      }
    })
  }

  return (
    <div className={styles.edit_profil}>
      <div className={styles.img}>
        <div className={styles.card_img}>
          <Image 
            src={urlImage === "none" ? avatar : urlImage|| ""}
            alt='Image User'
            width={0}
            height={0}
          />
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className={styles.input_img}/>
        <button onClick={handleBtnFile}>Ganti</button>
      </div>
      <div className={styles.form}>
        <div className={styles.username}>
          <label htmlFor="">*Ganti Username</label>
          <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={styles.usaha}>
          <label htmlFor="">*Ganti Nama Usaha(optional)</label>
          <input type="text" name='usaha' value={usaha} onChange={(e) => setUsaha(e.target.value)}/>
        </div>
      </div>
      <button className={styles.btn_ubah} onClick={updateUserData}>Ubah</button>
    </div>
  )
};
