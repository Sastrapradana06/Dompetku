'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'
import useStore from '@/store/store'
import { useShallow } from 'zustand/react/shallow'
import { userDailyLimit } from '@/lib/firebase/db'
import AlertMessage from '@/components/alert/Alert'
import { getUserWithLocalStorage, setTimeOutState } from '@/utils'


export default function SettingKeuangan() {
  const [isMessage, setIsMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [user, updateUser] = useStore(
    useShallow((state:any) => [state.user, state.updateUser])
  )
  const [updateDailyLimit, setUpdateDailyLimit] = useState<string>(user ? user.dailyLimit.toLocaleString("id-ID") : '')

  useEffect(() => {
    if(!user) {
      const getUser:any = getUserWithLocalStorage()
      updateUser(getUser)
      setUpdateDailyLimit(getUser ? getUser.dailyLimit : '')
    }
  }, [user, updateUser])
  const handleInputChange = (e:any) => {
    const inputValue = parseFloat(e.target.value.replace(/[^\d]/g, '')); 
    if (!isNaN(inputValue)) {
      const formattedValue = inputValue.toLocaleString("id-ID");
      setUpdateDailyLimit(formattedValue);
    }
  }


  const handleBtn = async () => {
    setIsLoading(true)
    const cleanedString = updateDailyLimit ? updateDailyLimit.replace(/\./g, '') : ''
    if(cleanedString != user.dailyLimit && updateDailyLimit ) {
      try { 
        const {user_id} = user
        await userDailyLimit(user_id, cleanedString)
        updateUser(undefined)
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
          {user ? (
            <label htmlFor="">{updateDailyLimit == '0' ? "Buat Limit Harian " : "Update Limit Harian"}<span>(Memberika 0 Berarti Tidak Mengatur Limit)</span></label> 
          ) : (
            <label htmlFor="">Buat Limit Harian</label>
          )}
          <input type="text" name='pengeluaran' value={updateDailyLimit} onChange={handleInputChange} />
        </div>
        {/* <div className={styles.pemasukkan}>
          <label htmlFor="">Target Profit Dalam Sebulan</label>
          <input type="text" name='pemasukkan'/>
        </div> */}
      </div>
      <button className={styles.btn_ubah} onClick={handleBtn}>{isLoading ? 'Loading' : 'Setting'}</button>
    </div>
  )
};
