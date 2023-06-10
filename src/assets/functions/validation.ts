import { Buffer } from "buffer";

export function validatePhone(phone: string) {
  var str = phone.toString().replace(/\s/g, "");
  return str.length === 9 && /^[679]{1}[0-9]{8}$/.test(str);
}

export function validatePassword(password1: string, password2: string) {
  return password1 === password2;
}

export function validateToken(token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  //const object = {id:data.id,isAdmin:data.userRole}
  //return data.id
}

export function validatePrice(price: string) {
  let regex = /^[-+]?[0-9]+\.[0-9]+$/;
  return regex.test(price);
}

const validateVisaCardNumber = (cardNumber: string): boolean => {
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  return visaRegex.test(cardNumber);
};

const validateCardExpirationDate = (expirationDate: string): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const expirationRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
  const match = expirationDate.match(expirationRegex);

  if (match) {
    const month = parseInt(match[1], 10);
    const year = parseInt(match[2], 10);

    if (year > currentYear || (year === currentYear && month >= currentMonth)) {
      return true;
    }
  }

  return false;
};

const validateVisaCVV = (cvv: string): boolean => {
  const cvvRegex = /^[0-9]{3}$/;
  return cvvRegex.test(cvv);
};

export const validateVisaCreditCard = (
  cardNumber: string,
  expirationDate: string,
  cvv: string
): boolean => {
  const isValidCardNumber = validateVisaCardNumber(cardNumber);
  const isValidExpirationDate = validateCardExpirationDate(expirationDate);
  const isValidCVV = validateVisaCVV(cvv);

  return isValidCardNumber && isValidExpirationDate && isValidCVV;
};

export const validatePaypalEmail = (email: string): boolean => {
  const paypalEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return paypalEmailRegex.test(email);
};

export const validatePaysafecardCode = (code: string): boolean => {
  const paysafecardCodeRegex = /^\d{16}$/;
  return paysafecardCodeRegex.test(code);
};

/**const cardNumber = "4123456789012345";
const expirationDate = "06/23";
const cvv = "123";

const email = "example@example.com";

const paysafecardCode = "1234567890123456";*/
