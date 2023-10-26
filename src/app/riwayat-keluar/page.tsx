

import Main from "@/components/main/Main";
import styles from "./page.module.css";
import { Metadata } from "next";
import InputPengeluaran from "./input-pengeluaran";
import CardPengeluaran from "./card-pengeluaran";

export const metadata: Metadata = {
  title: "Riwayat Keluar",
  description: "Halaman Riwayat Uang Keluar",
};

export default function RiwayatKeluarPage() {

  return (
    <Main>
      <div className={styles.container}>
        <div className={styles.teks_head}>
          <p>Riwayat Pengeluaran Anda</p>
        </div>
        <InputPengeluaran />
        <CardPengeluaran />
      </div>
    </Main>
  );
}
