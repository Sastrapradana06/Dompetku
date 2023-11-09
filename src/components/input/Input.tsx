'use client'

import { useState } from 'react'
import styles from './input.module.css'
import useStore from '@/store/store'
import { useShallow } from 'zustand/react/shallow'

export default function InputComponent({ searchRiwayat, handleBtnReset }: { searchRiwayat: any, handleBtnReset:any }) {
  const [valueInput, setValueInput] = useState<string>('')
  const [isBtnResetSearch] = useStore(
    useShallow((state:any) => [state.isBtnResetSearch])
  )

  const handleBtn = async () => {
    const trimmedInput = valueInput.trim();
    await searchRiwayat(trimmedInput)
    setValueInput('')
  }

  
  return (
    <div className={styles.input}>
      <label htmlFor="">Cari Riwayat</label>
      <input type="text" placeholder="item/bulan" value={valueInput} onChange={(e) => setValueInput(e.target.value)} />
      <button onClick={handleBtn} className={styles.btn_search}>Cari</button>
      {isBtnResetSearch ? <button onClick={() => handleBtnReset()} className={styles.btn_reset}>Reset</button> : null}
    </div>
  );
}
