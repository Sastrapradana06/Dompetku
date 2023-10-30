'use client'

import ButtonCreate from "@/components/button-create/button-create";
import styles from "./page.module.css";

export default function CreatePemasukkan() {

  const handleBtnCreate = () => {
    alert('create Pemasukkan')
  }

  return (
    <div className={styles.teks_head}>
      <p>Riwayat Pemasukkan Anda</p>
      <ButtonCreate handleBtnCreate={handleBtnCreate}/>
    </div>
  );
}
