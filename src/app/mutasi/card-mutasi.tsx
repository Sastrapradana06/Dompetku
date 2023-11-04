'use client'

import CardComponent from "@/components/card/card";
import LoadingCard from "@/components/loading/loading-card";
import { getAllRiwayat } from "@/lib/firebase/transaksi";
import { getUserWithLocalStorage } from "@/utils";
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';

export default function CardMutasi() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [semuaRiwayatUser, setSemuaRiwayatUser] = useStore(
    useShallow((state:any) => [state.semuaRiwayatUser, state.setSemuaRiwayatUser])
  );

  useEffect(() => {
    async function getData() {
      if(semuaRiwayatUser.length === 0) {
        setIsLoading(true)
        const user = getUserWithLocalStorage();
        // console.log(user);
        if (user) {
          const data = await getAllRiwayat(user.user_id);
          setSemuaRiwayatUser(data);
          setIsLoading(false)
        }
      }
    }
    getData();
  }, [semuaRiwayatUser.length, setSemuaRiwayatUser])

  return (
    <>
      {!isLoading ? (
        <CardComponent data={semuaRiwayatUser}/>
      ): (
        <LoadingCard />
      )}
    </>
  );
};