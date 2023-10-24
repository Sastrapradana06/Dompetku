import styles from "./sidebar.module.css";
import { BsFilePersonFill } from "react-icons/bs";
import { PiChartLineUpBold, PiChartLineDownBold } from "react-icons/pi";
import { LuGanttChartSquare } from "react-icons/lu";
import Link from "next/link";
export default function ListLink() {
  return (
    <div className={styles.link} id="link">
      <div className={styles.link_profil}>
        <BsFilePersonFill size="27" fill="white" />
        <Link href={"/profil"}>Profil</Link>
      </div>
      <div className={styles.link_pemasukan}>
        <PiChartLineUpBold size="27" fill="crimson" />
        <Link href={"/"}>Keluar</Link>
      </div>
      <div className={styles.link_pengeluaran}>
        <PiChartLineDownBold size="27" fill="green" />
        <Link href={"/"}>Masuk</Link>
      </div>
      <div className={styles.link_none}>
        <LuGanttChartSquare size="27" fill="" />
        <Link href={"/"}>Mutasi</Link>
      </div>
    </div>
  );
}
