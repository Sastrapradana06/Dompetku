import styles from "./card.module.css";
import { ImArrowUp,ImArrowDown } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { typeRiwayat } from "@/type";

export default function CardComponent({ data }: { data: typeRiwayat[] }) {
  // console.log(data);
  
  return (
    <div className={styles.riwayat}>
      {data.length === 0 ? (
        <div className={styles.teks_riwayat}>
          <p>Belum Ada Riwayat</p>
        </div>
      ): (
        data.map((item, i) => {
          return (
            <div className={styles.card_riwayat} key={i}>
              <div className={styles.date}>{item.tanggal}</div>
              <div className={styles.deskripsi_card}>
                <div className={styles.property}>
                  <p>{item.deskripsi}</p>
                </div>
                <div className={styles.price}>
                  {item.type === 'pengeluaran' ? (
                    <ImArrowUp size="15" fill="crimson" />
                  ) : (
                    <ImArrowDown size="15" fill="rgb(63, 221, 63)" />
                  )}
                  <p>{item.type === 'pengeluaran' ? "Uang Keluar" : "Uang Masuk"}:</p>
                  <h2>Rp.{item.nominal.toLocaleString('id-ID')}</h2>
                </div>
              </div>
              <div className={styles.time}>
                <button className={styles.btn_delete}>
                  <MdDelete size="20" fill="crimson" />
                </button>
                <p>{item.jam}</p>
              </div>
            </div>
          )
        })
      )}
    </div>
  );
}
