import axios from "axios"
const SERVER = 'https://localhost:7224/'
const CREATEUSER = `${SERVER}User/Create`
const LOGIN = `${SERVER}Auth`
const GETUSER = `${SERVER}User/`
const GETBOOKS = `${SERVER}Book`
const GETCATEGORIES = `${SERVER}Category`
const GETSTATES = `${SERVER}State`

const config = (token:string) => {
  return {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
  }
}

export async function register(user: any){
    return axios.post(CREATEUSER,user)
    .then(response => response.data)
    .catch(function (error) {
        console.log(error);
        return -1;
      });
}

export async function login(user: any){
    return axios.post(LOGIN,user)
    .then(response => response.data)
    .catch(function (error) {
        console.log(error);
        return -1;
      });
}

export async function chargeUser(id:string,token:string){
  return axios.get(`${GETUSER}${id}`,config(token))
  .then(response => response.data)
  .catch(function (error) {
      console.log(error);
      return null;
  });
}

export async function getBooks(){
  return axios.get(`${GETBOOKS}`)
  .then(response => response.data)
  .catch(function (error) {
      console.log(error);
      return null;
  });
}

export async function getCategories(){
  return axios.get(`${GETCATEGORIES}`)
  .then(response => response.data)
  .catch(function (error) {
      console.log(error);
      return null;
  });
}

export async function getStates(){
  return axios.get(`${GETSTATES}`)
  .then(response => response.data)
  .catch(function (error) {
      console.log(error);
      return null;
  });
}

export async function getBookById(id:Number){
  return axios.get(`${GETBOOKS}/${id}`)
  .then(response => response.data)
  .catch(function (error) {
      console.log(error);
      return null;
  });
}