"use client";

import ButtonCreate from "@/components/button-create/button-create";
import styles from "./page.module.css";
import { useState } from "react";
import PopUpComponent from "@/components/pop-up-component/pop-up-signOut";
import { createTransaksiUser, monitorRiwayatUser, updateFinanceUser } from "@/lib/firebase/db";
import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";

export default function HeaderPemasukkan() {
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [setDataRiwayatMasuk, clearRiwayatTerbaruAndsemuaRiwayat, user, updateUser] = useStore(useShallow((state: any) => [state.setDataRiwayatMasuk, state.clearRiwayatTerbaruAndsemuaRiwayat, state.user, state.updateUser]));

  const handleBtnCreate = () => {
    setIsPopUp(true);
  };

  const handleCallback = (callback: boolean) => {
    if (callback) {
      // console.log('succes create');
      setMessage("Berhasil Membuat Pemasukkan Baru");
      setIsPopUp(false);
    } else {
      console.log("gagal create");
      setMessage("Gagal Membuat Pemasukkan Baru");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const angkaPattern = /^\d+$/;
    setMessage(undefined);

    if (e.target.nominal.value && e.target.deskripsi.value) {
      if (angkaPattern.test(e.target.nominal.value)) {
        const dataUser = {
          userId: user.user_id,
          userName: user.name,
          nominal: e.target.nominal.value,
          deskripsi: e.target.deskripsi.value,
        };
        // console.log({user, dataUser});
        await createTransaksiUser(dataUser, "pemasukkan", handleCallback);
        monitorRiwayatUser(dataUser.userId, "pemasukkan", (data: any) => {
          setDataRiwayatMasuk(data);
          clearRiwayatTerbaruAndsemuaRiwayat();
        });

        const dataUpdateFinanceUser = {
          userId: user.user_id,
          saldoUser: user.saldo,
          nominalInput: parseFloat(dataUser.nominal),
          type: 'pemasukkan'
        }

        await updateFinanceUser(dataUpdateFinanceUser, (data:any) => {
          console.log({data});
          if(data) {
            updateUser(data)
          }
        })


      }
      setMessage("Harap isi Input Dengan Benar!!");
    } else {
      setMessage("Harap isi Input");
    }
  };

  return (
    <div className={styles.teks_head}>
      <p>Riwayat Pemasukkan Anda</p>
      <ButtonCreate handleBtnCreate={handleBtnCreate} />
      {isPopUp ? (
        <PopUpComponent>
          <div className={styles.pop_up}>
            <div className={styles.title}>
              <h3>{!message ? "Buat Pemasukkan Anda" : message}</h3>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
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
