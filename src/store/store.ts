import { create } from 'zustand'
import { typeRiwayat } from '@/type';


const useStore = create((set) => ({
  user : {
    email: null,
    name: null,
    image: null,
    usaha: null,
    saldo: 0
  },
  updateUser: (data:object) => set({user: data}),
  updateEmailUser: (email:string) => set({user: {email}}),
  updateNamaUser: (nama:string) => set({user: {nama}}),
  resetUser: () => set({user: {email: null, nama: null, image: null, usaha: null, saldo: 0}}),


  isSidebar : false,
  setIsSidebar : (state:any) => set({isSidebar: state}),

  dataRiwayatKeluar: [],
  setDataRiwayatKeluar: (state:typeRiwayat[]) => set({dataRiwayatKeluar: state}),

  dataRiwayatMasuk: [],
  setDataRiwayatMasuk: (state:typeRiwayat[]) => set({dataRiwayatMasuk: state}),

  dataRiwayatTerbaru: [],
  setDataRiwayatTerbaru: (state:typeRiwayat[]) => set({dataRiwayatTerbaru: state}),

  semuaRiwayatUser: [],
  setSemuaRiwayatUser: (state:typeRiwayat[]) => set({semuaRiwayatUser: state}),

  clearRiwayat: () => set({dataRiwayatKeluar: [], dataRiwayatMasuk:[], dataRiwayatTerbaru: [], semuaRiwayatUser: []})
}));


export default useStore;