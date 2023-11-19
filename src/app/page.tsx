import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.description}>
          <div className={styles.description_title}>
            <h1>&quot;Selamat datang di Dompetku&quot;</h1>
            <p>-Mengelola keuangan dengan bijak adalah seni yang mengubah kekhawatiran menjadi kebebasan-</p>
          </div>
          <div className={styles.description_body}>
            <p>&quot;Seperti arsitektur bangunan megah, konstruksi keuangan yang kokoh membutuhkan perencanaan dan fondasi yang kuat, agar mampu menopang impian yang tinggi.&quot;</p>
          </div>
        </div>
      <div className={styles.footer}>
        <p>Powered by | Sastrapradana</p>
      </div>
      </div>
    </main>
  );
}
