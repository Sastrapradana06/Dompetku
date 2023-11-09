'use client'
import InputComponent from "@/components/input/Input";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';
import {  searchRiwayatUser } from "@/lib/firebase/transaksi";
import { setTimeOutState } from "@/utils";
import { useState } from "react";
import AlertMessage from "@/components/alert/Alert";

export default function InputPengeluaran() {
  const [message, setMessage] = useState<boolean>(false)
  const [setDataRiwayatKeluar] = useStore(
    useShallow((state:any) => [state.setDataRiwayatKeluar])
  );

  const searchRiwayat = async (valueInput:string) => {
    if(valueInput.length >= 3) {
      const data = await searchRiwayatUser(valueInput, setDataRiwayatKeluar, 'pengeluaran')
      if(data.length !== 0) {
        setDataRiwayatKeluar(data)
      } else {
        setMessage(true)
        setTimeOutState(setMessage)
      }
    } else {
      setMessage(true)
      setTimeOutState(setMessage)
      setDataRiwayatKeluar([])
    }

  }

  return (
    <>
      <InputComponent searchRiwayat={searchRiwayat}/>
      {message ? <AlertMessage message={'Riwayat Tidak Ditemukkan'}/> : null}
    </>
  )
};
