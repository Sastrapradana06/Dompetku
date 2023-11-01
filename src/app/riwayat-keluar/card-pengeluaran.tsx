'use client'

import CardComponent from "@/components/card/card";
import LoadingCard from "@/components/loading/loading-card";
import { getPengeluaranUser } from "@/lib/firebase/transaksi";
import { getUserWithLocalStorage } from "@/utils";
import { useEffect, useState } from "react";

export default function CardPengeluaran() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataRiwayatKeluar, setDataRiwayatKeluar] = useState<string[]>([])

  // const handleCallback = (callback: any) => {
  //   console.log({callback});
  // } 

  // useEffect(() => {
  //   const user = getUserWithLocalStorage()
  //   console.log(user);

  //   async function getData() {
  //     if(user) {
  //       await getPengeluaranUser(user.user_id, handleCallback)
  //     }
  //   }
  //   getData()

  // }, [])

  return (
    <>
      {!isLoading ? (
        <CardComponent data={dataRiwayatKeluar}/>
      ): (
        <LoadingCard />
      )}
    </>
  )
};
