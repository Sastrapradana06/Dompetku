import styles from './updatePw.module.css'

export default function UpdatePasswordPage() {
  return (
    <main className={styles.main}>
      <form action="" className={styles.form}>
        <label htmlFor="">Masukkan Passwod Saat Ini</label>
        <input type="email" name="email" size={35} />
        <label htmlFor="">Masukkan Password Baru</label>
        <input type="email" name="email" size={35} />
        <label htmlFor="">Konfirmasi Password Baru</label>
        <input type="email" name="email" size={35} />
        <button type="submit">Ubah</button>
      </form>
    </main>
  );
}
