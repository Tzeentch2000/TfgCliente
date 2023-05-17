import React, { useEffect, useReducer, useState } from 'react'
import style from './Cart.module.scss'
import Container from '../../components/UI/container/Container'
import useCart from '../../hooks/useCart'
import { ModalReducer } from '../../components/confirm/reducer/ModalReducer'
import Modal from '../../components/UI/modal/Modal'
import ModalContent from '../../components/modalContent/ModalContent'
import Confirm from '../../components/confirm/Confirm'
import NoElements from '../../components/UI/noElements/NoElements'
import PageTitle from '../../components/UI/pageTitle/PageTitle'
import { setCookie } from '../../assets/functions/cookie'
import Direction from '../../components/direction/Direction'
import { useNavigation } from 'react-router-dom'
import Spinner from '../../components/UI/spinner/Spinner'

const Cart = () => {
  const navigation = useNavigation()
  const cart = useCart()
  const [ modal,dispatchModal ] = useReducer(ModalReducer,{modal:false,title:'',bookId:0})
  const [ buy,setBuy] = useState(false)

  const calculateTotalPrice = () => {
    return cart.cart.reduce((a, c) => a+=c.amount*c.book.price , 0)
  }
  const [ totalPrice,setTotalPrice ] = useState(calculateTotalPrice)

  useEffect(() =>{setTotalPrice(calculateTotalPrice)},[cart])

  const handleClickRemove = (title:string,bookId:number) => {
    dispatchModal({type:'changeModal',playload:true})
    dispatchModal({type:'changeTitle',playload:title})
    dispatchModal({type:'changeId',playload:bookId})
  }

  const closeModal = (modal:boolean) => {
    dispatchModal({type:'changeModal',playload:modal})
  }

  const closeBuy = (modal:boolean) => {
    setBuy(modal)
  }

  const increseAumount = (id:number) => {
    const newCart = cart.cart.map(c => {
      if(id === c.bookId && c.amount < 10){
        c.amount++
      }
      return c
    })
    setCookie('cart',newCart,1)
    cart.setCart(newCart)
  }

  const decreseAmount = (id:number) => {
    const newCart = cart.cart.map(c => {
      if(id === c.bookId && c.amount > 1){
        c.amount--
      }
      return c
    })
    setCookie('cart',newCart,1)
    cart.setCart(newCart)
  }

  const removeElementOfCart = async (id:number) => {
    const newCart = cart.cart.filter(a => a.bookId !== id)
    cart.setCart(newCart)
    setCookie('cart',newCart,1)
  }

  const htmlCart = cart.cart.length ? (<table>
    <thead>
      <tr>
      <th>Books</th>
      <th>Amount</th>
      <th>Price</th>
      <th>Actions</th>
      <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      {cart.cart.map(a => (
        <tr key={a.bookId}>
          <td>{a.book.name}</td>
          <td>{a.amount}</td>
          <td><span className={style.price}>{(a.book.price*a.amount).toFixed(2)} $</span></td>
          <td className={style.actions}>
            <span className={`${style.plus} ${a.amount >= 10 && style.disabled}`} onClick={() => increseAumount(a.bookId)}></span>
            <span className={`${style.min} ${a.amount <= 1 && style.disabled}`} onClick={() => decreseAmount(a.bookId)}></span>
          </td>
          <td className={style.remove}> 
            <button className={style['remove-btn']} onClick={() => handleClickRemove(a.book.name,a.bookId)}>Remove</button>
          </td>
        </tr>
      ))}
    </tbody>
    </table>) : (<NoElements text='There is nothing in the shopping cart' />)

  return ( navigation.state === 'loading' ? <Spinner /> :
    <>
      <Container>
        <PageTitle title='Cart' />
        {htmlCart}
        {cart.cart.length && <button className={style.btn} onClick={() => closeBuy(true)}>Buy - {totalPrice.toFixed(2)} $</button>}
      </Container>
      {modal.modal &&  <Modal title={'Remove'} setModal={closeModal}>
        <Confirm id={modal.bookId} question={modal.title} closeModal={closeModal} handleClick={removeElementOfCart} />
      </Modal>}
      {buy &&  <Modal title={'Buy'} setModal={closeBuy}>
        <Direction />
      </Modal>}
    </>
  )
}

export default Cart
