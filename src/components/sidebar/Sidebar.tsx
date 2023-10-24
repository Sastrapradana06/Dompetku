import styles from './sidebar.module.css'
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow'
import Profil from './Profil';
import ListLink from './ListLink';

export default function Sidebar() {
  const [isSidebar, setIsSidebar] = useStore(
    useShallow((state:any) => [state.isSidebar, state.setIsSidebar])
  );

  return (
    <main className={isSidebar ? styles.sidebar_aktif : styles.sidebar_close} >
      <div className={styles.close}>
        <button onClick={() => setIsSidebar(false)}>Close</button>      
      </div>
      <div className={styles.container}>
        <Profil />
        <ListLink />
        <div className={styles.footer_sidebar}>
          <p>BisnisKu.com</p>
        </div>
      </div>
    </main>
  )
};
