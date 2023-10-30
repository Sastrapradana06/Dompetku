'use client'

import CardComponent from "@/components/card/card";
import LoadingCard from "@/components/loading/loading-card";
import { useState } from "react";

export default function CardPengeluaran() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataRiwayatKeluar, setDataRiwayatKeluar] = useState<string[]>([])

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
