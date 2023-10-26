import Main from "@/components/main/Main";
import styles from './page.module.css'
import { Metadata } from "next";
import EditProfil from "./edit-profil";
import SettingKeuangan from "./setting-keuangan";

export const metadata: Metadata = {
  title: 'Setting Page'
}

export default function SettingPage() {
  return (
    <Main>
      <div className={styles.setting}>
        <div className={styles.head}>
          <p>Setting Profil</p>
        </div>
        <EditProfil />
        <div className={styles.head}>
          <p>Setting Keuangan</p>
        </div>
        <SettingKeuangan />
      </div>
    </Main>
  )
};
