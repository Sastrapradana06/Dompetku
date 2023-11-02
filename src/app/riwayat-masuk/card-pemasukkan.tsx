"use client";

import CardComponent from "@/components/card/card";
import LoadingCard from "@/components/loading/loading-card";
import { getRiwayatUser } from "@/lib/firebase/transaksi";
import { getUserWithLocalStorage } from "@/utils";
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';

export default function CardPemasukkan() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [dataRiwayatMasuk, setDataRiwayatMasuk] = useState<string[]>([])
  const [dataRiwayatMasuk, setDataRiwayatMasuk] = useStore(
    useShallow((state:any) => [state.dataRiwayatMasuk, state.setDataRiwayatMasuk])
  );

  console.log({ dataRiwayatMasuk });
  useEffect(() => {
    async function getData() {
      if(dataRiwayatMasuk.length === 0) {
        setIsLoading(true)
        const user = getUserWithLocalStorage();
        console.log(user);
        if (user) {
          const data = await getRiwayatUser(user.user_id, 'pemasukkan');
          const shortData = data.reverse()
          setDataRiwayatMasuk(shortData);
          setIsLoading(false)
        }
      }
    }
    getData();
  }, [dataRiwayatMasuk.length, setDataRiwayatMasuk]);


  return <>{!isLoading ? <CardComponent data={dataRiwayatMasuk} /> : <LoadingCard />}</>;
}
