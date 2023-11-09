'use client'
import InputComponent from "@/components/input/Input";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';
import { searchRiwayatUser } from "@/lib/firebase/transaksi";
import {setTimeOutState } from "@/utils";
import { useState } from "react";
import AlertMessage from "@/components/alert/Alert";

export default function InputPemasukkan() {
  const [message, setMessage] = useState<boolean>(false)
  const [setDataRiwayatMasuk] = useStore(
    useShallow((state:any) => [state.setDataRiwayatMasuk])
  );

  const searchRiwayat = async (valueInput:string) => {
    if(valueInput.length >= 3) {
      const dataRiwayatMasuk = await searchRiwayatUser(valueInput, setDataRiwayatMasuk, 'pemasukkan')
      if(dataRiwayatMasuk.length !== 0) {
        setDataRiwayatMasuk(dataRiwayatMasuk)
      } else {
        setMessage(true)
        setTimeOutState(setMessage)
      }
    } else {
      setMessage(true)
      setTimeOutState(setMessage)
      setDataRiwayatMasuk([])
    }
  }

  return (
    <>
    <InputComponent searchRiwayat={searchRiwayat}/>
    {message ? <AlertMessage message={'Riwayat Tidak Ditemukkan'}/> : null}
  </>
  )
};