import styles from "./loading.module.css";

export default function LoadingHeader() {
  return (
    <div className={styles.card}>
      <div className={styles.hallo}></div>
      <div className={styles.description}>
        <div className={styles.money}>
          <div className={styles.money_user}></div>
          <div className={styles.money_teks}></div>
        </div>
        <div className={styles.pictures}></div>
      </div>
    </div>
  );
}
