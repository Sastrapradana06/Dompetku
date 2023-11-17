'use client'

import styles from './sidebar.module.css'
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow'
import Profil from './Profil';
import ListLink from './ListLink';
import { useState } from 'react';
import Image from 'next/image';
import imgUser from './imgUser.jpg'
import ShowImage from './show-image';

export default function Sidebar() {
  const [isShowImg, setIsShowImg] = useState<Boolean>(false)
  const [urlImg, setUrlImg] = useState<String | any>('/')
  const [isSidebar, setIsSidebar] = useStore(
    useShallow((state:any) => [state.isSidebar, state.setIsSidebar])
  );

  const handleShowImg = (url:any) => {
    setUrlImg(url)
    setIsShowImg(true)
  }

  return (
    <main className={isSidebar ? styles.sidebar_aktif : styles.sidebar_close} >
      {isShowImg ? (
        <ShowImage>
          <div className={styles.card_img}>
            <Image
              src={urlImg === 'none' ? imgUser : urlImg || ''}
              alt='imgUser'
              width={200}
              height={200}
            />
            <button onClick={() => setIsShowImg(false)}>Close</button>
          </div>
        </ShowImage>
      ): null}
      <div className={styles.close}>
        <button onClick={() => setIsSidebar(false)}>Close</button>      
      </div>
      <div className={styles.container}>
        <Profil handleShowImg={handleShowImg}/>
        <ListLink />
        <div className={styles.footer_sidebar}>
          <p>BisnisKu.com</p>
        </div>
      </div>
    </main>
  )
};
