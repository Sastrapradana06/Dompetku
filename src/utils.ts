

export const getUserWithLocalStorage =  () => {
  const dataUser:any = localStorage.getItem("data-user");
  const userData = JSON.parse(dataUser); 
  return userData
}

export const sortByDate = (a:any, b:any) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (dateA < dateB) {
    return 1;
  } else if (dateA > dateB) {
    return -1;
  } else {
    return 0;
  }
}

export const sortByNominal = (a:any, b:any) => {
  const nominalA = a.nominal
  const nominalB = b.nominal

  if(nominalA < nominalB) {
    return 1
  } else if(nominalA > nominalB) {
    return -1
  } else {
    return 0;
  }
}


export const generateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i <= 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

type data = {
  id: string
  tanggal: string,
  deskripsi: string
}

export const filteredItems = (item:any, key:string) => {
  const filterItem = item.filter((data:data) => {
    const tanggalItem = data.tanggal.toLowerCase();
    const deskripsiItem = data.deskripsi.toLowerCase();
    const valueInput = key.toLowerCase()

    if (tanggalItem.includes(valueInput) || deskripsiItem === valueInput) {
      return true
    }
    return false
  })

  return filterItem
}