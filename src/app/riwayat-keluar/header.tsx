"use client";

import ButtonCreate from "@/components/button-create/button-create";
import styles from "./page.module.css";
import { useState } from "react";
import PopUpComponent from "@/components/pop-up-component/pop-up-signOut";
import { createTransaksiUser, monitorRiwayatUser, updateFinanceUser } from "@/lib/firebase/db";
import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";

export default function HeaderPengeluaran() {
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [nominal, setNominal] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [setDataRiwayatKeluar, clearRiwayatTerbaruAndsemuaRiwayat, user, updateUser] = useStore(
    useShallow((state: any) => [state.setDataRiwayatKeluar, state.clearRiwayatTerbaruAndsemuaRiwayat, state.user, state.updateUser])
  );
  

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

    setIsLoading(true)
    setMessage(undefined);

    if (e.target.nominal.value && e.target.deskripsi.value) {
      if (angkaPattern.test(e.target.nominal.value)) {
        const dataUser = {
          userId: user.user_id,
          userName: user.name,
          nominal: e.target.nominal.value.replace(/\./g, ''),
          deskripsi: e.target.deskripsi.value,
          dailyLimit: user.dailyLimit
        };

        await createTransaksiUser(dataUser, "pengeluaran", async (callback:any) => {
          switch (callback) {
            case "Succes":
              setMessage("Berhasil Membuat Pengeluaran Baru");

              monitorRiwayatUser(dataUser.userId, "pengeluaran", (data: any) => {
                setDataRiwayatKeluar(data);
                clearRiwayatTerbaruAndsemuaRiwayat();
      
              });
      
              const dataUpdateFinanceUser = {
                userId: user.user_id,
                saldoUser: user.saldo,
                nominalInput: parseFloat(dataUser.nominal),
                type: 'pengeluaran'
              }
      
              await updateFinanceUser(dataUpdateFinanceUser, (data:any) => {
                updateUser(data)
              })

              setNominal('');
              setIsLoading(false)
              setIsPopUp(false);
              break;

            case "Failed Create":
              setMessage("Gagal Membuat Pengeluaran Baru");
              setIsLoading(false)
              e.target.reset()
              break;

            case "Failed Limit":
              setMessage("Transaksi Mencapai Limit Harian Anda");
              setNominal('');
              setIsLoading(false)
              break;
            default:
              setMessage("Error");
          }
        });

        
      } else {
        setMessage("Harap isi Input Dengan Benar!!");
        setNominal('');
        setIsLoading(false)
      }
    } else {
      setMessage("Input Tidak Boleh Kosong!!");
      setNominal('');
      setIsLoading(false)
    }
  };

  return (
    <div className={styles.teks_head}>
      <p>Riwayat Pengeluaran Anda</p>
      <ButtonCreate handleBtnCreate={handleBtnCreate} />
      {isPopUp ? (
        <PopUpComponent>
          <div className={styles.pop_up}>
            <div className={styles.title}>
              <h3>{!message ? "Buat Pengeluaran Anda" : message}</h3>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.jumlah}>
                <label htmlFor="">Masukkan Nominal</label>
                <input type="text" name="nominal" placeholder="100000" value={nominal} onChange={handleInputChange}/>
              </div>
              <div className={styles.deskripsi}>
                <label htmlFor="">Deskripsi Pengeluaran</label>
                <input type="text" name="deskripsi" placeholder="Pulsa/ Bayar Tagihan" />
              </div>
              <div className={styles.btn_form}>
                <button type="submit" className={styles.btn_buat} disabled={isLoading}>
                  {isLoading ? 'Loading' : 'Buat'}
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
