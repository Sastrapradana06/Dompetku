import styles from "./sidebar.module.css";

export default function Profil({handleShowImg} : {handleShowImg:Function}) {
  return (
    <div className={styles.profil} id="profil">
      <div className={styles.img_user} onClick={() => handleShowImg()}></div>
      <div className={styles.username}>
        <h2>Sastra Pradana</h2>
        <p>Batu Bata</p>
      </div>
    </div>
  );
}
