import styles from "./home.module.css";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
export default function RiwayatComponent() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.input}>
        <label htmlFor="">Cari Riwayat Keuangan</label>
        <input type="text" placeholder="item/bulan"/>
      </div> */}
      <div className={styles.keterangan}>
        <div className={styles.teks_keterangan}>
          <p>Berdasarkan</p>
          <button>Semua</button>
          {/* <span>:</span> */}
        </div>
        {/* <div className={styles.btn}>
          <button>Pengeluaran</button>
          <button>Pemasukkan</button>
        </div> */}
      </div>
      <div className={styles.riwayat}>
        <div className={styles.card_riwayat}>
          <div className={styles.date}>
            kamis, 10 november 2022
          </div>
          <div className={styles.deskripsi_card}>
            <div className={styles.property}>
              <p>Gaji Karyawan</p>
            </div>
            <div className={styles.price}>
              <ImArrowUp size="15" fill="crimson"/>
              <p>Uang Keluar:</p>
              <h2>Rp.6.000.000</h2>
            </div>
          </div>
          <div className={styles.time}>
            <p>12:45</p>
          </div>
        </div>
        <div className={styles.card_riwayat}>
          <div className={styles.date}>
            kamis, 10 november 2022
          </div>
          <div className={styles.deskripsi_card}>
            <div className={styles.property}>
              <p>Produk Terjual</p>
            </div>
            <div className={styles.price}>
              <ImArrowDown size="15" fill="green"/>
              <p>Uang Masuk:</p>
              <h2>Rp.10.000.000</h2>
            </div>
          </div>
          <div className={styles.time}>
            <p>21:12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
