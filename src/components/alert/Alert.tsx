import styles from "./alert.module.css";

export default function AlertMessage({ message }: { message: string }) {
  return (
    <div className={styles.alert}>
      <div className={styles.card_message}>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
