'use client'

import styles from "./sidebar.module.css";
import { BsFilePersonFill } from "react-icons/bs";
import { BiSolidHome } from "react-icons/bi";
import { PiChartLineUpBold, PiChartLineDownBold } from "react-icons/pi";
import { LuGanttChartSquare, LuSettings } from "react-icons/lu";
import Link from "next/link";
import useStore from "@/store/store";
import { useShallow } from 'zustand/react/shallow'
export default function ListLink() {
  const [setIsSidebar] = useStore(
    useShallow((state:any) => [state.setIsSidebar])
  );


  const dataLink = [
    {
      page: "Home",
      link: "/home",
      icons: <BiSolidHome size="27" fill="salmon" />,
    },
    {
      page: "Profil",
      link: "/profil",
      icons: <BsFilePersonFill size="27" fill="white" />,
    },
    {
      page: "Keluar",
      link: "/riwayat-keluar",
      icons: <PiChartLineUpBold size="27" fill="crimson" />,
    },
    {
      page: "Masuk",
      link: "/riwayat-masuk",
      icons: <PiChartLineDownBold size="27" fill="green" />,
    },
    {
      page: "Setting",
      link: "/setting",
      icons: <LuSettings size="27" fill="" />,
    },
  ];

  return (
    <div className={styles.link} id="link">
      {dataLink.map((data: any) => {
        return (
          <div className={styles.link_profil} key={data.page}>
            {data.icons}
            <Link href={data.link} onClick={() => setIsSidebar(false)}>{data.page}</Link>
          </div>
        );
      })}
    </div>
  );
}
