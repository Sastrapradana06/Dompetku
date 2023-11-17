import styles from './sidebar.module.css'

export default function ShowImage({children} : {children:React.ReactNode}) {
  return (
    <div className={styles.show_image}>
      {children}
    </div>
  )
};