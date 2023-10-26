'use client'

import styles from './input.module.css'

export default function InputComponent({ getRiwayat }: { getRiwayat: any }) {
  const handleBtn = () => {
    getRiwayat('yee')
  }
  
  return (
    <div className={styles.input}>
      <label htmlFor="">Cari Riwayat</label>
      <input type="text" placeholder="item/bulan" />
      <button onClick={handleBtn}>Cari</button>
    </div>
  );
}
