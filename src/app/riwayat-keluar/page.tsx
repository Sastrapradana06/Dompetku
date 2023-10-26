

import Main from "@/components/main/Main";
import styles from "./page.module.css";
import { Metadata } from "next";
import Input from "./input";
import CardPengeluaran from "./card-pengeluaran";

export const metadata: Metadata = {
  title: "Riwayat Keluar",
  description: "Halaman Riwayat Uang Keluar",
};

export default function RiwayatKeluarPage() {

  return (
    <Main>
      <div className={styles.head}>
        <div className={styles.teks_head}>
          <p>Riwayat Pengeluaran Anda</p>
        </div>
        <Input />
        <CardPengeluaran />
      </div>
    </Main>
  );
}
