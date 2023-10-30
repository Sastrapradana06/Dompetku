export const getUserWithLocalStorage =  () => {
  const dataUser:any = localStorage.getItem("data-user");
  const userData = JSON.parse(dataUser); 
  return userData
}