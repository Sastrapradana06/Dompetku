

export const getUserWithLocalStorage =  () => {
  const dataUser:any = localStorage.getItem("data-user");
  const userData = JSON.parse(dataUser); 
  return userData
}

export const sortByDate = (a:any, b:any) => {
  const dateA = new Date(a.tanggal);
  const dateB = new Date(b.tanggal);

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