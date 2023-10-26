// 'use client'
import { Metadata } from "next"
import styles from './home.module.css'
import RiwayatComponent from "./riwayat"
import Main from "@/components/main/Main"
import Header from "./header"

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'My Bisnis',
}


export default function HomePage() {

  return (
    <Main>
      <Header />
      <RiwayatComponent />
    </Main>
  )
};
