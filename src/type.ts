export type userDataRegister = {
  email: string,
  password: string,
  name: string
}

export type typeRiwayat = {
  deskripsi: string,
  id: string,
  jam: string,
  nominal: number;
  tanggal: string,
  type: string,
  user_id: string,
  user_name: string,
};

export interface UserUpdateFinance {
  userId: string;
  saldoUser: number; 
  nominalInput: number,
  type: string
}

export interface UserUpdateProfil {
  userId: string,
  newUrlImage: string | undefined,
  username: string,
  usaha: string
}


