import Main from "@/components/main/Main";
import styles from "./page.module.css";
import { Metadata } from "next";
import InputMutasi from "./input-mutasi";
import CardMutasi from "./card-mutasi";

export const metadata: Metadata = {
  title: "Mutasi-Anda",
  description: "Mutasi Keuangan Anda",
};
export default function MutasiPage() {
  return (
    <Main>
      <div className={styles.container}>
        <div className={styles.teks_head}>
          <p>Semua Riwayat Anda</p>
        </div>
        <InputMutasi />
        <CardMutasi />
      </div>
    </Main>
  );
}
