"use client";

import ButtonCreate from "@/components/button-create/button-create";
import styles from "./page.module.css";
import { useState } from "react";
import PopUpComponent from "@/components/pop-up-component/pop-up-signOut";

export default function CreatePemasukkan() {
  const [isPopUp, setIsPopUp] = useState<boolean>(false);

  const handleBtnCreate = () => {
    setIsPopUp(true);
  };

  return (
    <div className={styles.teks_head}>
      <p>Riwayat Pemasukkan Anda</p>
      <ButtonCreate handleBtnCreate={handleBtnCreate} />
      {isPopUp ? (
        <PopUpComponent>
          <div className={styles.pop_up}>
            <div className={styles.title}>
              <h3>Buat Pemasukkan Anda</h3>
            </div>
            <form action="" className={styles.form}>
              <div className={styles.jumlah}>
                <label htmlFor="">Masukkan Nominal</label>
                <input type="text" name="nominal" />
              </div>
              <div className={styles.deskripsi}>
                <label htmlFor="">Deskripsi Pemasukkan</label>
                <input type="text" name="deskripsi" placeholder="Gaji" />
              </div>
              <div className={styles.btn_form}>
                <button type="submit" className={styles.btn_buat}>
                  Buat
                </button>
                <button onClick={() => setIsPopUp(false)} className={styles.btn_close}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </PopUpComponent>
      ) : null}
    </div>
  );
}
