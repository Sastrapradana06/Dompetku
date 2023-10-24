// 'use client'
import { Metadata } from "next"
import styles from './home.module.css'
import CardComponent from "./card"
import RiwayatComponent from "./riwayat"

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'My Bisnis',
}


export default function HomePage() {

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <CardComponent />
        <RiwayatComponent />
      </div>
    </main>
  )
};
