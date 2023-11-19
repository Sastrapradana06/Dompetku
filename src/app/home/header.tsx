"use client";
import styles from "./home.module.css";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsBarChartFill, BsRepeat } from "react-icons/bs";
import mySvg from "./img1.svg";
import Image from "next/image";
import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import LoadingHeader from "@/components/loading/loading-header";
import { getUserWithLocalStorage, setTimeOutState } from "@/utils";
import { useEffect, useState } from "react";
import { sinkronUserSaldo } from "@/lib/firebase/db";
import AlertMessage from "@/components/alert/Alert";

export default function Header() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMessage, setIsMessage] = useState<string | undefined>(undefined)

  const [user, updateUser] = useStore(
    useShallow((state: any) => [state.user, state.updateUser])
  )

  useEffect(() => {
    if(!user) {
      const getUser = getUserWithLocalStorage()
      updateUser(getUser)
    }
  }, [user, updateUser])

  console.log('dari home',{user});

  const updateSaldo = async () => {
    setIsLoading(true)
    await sinkronUserSaldo(user.user_id, (data:any) => {
      console.log({data})
      if(data) {
        updateUser(data)
        setIsLoading(false)
        setIsMessage('Saldo Berhasil Di Update')
        setTimeOutState(setIsMessage, undefined)
      } else {
        setIsLoading(false)
        setIsMessage('Update Saldo Gagal')
        setTimeOutState(setIsMessage, undefined)
      }
    })
  }
  


  return (
    <>
      {user ? (
        <div className={styles.card}>
          {isMessage ? <AlertMessage message={isMessage}/> : null}
          <div className={styles.hallo}>
            <p>Hallo,</p>
            <h1>{user.name}</h1>
          </div>
          <div className={styles.description}>
            <div className={styles.money}>
              <div className={styles.money_user}>
                <FaMoneyBillWave size="30" fill="rgb(52, 210, 102)" />
                <h2>Rp.{user.saldo.toLocaleString("id-ID")}</h2>
                <button onClick={updateSaldo} disabled={isLoading} className={styles.btn_repeat}>
                  <BsRepeat size="20" fill="salmon"/>
                </button>
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
