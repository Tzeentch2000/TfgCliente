import axios from "axios"
const CREATEUSER = 'https://localhost:7224/User/Create'
const LOGIN = 'https://localhost:7224/Auth'

//Authentication
//type Object = 

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