"use client";

import CardComponent from "@/components/card/card";
import LoadingCard from "@/components/loading/loading-card";
import { useState } from "react";

export default function CardPemasukkan() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataRiwayatMasuk, setDataRiwayatMasuk] = useState<string[]>([])


  return <>{!isLoading ? <CardComponent data={dataRiwayatMasuk} /> : <LoadingCard />}</>;
}
