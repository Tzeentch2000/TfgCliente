import { Buffer } from "buffer";

export function validatePhone(phone: string){
    var str = phone.toString().replace(/\s/g, "");
    return str.length === 9 && /^[679]{1}[0-9]{8}$/.test(str);
}

export function validatePassword(password1: string,password2: string){
    return password1 === password2
}

export function validateToken(token:string ){
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    //const object = {id:data.id,isAdmin:data.userRole}
    //return data.id
}
