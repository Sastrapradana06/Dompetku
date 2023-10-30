'use client'

import CardComponent from "@/components/card/card";
import styles from "./home.module.css";
import LoadingCard from "@/components/loading/loading-card";
import { useState } from "react";


export default function RiwayatComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataRiwayat, setDataRiwayat] = useState<string[]>([])

  return (
    <div className={styles.container}>
      <div className={styles.keterangan}>
        <div className={styles.teks_keterangan}>
          <p>Berdasarkan</p>
          <button>Semua</button>
          {/* <span>:</span> */}
        </div>
      </div>
      {!isLoading ? (
        <CardComponent data={dataRiwayat}/>
      ): (
        <LoadingCard />
      )}
    </div>
  );
}
