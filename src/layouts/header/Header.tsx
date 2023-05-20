import React, { useEffect, useState } from 'react'
import style from './Header.module.scss'
import { deleteCookie, getCookie } from '../../assets/functions/cookie'
import { validateToken } from '../../assets/functions/validation'
import useAuth from '../../hooks/useAuth'
import { useNavigate,NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { chargeUser } from '../../assets/functions/api'
import { IUser } from '../../interfaces/Interfaces'
import useCart from '../../hooks/useCart'
import { IOrderCart } from '../../interfaces/Interfaces'
import Footer from '../footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const navigate = useNavigate()
  const cart = useCart()
  const {user,setUser} = useAuth()

  const __token = getCookie('token')  
    useEffect(() => {
      try{
        if(getCookie('token') === null){
          navigate('/authentication')
          return
        }

        const takeData = async () =>{
          const _token = await getCookie('token')
          const _user:IUser = await chargeUser(validateToken(_token).id,_token)
          setUser(_user)
        }

        const takeCart = () => {
          if(getCookie('cart') === null) return
          cart.setCart(getCookie('cart') as IOrderCart)
        }
        takeData()
        takeCart()
      }catch(e){
        navigate('/authentication')
        return
      }
    },[])

    const handleClickCloseSession = () => {
      deleteCookie('token')
      deleteCookie('cart')
      navigate('/authentication')
    }

    const cartCount = cart.cart.length > 0 ? `(${cart.cart.length})` : ''
    
  return (
    <>
      <header className={style.header}>
        <nav>
          <ul>
              <li className={style.active}>
                <NavLink to='/' className={({ isActive }) =>isActive ? style.active : ''} end>Home</NavLink>
              </li>
              {validateToken(__token).userRole == 'True' && (<><li>
                <NavLink to='backoffice' className={({ isActive }) =>isActive ? style.active : ''}>BackOffice</NavLink>
              </li>
              <li>
                <NavLink to='Charts' className={({ isActive }) =>isActive ? style.active : ''}>Charts</NavLink>
              </li></>)}
              <li>
                <NavLink to='History' className={({ isActive }) =>isActive ? style.active : ''}>Orders</NavLink>
              </li>
              <li>
                <NavLink to='Cart' className={({ isActive }) =>isActive ? style.active : ''}>Cart <FontAwesomeIcon icon={faCartShopping} />{cartCount}</NavLink>
              </li>
              <li>
                <a onClick={handleClickCloseSession}>Close session</a>
              </li>
          </ul>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

/*export async function loader(){
  if(getCookie('token') === null){
    return
  }
  const clientes = await obtenerClientes()
  return clientes
}*/

export default Header
