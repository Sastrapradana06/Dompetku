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
  const [nominal, setNominal] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [setDataRiwayatMasuk, clearRiwayatTerbaruAndsemuaRiwayat, user, updateUser] = useStore(useShallow((state: any) => [state.setDataRiwayatMasuk, state.clearRiwayatTerbaruAndsemuaRiwayat, state.user, state.updateUser]));

  const handleBtnCreate = () => {
    setIsPopUp(true);
  };


  const handleInputChange = (e:any) => {
    setMessage(undefined);
    const inputValue = parseFloat(e.target.value.replace(/[^\d]/g, '')); 
    if (!isNaN(inputValue)) {
      const formattedValue = inputValue.toLocaleString("id-ID");
      setNominal(formattedValue);
    }
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const angkaPattern = /^(\d{1,3}(\.\d{3})*(\,\d*)?|\d+(\,\d*)?)$/;
    // const regexInput = 
    setIsLoading(true)
    setMessage(undefined);

    if (e.target.nominal.value && e.target.deskripsi.value) {
      if (angkaPattern.test(e.target.nominal.value)) {
      // if (nominal.includes(regexInput)) {
        const dataUser = {
          userId: user.user_id,
          userName: user.name,
          nominal: e.target.nominal.value.replace(/\./g, ''),
          deskripsi: e.target.deskripsi.value,
        };

        await createTransaksiUser(dataUser, "pemasukkan", async (callback:any) => {
          switch (callback) {
            case "Succes":
              setMessage("Berhasil Membuat Pengeluaran Baru");

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
                updateUser(data)
              })

              setNominal('');
              setIsLoading(false)
              setIsPopUp(false);

              break;
            case "Failed Create":
              setNominal('');
              setIsLoading(false)
              setMessage("Gagal Membuat Pengeluaran Baru");
              break;
            default:
              setMessage("Error");
          }
        });
        
      } else {
        setMessage("Harap isi Input Dengan Benar!!");
        setIsLoading(false)
      }
    } else {
      setMessage("Harap isi Input");
      setIsLoading(false)
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
                <input type="text" name="nominal" value={nominal} onChange={handleInputChange}/>
              </div>
              <div className={styles.deskripsi}>
                <label htmlFor="">Deskripsi Pemasukkan</label>
                <input type="text" name="deskripsi" placeholder="Gaji" />
              </div>
              <div className={styles.btn_form}>
                <button type="submit" className={styles.btn_buat} disabled={isLoading}>
                  {isLoading ? 'Loading' : 'Buat'}
                </button>
                <button onClick={() => {setIsPopUp(false); setNominal('')}} className={styles.btn_close}>
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
