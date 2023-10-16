import { create } from 'zustand'

type userData = {
  email: string | null ,
  uid: string | null
}

const useUserStore = create((set) => ({
  user : {
    email: null,
    nama: null
  },
  updateEmailUser: (email:string) => set({user: {email}}),
  updateNamaUser: (nama:string) => set({user: {nama}}),
  resetUser: () => set({user: {email: null, nama: null}})
}))

export default useUserStore;