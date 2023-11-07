'use client'

import { useState } from 'react'
import styles from './input.module.css'

export default function InputComponent({ getRiwayat }: { getRiwayat: any }) {
  const [valueInput, setValueInput] = useState<string>('')

  const handleBtn = async () => {
    if(valueInput !== '') {
      await getRiwayat(valueInput)
    }
    setValueInput('')
  }
  
  return (
    <div className={styles.input}>
      <label htmlFor="">Cari Riwayat</label>
      <input type="text" placeholder="item/bulan" value={valueInput} onChange={(e) => setValueInput(e.target.value)} />
      <button onClick={handleBtn}>Cari</button>
    </div>
  );
}
