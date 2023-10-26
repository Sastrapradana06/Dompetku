import CardComponent from "@/components/card/card";
import styles from "./home.module.css";

export default function RiwayatComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.keterangan}>
        <div className={styles.teks_keterangan}>
          <p>Berdasarkan</p>
          <button>Semua</button>
          {/* <span>:</span> */}
        </div>
      </div>
      <CardComponent data={''}/>
    </div>
  );
}
