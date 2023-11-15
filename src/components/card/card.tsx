"use client";

import styles from "./card.module.css";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { typeRiwayat } from "@/type";
import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { monitorRiwayatUser, deleteRiwayat } from "@/lib/firebase/db";

export default function CardComponent({ data, isBtnDelete }: { data: typeRiwayat[], isBtnDelete:boolean }) {
  const [setDataRiwayatKeluar, setDataRiwayatMasuk, clearRiwayatTerbaruAndsemuaRiwayat] = useStore(useShallow((state: any) => [state.setDataRiwayatKeluar, state.setDataRiwayatMasuk, state.clearRiwayatTerbaruAndsemuaRiwayat]));
  // console.log(data);

  const handleBtnDelete = async (id: string, collectionName: string, user_id: string) => {
    await deleteRiwayat(id, collectionName);
    monitorRiwayatUser(user_id, collectionName, (data: any) => {
      clearRiwayatTerbaruAndsemuaRiwayat();
      // console.log("masuk monitoring", data);
      if (collectionName === "pengeluaran") {
        setDataRiwayatKeluar(data);
      } else {
        setDataRiwayatMasuk(data);
      }
    });
  };

  return (
    <div className={styles.riwayat}>
      {data.length === 0 ? (
        <div className={styles.teks_riwayat}>
          <p>Belum Ada Riwayat</p>
        </div>
      ) : (
        data.map((item, i) => {
          return (
            <div className={styles.card_riwayat} key={i}>
              <div className={styles.date}>{item.tanggal}</div>
              <div className={styles.deskripsi_card}>
                <div className={styles.property}>
                  <p>{item.deskripsi}</p>
                </div>
                <div className={styles.price}>
                  {item.type === "pengeluaran" ? <ImArrowUp size="15" fill="crimson" /> : <ImArrowDown size="15" fill="rgb(63, 221, 63)" />}
                  <p>{item.type === "pengeluaran" ? "Uang Keluar" : "Uang Masuk"}:</p>
                  <h2>Rp.{item.nominal.toLocaleString("id-ID")}</h2>
                </div>
              </div>
              <div className={styles.time}>
                {isBtnDelete ? (
                  <button className={styles.btn_delete} onClick={() => handleBtnDelete(item.id, item.type, item.user_id)}>
                    <MdDelete size="20" fill="crimson" />
                  </button>
                ) : null}
                <p>{item.jam}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
