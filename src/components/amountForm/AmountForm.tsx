import React, { useEffect, useState } from 'react'
import style from './AmountForm.module.scss'
import { IBook, IOrderCart } from '../../interfaces/Interfaces'
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { setCookie } from '../../assets/functions/cookie';

type Props = {
    book:IBook;
    handleCloseModal:() => void
}

const AmountForm = (props:Props) => {
  const auth = useAuth()
  const cart = useCart()
  const { price: bookPrice } = props.book
  const [ price,setPrice ] = useState(bookPrice)
  const [ amount,setAmount ] = useState(1)

  useEffect(() => {
    setPrice(Number((bookPrice*amount).toFixed(2)))
  },[amount])

  const handleClickPlus = () => {
    if(amount < 10){
      setAmount(amount+1)
    }
  }

  const handleClickSubstract = () => {
    if(amount > 1){
      setAmount(amount-1)
    }
  }

  const addToCart = async() => {
    props.handleCloseModal()
    const newOrder = {amount,bookId:props.book.id,book:props.book,userId:auth.user.id} as IOrderCart
    cart.setCart((prevUser: any) => {
      setCookie('cart',[newOrder,...prevUser],1)
      return [newOrder,...prevUser]
    })
  }

  return (
   <div className={style.amount}>
    <div className={style.container}>
      <p>
        Amaunt: {amount} 
      </p>
      <p className={style.actions}>
        <span className={`${style.plus} ${amount > 9 ? style.disabled : ''}`} onClick={handleClickPlus}></span>
        <span className={`${style.min} ${amount <= 1 ? style.disabled : ''}`} onClick={handleClickSubstract}></span>
      </p>
    </div>
    <button onClick={addToCart}>Add to cart - {price}</button>
   </div>
  )
}

export default AmountForm
