import Image from 'next/image'
import styles from './page.module.css'

export default function EditProfil() {
  return (
    <div className={styles.edit_profil}>
      <div className={styles.img}>
        <div className={styles.card_img}>
          <Image 
            src={'/'}
            alt='Image User'
            width={0}
            height={0}
          />
        </div>
        <button>Ganti</button>
      </div>
      <div className={styles.form}>
        <div className={styles.username}>
          <label htmlFor="">*Ganti Username</label>
          <input type="text" name='username' />
        </div>
        <div className={styles.usaha}>
          <label htmlFor="">*Ganti Nama Usaha(optional)</label>
          <input type="text" name='usaha'/>
        </div>
      </div>
      <button className={styles.btn_ubah}>Ubah</button>
    </div>
  )
};
