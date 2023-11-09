'use client'

import { useState } from 'react'
import styles from './input.module.css'

export default function InputComponent({ searchRiwayat }: { searchRiwayat: any }) {
  const [valueInput, setValueInput] = useState<string>('')

  const handleBtn = async () => {
    const trimmedInput = valueInput.trim();
    await searchRiwayat(trimmedInput)
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
