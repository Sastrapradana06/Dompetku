import Main from '@/components/main/Main'
import styles from './page.module.css'
import { Metadata } from 'next'
import InputPemasukkan from './input-pemasukan'
import CardPemasukkan from './card-pemasukkan'

export const metadata: Metadata = {
  title: 'Riwayat Masuk',
  description: "Halaman Riwayat Uang Masuk",
}

export default function RiwayatMasukPage() {
  return (
    <Main>
      <div className={styles.container}>
        <div className={styles.teks_head}>
          <p>Riwayat Pemasukkan Anda</p>
        </div>
        <InputPemasukkan />
        <CardPemasukkan />
      </div>
    </Main>
  )
};