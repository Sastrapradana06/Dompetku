import styles from "./home.module.css";

export default function RiwayatComponent() {
  return (
    <div className={styles.riwayat}>
      <div className={styles.input}>
        <label htmlFor="">Cari Riwayat Keuangan</label>
        <input type="text" />
      </div>
    </div>
  );
}
