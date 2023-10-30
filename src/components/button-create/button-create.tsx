'use client'

import styles from './button-create.module.css'
import { BsPatchPlus, BsPatchPlusFill } from "react-icons/bs";

export default function ButtonCreate({handleBtnCreate} : {handleBtnCreate: Function}) {
  return (
    <button className={styles.btn_create} onClick={() => handleBtnCreate()}>
      <BsPatchPlusFill fill="rgb(95, 137, 243)" size="20"/>
      <p>Buat Baru</p>
    </button>
  )
};