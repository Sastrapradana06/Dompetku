'use client'

import ButtonCreate from "@/components/button-create/button-create";
import styles from "./page.module.css";

export default function CreatePengeluaran() {

  const handleBtnCreate = () => {
    alert('create Pengeluaran')
  }

  return (
    <div className={styles.teks_head}>
      <p>Riwayat Pengeluaran Anda</p>
      <ButtonCreate handleBtnCreate={handleBtnCreate}/>
    </div>
  );
}
