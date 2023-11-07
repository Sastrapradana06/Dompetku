'use client'
import InputComponent from "@/components/input/Input";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';
import { getRiwayatUser } from "@/lib/firebase/transaksi";
import { filteredItems, getUserWithLocalStorage } from "@/utils";
import { useState } from "react";
import AlertMessage from "@/components/alert/Alert";

export default function InputPengeluaran() {
  const [message, setMessage] = useState<boolean>(false)
  const [setDataRiwayatKeluar] = useStore(
    useShallow((state:any) => [state.setDataRiwayatKeluar])
  );

  const getRiwayat = async (valueInput:string) => {
    const user = getUserWithLocalStorage();
    const dataRiwayat = await getRiwayatUser(user.user_id, 'pengeluaran');
    if(dataRiwayat) {
      setDataRiwayatKeluar(dataRiwayat)
      // const filterRiwayat = dataRiwayat.filter((data:any) => {
      //   const tanggalItem = data.tanggal.toLowerCase();
      //   const deskripsiItem = data.deskripsi.toLowerCase();
      //   const valueInput = teks.toLowerCase()
  
      //   if (tanggalItem.includes(valueInput) || deskripsiItem === valueInput) {
      //     return true
      //   }
      //   return false
      // })
      const filterRiwayat = filteredItems(dataRiwayat, valueInput)
      console.log({filterRiwayat});
      
      if(filterRiwayat.length !== 0) {
        setDataRiwayatKeluar(filterRiwayat)
      } else {
        setMessage(true)
        setTimeout(() => {
          setMessage(false)
        }, 3000);
      }
    }
  }

  return (
    <>
      <InputComponent getRiwayat={getRiwayat}/>
      {message ? <AlertMessage message={'Riwayat Tidak Ditemukkan'}/> : null}
    </>
  )
};
