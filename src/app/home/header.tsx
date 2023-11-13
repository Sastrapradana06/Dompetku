"use client";
import styles from "./home.module.css";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import mySvg from "./img1.svg";
import Image from "next/image";
import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import LoadingHeader from "@/components/loading/loading-header";
export default function Header() {
  const [user] = useStore(
    useShallow((state: any) => [state.user])
  )


  return (
    <>
      {user ? (
        <div className={styles.card}>
          <div className={styles.hallo}>
            <p>Hallo,</p>
            <h1>{user.name}</h1>
          </div>
          <div className={styles.description}>
            <div className={styles.money}>
              <div className={styles.money_user}>
                <FaMoneyBillWave size="30" fill="rgb(52, 210, 102)" />
                <h2>Rp.{user.saldo.toLocaleString("id-ID")}</h2>
              </div>
              <div className={styles.money_teks}>
                <p>Kelola Keuanganmu dengan baik</p>
                <BsBarChartFill size="15" fill="rgb(52, 210, 102)" />
              </div>
            </div>
            <div className={styles.pictures}>
              <Image src={mySvg} alt="ilustrasi" width={150} height={170} />
            </div>
          </div>
        </div>
      ) : (
        <LoadingHeader />
      )}
    </>
  );
}
