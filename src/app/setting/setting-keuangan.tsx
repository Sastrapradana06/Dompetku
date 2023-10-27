import styles from './page.module.css'

export default function SettingKeuangan() {
  return (
    <div className={styles.setting_keuangan}>
      <div className={styles.form}>
        <div className={styles.pengeluaran}>
          <label htmlFor="">Batas Pengeluaran Sebulan</label>
          <input type="text" name='pengeluaran' />
        </div>
        <div className={styles.pemasukkan}>
          <label htmlFor="">Target Profit Dalam Sebulan</label>
          <input type="text" name='pemasukkan'/>
        </div>
      </div>
      <button className={styles.btn_ubah}>Setting</button>
    </div>
  )
};
