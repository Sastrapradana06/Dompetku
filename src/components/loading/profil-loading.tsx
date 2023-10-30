import styles from "./loading.module.css";

export default function ProfilLoading() {
  return (
    <div className={styles.profil} id="profil">
      <div className={styles.img_user}></div>
      <div className={styles.username}></div>
    </div>
  );
}
