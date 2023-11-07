'use client'
import InputComponent from "@/components/input/Input";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';
import { getRiwayatUser } from "@/lib/firebase/transaksi";
import { filteredItems, getUserWithLocalStorage } from "@/utils";
import { useState } from "react";
import AlertMessage from "@/components/alert/Alert";

export default function InputPemasukkan() {
  const [message, setMessage] = useState<boolean>(false)
  const [setDataRiwayatMasuk] = useStore(
    useShallow((state:any) => [state.setDataRiwayatMasuk])
  );

  const getRiwayat = async (valueInput:string) => {
    const user = getUserWithLocalStorage();
    const dataRiwayat = await getRiwayatUser(user.user_id, 'pemasukkan');
    if(dataRiwayat) {
      setDataRiwayatMasuk(dataRiwayat)
      const filterRiwayat = filteredItems(dataRiwayat, valueInput)
      console.log({filterRiwayat});
      
      if(filterRiwayat.length !== 0) {
        setDataRiwayatMasuk(filterRiwayat)
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