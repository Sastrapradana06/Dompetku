import { create } from 'zustand'
import { typeRiwayat } from '@/type';


const useStore = create((set) => ({
  user : undefined,
  updateUser: (data:object) => set({user: data}),
  resetUser: () => set({user: undefined}),


  isSidebar : false,
  setIsSidebar : (state:any) => set({isSidebar: state}),

  isBtnResetSearch : false,
  setIsBtnResetSearch : (state:boolean) => set({isBtnResetSearch: state}),

  dataRiwayatKeluar: [],
  setDataRiwayatKeluar: (state:typeRiwayat[]) => set({dataRiwayatKeluar: state}),

  dataRiwayatMasuk: [],
  setDataRiwayatMasuk: (state:typeRiwayat[]) => set({dataRiwayatMasuk: state}),

  dataRiwayatTerbaru: [],
  setDataRiwayatTerbaru: (state:typeRiwayat[]) => set({dataRiwayatTerbaru: state}),

  semuaRiwayatUser: [],
  setSemuaRiwayatUser: (state:typeRiwayat[]) => set({semuaRiwayatUser: state}),

  clearRiwayatTerbaruAndsemuaRiwayat: () => set({dataRiwayatTerbaru: [], semuaRiwayatUser: []}),
  clearRiwayat: () => set({dataRiwayatKeluar: [], dataRiwayatMasuk:[], dataRiwayatTerbaru: [], semuaRiwayatUser: []})
}));


export default useStore;