import React, { useRef, useState } from "react";
import style from "./Direction.module.scss";
import { Form, useActionData } from "react-router-dom";
import Alert from "../UI/Alert/Alert";
import useAuth from "../../hooks/useAuth";
import { deleteCookie, getCookie } from "../../assets/functions/cookie";
import { ICreditCard, IOrderCart, IUser } from "../../interfaces/Interfaces";
import { buy, chargeUser, updateUser } from "../../assets/functions/api";
import useCart from "../../hooks/useCart";
import {
  validatePaypalEmail,
  validatePaysafecardCode,
  validatePhone,
  validateToken,
  validateVisaCreditCard,
} from "../../assets/functions/validation";

interface Props {
  setModal: (modal: boolean) => void;
  totalPrice: string;
}

const Direction = (props: Props) => {
  const auth = useAuth();
  const cart = useCart();
  const [direction, setDirection] = useState(auth.user.direction);
  const [phone, setPhone] = useState<string>(auth.user.phone.toString());
  const [email, setEmail] = useState(auth.user.email);
  const [payMethod, setPayMethod] = useState<string>("visa");
  const [creditCard, setCreditCard] = useState<ICreditCard>({
    cardHolder: "",
    visaNumber: "",
    cvv: "",
    expirationDateCard: "",
  });
  const [paypalCard, setPaypalCard] = useState("");
  const [paySafeCard, setPaySafeCard] = useState("");
  const [hours, setHours] = useState("");

  const error: any = useActionData();
  const showError =
    error?.length > 0 ? <Alert type="error" message={error} /> : undefined;

  const onHandleChangeDirection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirection(e.target.value);
  };

  const handleChangeVisa = (e: React.FormEvent<HTMLInputElement>) => {
    setCreditCard({
      ...creditCard,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const resetValuesOnPayMethod = () => {
    setCreditCard({
      cardHolder: "",
      visaNumber: "",
      cvv: "",
      expirationDateCard: "",
    });
    setPaypalCard("");
    setPaySafeCard("");
  };

  const emptyPayMethod = () => {
    switch (payMethod) {
      case "visa":
        return (
          !Object.values(creditCard).includes("") &&
          validateVisaCreditCard(
            creditCard.visaNumber,
            creditCard.expirationDateCard,
            creditCard.cvv
          )
        );
      case "paypal":
        return paypalCard.trim() !== "" && validatePaypalEmail(paypalCard);
      case "paysafecard":
        return (
          paySafeCard.trim() !== "" && validatePaysafecardCode(paySafeCard)
        );
      default:
        return false;
    }
  };

  const emptyCart = () => {
    if (
      direction.trim() !== "" &&
      phone.trim() !== "" &&
      email.trim() !== "" &&
      validatePhone(phone) &&
      emptyPayMethod()
    ) {
      cart.setCart([] as IOrderCart[]);
      auth.setUser({
        ...auth.user,
        direction: direction,
        phone: Number(phone),
      });
      const interval = setInterval(() => {
        props.setModal(false);
        clearInterval(interval);
      }, 10);

      return () => clearInterval(interval);
    }
  };

  const visaForm = (
    <>
      <div className={style.bloque}>
        <label htmlFor="direction">Visa:</label>
        <input
          type="text"
          placeholder="Credit card number"
          name="visaNumber"
          id="visaNumber"
          value={creditCard.visaNumber}
          onInput={handleChangeVisa}
          maxLength={16}
        />
      </div>
      <input
        className={style.cardforms}
        type="text"
        placeholder="Cardholder"
        name="cardHolder"
        id="cardHolder"
        value={creditCard.cardHolder}
        onInput={handleChangeVisa}
      />
      <div className={`${style.bloque} ${style.radioforms}`}>
        <input
          className={style.cardforms}
          type="text"
          placeholder="Expiration date card"
          name="expirationDateCard"
          id="expirationDateCard"
          value={creditCard.expirationDateCard}
          onInput={handleChangeVisa}
          maxLength={5}
        />
        <input
          className={style.cardforms}
          type="text"
          placeholder="cvv"
          name="cvv"
          id="cvv"
          value={creditCard.cvv}
          onInput={handleChangeVisa}
          maxLength={3}
        />
      </div>
    </>
  );

  const paypalForm = (
    <div className={style.bloque}>
      <label htmlFor="paypalCard">Paypal:</label>
      <input
        type="text"
        placeholder="Paypal"
        name="paypalCard"
        id="paypalCard"
        value={paypalCard}
        onInput={(event) => setPaypalCard(event.currentTarget.value)}
      />
    </div>
  );

  const paysafecardForm = (
    <div className={style.bloque}>
      <label htmlFor="paysafecard">Paysafecard:</label>
      <input
        type="text"
        placeholder="Paysafecard"
        name="paysafecard"
        id="paysafecard"
        value={paySafeCard}
        onInput={(event) => setPaySafeCard(event.currentTarget.value)}
        maxLength={16}
      />
    </div>
  );
  const paymentForm =
    payMethod === "visa"
      ? visaForm
      : payMethod === "paypal"
      ? paypalForm
      : paysafecardForm;
  return (
    <div className={style.formulario}>
      <Form method="post" action="/cart">
        {showError}
        <div className={style.bloque}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            id="phone"
            value={phone}
            onInput={(event) => setPhone(event.currentTarget.value)}
          />
        </div>
        <div className={style.bloque}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            value={email}
            onInput={(event) => setEmail(event.currentTarget.value)}
          />
        </div>
        <div className={style.bloque}>
          <label htmlFor="direction">Direction:</label>
          <input
            type="text"
            placeholder="Direction"
            name="direction"
            id="direction"
            value={direction}
            onChange={(e) => onHandleChangeDirection(e)}
          />
        </div>
        <div className={`${style.bloque} ${style.radioforms}`}>
          <div>
            <label>Method of payment</label>
            <label className={style.radio}>
              <span>Visa</span>
              <input
                type="radio"
                id="visa"
                name="payment"
                value="visa"
                defaultChecked
                onChange={(e) => {
                  setPayMethod(e.target.value);
                  resetValuesOnPayMethod();
                }}
              />
            </label>
            <label className={style.radio}>
              <span>PaySafeCard</span>
              <input
                type="radio"
                id="paysafecard"
                name="payment"
                value="paysafecard"
                onChange={(e) => {
                  setPayMethod(e.target.value);
                  resetValuesOnPayMethod();
                }}
              />
            </label>
            <label className={style.radio}>
              <span>PayPal</span>
              <input
                type="radio"
                id="paypal"
                name="payment"
                value="paypal"
                onChange={(e) => {
                  setPayMethod(e.target.value);
                  resetValuesOnPayMethod();
                }}
              />
            </label>
          </div>
          <div>
            <label>Method of delivery</label>
            <label className={style.radio}>
              <span>Standard</span>
              <input
                type="radio"
                id="normal"
                name="hours24"
                value="normal"
                defaultChecked
                onChange={(event) => setHours(event.target.value)}
              />
            </label>
            <label className={style.radio}>
              <span>24-hour delivery (+3.49$)</span>
              <input
                type="radio"
                id="24h"
                name="hours24"
                value="24h"
                onChange={(event) => setHours(event.target.value)}
              />
            </label>
          </div>
        </div>
        {paymentForm}
        <input
          type="submit"
          value={`Buy - ${
            hours === "24h"
              ? (Number(props.totalPrice) + 3.49).toFixed(2)
              : props.totalPrice
          }$`}
          onClick={emptyCart}
        />
      </Form>
    </div>
  );
};

export default Direction;

export async function action({ request }: any) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  console.log(datos);
  let error = "";

  const {
    hours24,
    cardholder,
    cvv,
    direction,
    email,
    expirationDateCard,
    payment,
    phone,
    visaNumber,
    paypalCard,
    paysafecard,
  } = datos;

  if (Object.values(datos).includes("")) {
    error = "All files are required";
    return error;
  }

  if (!validatePhone(phone)) {
    error = "Incorrect phone number";
    return error;
  }

  switch (payment) {
    case "visa":
      if (!validateVisaCreditCard(visaNumber, expirationDateCard, cvv)) {
        error = "Incorrect credit card fields";
        return error;
      }
      break;
    case "paypal":
      if (!validatePaypalEmail(paypalCard)) {
        error = "Incorrect paypal email";
        return error;
      }
      break;

    case "paysafecard":
      if (!validatePaysafecardCode(paysafecard)) {
        error = "Incorrect paysafecard code";
        return error;
      }
      break;

    default:
      error = "An error ocurred with the pay method";
      return error;
  }

  const token = getCookie("token");
  const cart = getCookie("cart") as IOrderCart[];

  const __token = getCookie("token");

  try {
    const user: IUser = await chargeUser(validateToken(__token).id, token);
    user.direction = direction;
    user.phone = phone;
    await updateUser(user, __token);
    await buy(cart, token);
    deleteCookie("cart");
    //return redirect('/')
    return null;
  } catch (e) {
    throw new Response(`Error: ${e}`, { status: 500 });
  }
}
