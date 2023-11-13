import Main from '@/components/main/Main'
import styles from './page.module.css'
import { Metadata } from 'next'
import SearchPemasukkan from './search-pemasukan'
import CardPemasukkan from './card-pemasukkan'
import HeaderPemasukkan from './header'

export const metadata: Metadata = {
  title: 'Riwayat Masuk',
  description: "Halaman Riwayat Uang Masuk",
}

export default function RiwayatMasukPage() {
  return (
    <Main>
      <div className={styles.container}>
        <HeaderPemasukkan />
        <SearchPemasukkan />
        <CardPemasukkan />
      </div>
    </Main>
  )
};