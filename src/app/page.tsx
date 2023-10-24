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
            <h1>&quot;Selamat datang di Bisnisku&quot;</h1>
            <p>-Pentingnya menjaga keuangan untuk keberhasilan bisnis Anda-</p>
          </div>
          <div className={styles.description_body}>
            <p>&quot;Menjaga keuangan dengan baik adalah kunci kesuksesan dalam dunia bisnis. Bagi pengusaha, keuangan yang teratur dan terkelola dengan bijak membantu dalam menghadapi tantangan dan peluang yang muncul.&quot;</p>
          </div>
        </div>
      <div className={styles.footer}>
        <p>Powered by | Sastrapradana</p>
      </div>
      </div>
    </main>
  );
}
