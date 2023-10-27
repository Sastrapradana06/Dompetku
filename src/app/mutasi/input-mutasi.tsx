'use client'

import InputComponent from "@/components/input/Input";

export default function InputMutasi( ) {
  const getRiwayat = (teks:string) => {
    alert(teks)
  }

  return (
    <InputComponent getRiwayat={getRiwayat}/>
  )
};
