"use client";

import CardComponent from "@/components/card/card";
import LoadingCard from "@/components/loading/loading-card";
import { getRiwayatUser } from "@/lib/firebase/db";
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";

export default function CardPemasukkan() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataRiwayatMasuk, setDataRiwayatMasuk, user] = useStore(useShallow((state: any) => [state.dataRiwayatMasuk, state.setDataRiwayatMasuk, state.user]));

  // console.log({ dataRiwayatMasuk });
  useEffect(() => {
    async function getData() {
      if (dataRiwayatMasuk.length === 0) {
        setIsLoading(true);
        if (user) {
          const data = await getRiwayatUser(user.user_id, "pemasukkan");
          setDataRiwayatMasuk(data);
          setIsLoading(false);
        }
      }
    }
    getData();
  }, [dataRiwayatMasuk.length, setDataRiwayatMasuk, user]);

  return <>{!isLoading ? <CardComponent data={dataRiwayatMasuk} /> : <LoadingCard />}</>;
}
