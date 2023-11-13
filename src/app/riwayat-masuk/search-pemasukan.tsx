"use client";
import InputComponent from "@/components/input/Input";
import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { searchRiwayatUser } from "@/lib/firebase/db";
import { setTimeOutState } from "@/utils";
import { useState } from "react";
import AlertMessage from "@/components/alert/Alert";

export default function SearchPemasukkan() {
  const [message, setMessage] = useState<undefined | string>(undefined);
  const [setDataRiwayatMasuk, setIsBtnResetSearch, user] = useStore(useShallow((state: any) => [state.setDataRiwayatMasuk, state.setIsBtnResetSearch, state.user]));

  const searchRiwayat = async (valueInput: string) => {
    if (valueInput.length >= 3) {
      const {user_id} = user
      const dataRiwayatMasuk = await searchRiwayatUser(valueInput, setDataRiwayatMasuk, user_id ,"pemasukkan");
      if (dataRiwayatMasuk.length !== 0) {
        setDataRiwayatMasuk(dataRiwayatMasuk);
        setIsBtnResetSearch(true);
      } else {
        setMessage("Riwayat Tidak Ditemukkan");
        setTimeOutState(setMessage);
        setIsBtnResetSearch(false);
      }
    } else {
      setMessage("Masukkan input minimal 3 huruf/angka");
      setTimeOutState(setMessage);
    }
  };

  const handleBtnReset = () => {
    setDataRiwayatMasuk([]);
    setIsBtnResetSearch(false);
  };

  return (
    <>
      <InputComponent searchRiwayat={searchRiwayat} handleBtnReset={handleBtnReset} />
      {message ? <AlertMessage message={message} /> : null}
    </>
  );
}
