import styles from "./card.module.css";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { MdDelete } from "react-icons/md";

export default function CardComponent({ data }: { data: any }) {
  return (
    <div className={styles.riwayat}>
      <div className={styles.card_riwayat}>
        <div className={styles.date}>kamis, 10 november 2022</div>
        <div className={styles.deskripsi_card}>
          <div className={styles.property}>
            <p>Gaji Karyawan</p>
          </div>
          <div className={styles.price}>
            <ImArrowUp size="15" fill="crimson" />
            <p>Uang Keluar:</p>
            <h2>Rp.6.000.000</h2>
          </div>
        </div>
        <div className={styles.time}>
          <button className={styles.btn_delete}>
            <MdDelete size="20" fill="crimson" />
          </button>
          <p>12:45</p>
        </div>
      </div>
      <div className={styles.card_riwayat}>
        <div className={styles.date}>kamis, 10 november 2022</div>
        <div className={styles.deskripsi_card}>
          <div className={styles.property}>
            <p>Produk Terjual</p>
          </div>
          <div className={styles.price}>
            <ImArrowDown size="15" fill="green" />
            <p>Uang Masuk:</p>
            <h2>Rp.10.000.000</h2>
          </div>
        </div>
        <div className={styles.time}>
          <button className={styles.btn_delete}>
            <MdDelete size="20" fill="crimson" />
          </button>
          <p>21:12</p>
        </div>
      </div>
    </div>
  );
}
