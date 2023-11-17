'use client'

import { useState } from 'react'
import styles from './page.module.css'
import useStore from '@/store/store'
import { useShallow } from 'zustand/react/shallow'
import { userDailyLimit } from '@/lib/firebase/db'
import AlertMessage from '@/components/alert/Alert'
import { setTimeOutState } from '@/utils'

export default function SettingKeuangan() {
  const [isMessage, setIsMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  
  const [user] = useStore(
    useShallow((state:any) => [state.user])
  )
  const [updateDailyLimit, setUpdateDailyLimit] = useState<undefined | string>(user ? user.dailyLimit : undefined)

  const handleInputChange = (e:any) => {
    const inputValue = parseFloat(e.target.value.replace(/[^\d]/g, '')); 
    if (!isNaN(inputValue)) {
      const formattedValue = inputValue.toLocaleString("id-ID");
      setUpdateDailyLimit(formattedValue);
    }
    console.log(updateDailyLimit)
  }

  const handleBtn = async () => {
    setIsLoading(true)
    if(updateDailyLimit !== user.dailyLimit && updateDailyLimit ) {
      try { 
        const cleanedString = updateDailyLimit.replace(/\./g, '')
        const {user_id} = user
        await userDailyLimit(user_id, cleanedString)
        setIsLoading(false)
        setIsMessage('Berhasil Mengatur Limit Harian Anda')
        setTimeOutState(setIsMessage, undefined)
      } catch (err) {
        setIsMessage('Oprasi Gagal')
        setTimeOutState(setIsMessage, undefined)
        setIsLoading(false)
      }
    } else {
      setIsMessage('Anda Tidak Merubah Apapun')
      setTimeOutState(setIsMessage, undefined)
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.setting_keuangan}>
      {isMessage ? <AlertMessage message={isMessage}/> : null}
      <div className={styles.form}>
        <div className={styles.pengeluaran}>
          {/* <label htmlFor="">{user.dailyLimit === 0 ? "Buat Limit Harian" : "Update Limit Harian"}</label> */}
          <label htmlFor="">Buat Limit Harian</label>
          <input type="text" name='pengeluaran' value={updateDailyLimit} onChange={handleInputChange}/>
        </div>
        <div className={styles.pemasukkan}>
          <label htmlFor="">Target Profit Dalam Sebulan</label>
          <input type="text" name='pemasukkan'/>
        </div>
      </div>
      <button className={styles.btn_ubah} onClick={handleBtn}>{isLoading ? 'Loading' : 'Setting'}</button>
    </div>
  )
};
