'use client'

import ButtonCreate from "@/components/button-create/button-create";
import styles from "./page.module.css";
import { useState } from "react";
import PopUpComponent from "@/components/pop-up-component/pop-up-signOut";
import { getUserWithLocalStorage } from "@/utils";
import { createTransaksiUser, monitorRiwayatUser } from "@/lib/firebase/transaksi";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';

export default function HeaderPengeluaran() {
  const [isPopUp, setIsPopUp] = useState<boolean>(false)
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [setDataRiwayatKeluar, clearRiwayatTerbaruAndsemuaRiwayat] = useStore(
    useShallow((state:any) => [state.setDataRiwayatKeluar, state.clearRiwayatTerbaruAndsemuaRiwayat])
  );

  const handleBtnCreate = () => {
    setIsPopUp(true)
  }

  const handleCallback = (callback: boolean) => {
    if(callback) {
      // console.log('succes create');
      setMessage('Berhasil Membuat Pengeluaran Baru')
      setIsPopUp(false)
    } else {
      console.log('gagal create');
      setMessage('Gagal')
    }
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const user = getUserWithLocalStorage()
    const angkaPattern = /^\d+$/;
    setMessage(undefined)

    if(e.target.nominal.value && e.target.deskripsi.value) {
      if(angkaPattern.test(e.target.nominal.value)) {
        const dataUser = {
          userId: user.user_id,
          userName: user.name,
          nominal: e.target.nominal.value,
          deskripsi: e.target.deskripsi.value
        }
        // console.log({user, dataUser});
        await createTransaksiUser(dataUser, "pengeluaran", handleCallback)
        monitorRiwayatUser(dataUser.userId, "pengeluaran", (data:any) => {
          setDataRiwayatKeluar(data)
          clearRiwayatTerbaruAndsemuaRiwayat()
        })  
        
      }
      setMessage('Harap isi Input Dengan Benar!!')
    } else {
      setMessage('Input Tidak Boleh Kosong!!')
    }
  }

  return (
    <div className={styles.teks_head}>
      <p>Riwayat Pengeluaran Anda</p>
      <ButtonCreate handleBtnCreate={handleBtnCreate}/>
      {isPopUp ? (
        <PopUpComponent>
          <div className={styles.pop_up}>
            <div className={styles.title}>
              <h3>{!message ? 'Buat Pengeluaran Anda': message}</h3>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.jumlah}>
                <label htmlFor="">Masukkan Nominal</label>
                <input type="text" name="nominal" placeholder="100000"/>
              </div>
              <div className={styles.deskripsi}>
                <label htmlFor="">Deskripsi Pengeluaran</label>
                <input type="text" name="deskripsi" placeholder="Pulsa/ Bayar Tagihan"/>
              </div>
              <div className={styles.btn_form}>
                <button type="submit" className={styles.btn_buat}>Buat</button>
                <button onClick={() => setIsPopUp(false)} className={styles.btn_close}>Close</button>
              </div>
            </form>
          </div>
        </PopUpComponent>
      ): null}
    </div>
  );
}