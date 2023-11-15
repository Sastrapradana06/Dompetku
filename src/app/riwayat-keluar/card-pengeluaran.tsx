"use client";

import CardComponent from "@/components/card/card";
import LoadingCard from "@/components/loading/loading-card";
import { getRiwayatUser } from "@/lib/firebase/db";
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";

export default function CardPengeluaran() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataRiwayatKeluar, setDataRiwayatKeluar, user] = useStore(useShallow((state: any) => [state.dataRiwayatKeluar, state.setDataRiwayatKeluar, state.user]));

  // console.log({ dataRiwayatKeluar });
  useEffect(() => {
    async function getData() {
      if (dataRiwayatKeluar.length === 0) {
        setIsLoading(true);
        if (user) {
          const data = await getRiwayatUser(user.user_id, "pengeluaran");
          setDataRiwayatKeluar(data);
          setIsLoading(false);
        }
      }
    }
    getData();
  }, [dataRiwayatKeluar.length, setDataRiwayatKeluar, user]);

  return <>{!isLoading ? <CardComponent data={dataRiwayatKeluar} isBtnDelete={true}/> : <LoadingCard />}</>;
}
