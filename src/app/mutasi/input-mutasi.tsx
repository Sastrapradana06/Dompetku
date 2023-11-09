'use client'

import InputComponent from "@/components/input/Input";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';
import { useState } from "react";
import AlertMessage from "@/components/alert/Alert";
import { searchRiwayatUser } from "@/lib/firebase/transaksi";
import { setTimeOutState } from "@/utils";

export default function InputMutasi( ) {
  const [message, setMessage] = useState<undefined | string>(undefined)
  const [setSemuaRiwayatUser, setIsBtnResetSearch] = useStore(
    useShallow((state:any) => [state.setSemuaRiwayatUser, state.setIsBtnResetSearch])
  );
  const searchRiwayat = async (valueInput:string) => {
    if(valueInput.length >= 3) {
      const data = await searchRiwayatUser(valueInput, setSemuaRiwayatUser)
      if(data.length !== 0) {
        setSemuaRiwayatUser(data)
        setIsBtnResetSearch(true)
      } else {
        setMessage('Riwayat Tidak Ditemukkan')
        setIsBtnResetSearch(false)
        setTimeOutState(setMessage)
      }
    } else {
      setMessage('Masukkan input minimal 3 huruf/angka')
      setTimeOutState(setMessage)
    }
  }

  const handleBtnReset =  () => {
    setSemuaRiwayatUser([])
    setIsBtnResetSearch(false)
  }

  return (
    <>
    <InputComponent searchRiwayat={searchRiwayat} handleBtnReset={handleBtnReset}/>
    {message ? <AlertMessage message={message}/> : null}
  </>
  )
};
