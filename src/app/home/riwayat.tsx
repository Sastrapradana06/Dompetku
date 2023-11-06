'use client'

import CardComponent from "@/components/card/card";
import styles from "./home.module.css";
import LoadingCard from "@/components/loading/loading-card";
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow';
import { getUserWithLocalStorage, sortByNominal } from "@/utils";
import { getAllRiwayat } from "@/lib/firebase/transaksi";


export default function RiwayatComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataRiwayatTerbaru, setDataRiwayatTerbaru] = useStore(
    useShallow((state:any) => [state.dataRiwayatTerbaru, state.setDataRiwayatTerbaru])
  );

  useEffect(() => {
    async function getData() {
      if(dataRiwayatTerbaru.length === 0) {
        setIsLoading(true)
        const user = getUserWithLocalStorage();
        // console.log(user);
        if (user) {
          const data = await getAllRiwayat(user.user_id);
          console.log({data});
          
          const sliceData = data?.slice(0, 5).sort(sortByNominal)
          setDataRiwayatTerbaru(sliceData);
          setIsLoading(false)
        }
      }
    }
    getData();
  }, [dataRiwayatTerbaru.length, setDataRiwayatTerbaru])

  return (
    <div className={styles.container}>
      <div className={styles.keterangan}>
        <div className={styles.teks_keterangan}>
          <p>Berdasarkan</p>
          <button>Terbaru</button>
        </div>
        <div className={styles.teks_diurutkan}>
          <p>Diurutkan Berdasarkan Yang Terbesar</p>
        </div>
      </div>
      {!isLoading ? (
        <CardComponent data={dataRiwayatTerbaru}/>
      ): (
        <LoadingCard />
      )}
    </div>
  );
}
