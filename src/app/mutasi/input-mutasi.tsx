'use client'

import InputComponent from "@/components/input/Input";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';
import { useState } from "react";
import AlertMessage from "@/components/alert/Alert";
import { searchRiwayatUser } from "@/lib/firebase/transaksi";
import { setTimeOutState } from "@/utils";

export default function InputMutasi( ) {
  const [message, setMessage] = useState<boolean>(false)
  const [setSemuaRiwayatUser] = useStore(
    useShallow((state:any) => [state.setSemuaRiwayatUser])
  );
  const searchRiwayat = async (valueInput:string) => {
    if(valueInput.length >= 3) {
      const data = await searchRiwayatUser(valueInput, setSemuaRiwayatUser)
      if(data.length !== 0) {
        setSemuaRiwayatUser(data)
      } else {
        setMessage(true)
        setTimeOutState(setMessage)
      }
    } else {
      setMessage(true)
      setTimeOutState(setMessage)
      setSemuaRiwayatUser([])
    }
  }

  return (
    <>
    <InputComponent searchRiwayat={searchRiwayat}/>
    {message ? <AlertMessage message={'Riwayat Tidak Ditemukkan'}/> : null}
  </>
  )
};
