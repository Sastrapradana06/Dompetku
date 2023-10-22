import styles from './pop_up.module.css'

export default function PopUp() {
  return (
    <div className={styles.popup}>
      <div className={styles.popup_content}>
        <p>Login Berhasil, Harap tunggu sebentar...</p>
      </div>
    </div>
  );
};
