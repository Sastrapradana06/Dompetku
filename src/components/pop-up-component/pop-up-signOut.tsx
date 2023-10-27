import styles from './pop-up-component.module.css'

export default function PopUpComponent({children} : {children: React.ReactNode}) {
  return (
    <div className={styles.popup}>
      {children}
    </div>
  )
};
