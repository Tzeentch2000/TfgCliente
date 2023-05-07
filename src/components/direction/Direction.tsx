import React, { useState } from 'react'
import style from './Direction.module.scss'
import { Form, redirect, useActionData } from 'react-router-dom'
import Alert from '../UI/Alert/Alert'
import useAuth from '../../hooks/useAuth'
import { deleteCookie, getCookie } from '../../assets/functions/cookie'
import { IOrderCart } from '../../interfaces/Interfaces'
import { buy } from '../../assets/functions/api'
import useCart from '../../hooks/useCart'

const Direction = () => {
    const auth = useAuth()
    const cart = useCart()
    const [ direction,setDirection ] = useState(auth.user.email)
    const error: any = useActionData()
    const showError = (error?.length > 0 && direction.trim().length === 0) ? <Alert type='error' message={error} /> : undefined

    const onHandleChangeDirection = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDirection(e.target.value)
    }

    const emptyCart = () => {
      if(direction.trim() !== '') cart.setCart([] as IOrderCart[])
    }

  return (
    <div className={style.formulario}>
        <Form method='post' action='/cart'>
            {showError}
                <div className={style.bloque}>
                    <label htmlFor='direction'>Direction:</label>
                    <input type="text" placeholder='Direction' name='direction' id='direction' value={direction} onChange={e => onHandleChangeDirection(e)}/>
                </div>
                <input type="submit" value="Buy" onClick={emptyCart} />
        </Form>
    </div>
  )
}

export default Direction

export async function action({request} : any){
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)
  let error = ''

  const { direction } = datos

  if(Object.values(datos).includes('')){
    error = 'Direction file are required'
    return error
  }

  const token = getCookie('token')
  const cart = getCookie('cart') as IOrderCart[]
  const directionCart = cart.map(c => {
    return {...c,direction}
  })
  try{
    await buy(cart,token)
    deleteCookie('cart')
    return redirect('/')
  }catch(e){
    throw new Response(`Error: ${e}`, { status: 500 });
  }
}
