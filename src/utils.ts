

export const getUserWithLocalStorage =  () => {
  if (typeof localStorage !== 'undefined') {
    const dataUser = localStorage.getItem("data-user");
    const userData = JSON.parse(dataUser ? dataUser : '');
    return userData;
  } else {
    console.error("localStorage is not available");
    return {}
  }
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

    if (tanggalItem.includes(valueInput) || deskripsiItem.includes(valueInput)) {
      return true
    }
    return false
  })

  return filterItem
}

export const setTimeOutState = (state:any, setState?:any) => {
  if(!setState) {
    setTimeout(() => {
      state(false)
    }, 1000)
  } else {
    setTimeout(() => {
      state(setState)
    }, 1000)
  }
}

export const handleBtnReset =  (setState:any, setBtn:any) => {
  setState([])
  setBtn(false)
}

export const formatDate = (date:any) => {
  return date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', })
}

export const formatTime = (date:any) => {
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export const createCookies = (token:any) => {
  var satuJamDariSekarang = new Date();
  satuJamDariSekarang.setTime(satuJamDariSekarang.getTime() + 60 * 60 * 1000);
  console.log(satuJamDariSekarang.toUTCString())

  document.cookie = `token=${token}; expires=${satuJamDariSekarang.toUTCString()}`;
} 

export const createLocalStorage = (data:any) => {
  localStorage.setItem("data-user", JSON.stringify(data));
}