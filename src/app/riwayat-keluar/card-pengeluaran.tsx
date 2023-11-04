"use client";

import CardComponent from "@/components/card/card";
import LoadingCard from "@/components/loading/loading-card";
import { getRiwayatUser } from "@/lib/firebase/transaksi";
import { getUserWithLocalStorage } from "@/utils";
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';

export default function CardPengeluaran() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataRiwayatKeluar, setDataRiwayatKeluar] = useStore(
    useShallow((state:any) => [state.dataRiwayatKeluar, state.setDataRiwayatKeluar])
  );

  // console.log({ dataRiwayatKeluar });
  useEffect(() => {
    async function getData() {
      if(dataRiwayatKeluar.length === 0) {
        setIsLoading(true)
        const user = getUserWithLocalStorage();
        // console.log(user);
        if (user) {
          const data = await getRiwayatUser(user.user_id, 'pengeluaran');
          setDataRiwayatKeluar(data);
          setIsLoading(false)
        }
      }
    }
    getData();
  }, [dataRiwayatKeluar.length, setDataRiwayatKeluar]);

  return <>{!isLoading ? <CardComponent data={dataRiwayatKeluar} /> : <LoadingCard />}</>;
}
