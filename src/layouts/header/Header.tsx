import React, { useEffect, useState } from 'react'
import style from './Header.module.scss'
import { deleteCookie, getCookie } from '../../assets/functions/cookie'
import { validateToken } from '../../assets/functions/validation'
import useAuth from '../../hooks/useAuth'
import { useNavigate,NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { chargeUser } from '../../assets/functions/api'
import { IUser } from '../../interfaces/Interfaces'

const Header = () => {
  const navigate = useNavigate()
  const {token,setId,setIsAdmin,user,setUser} = useAuth();

    useEffect(() => {
      if(getCookie('token') === null){
          navigate('/authentication')
          return
      }
      const _token = getCookie('token')
      setId(validateToken(_token).id)
      console.log(validateToken(_token).userRole)
      if(validateToken(_token).userRole === 'True'){
          setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }

      const takeUser = async () =>{
        console.log('Entra')
        const _user:IUser = await chargeUser(token.id,_token)
        setUser(_user)
      }
      takeUser()
    },[])

    const handleClickCloseSession = () => {
      deleteCookie('token')
      navigate('/authentication')
    }
    
  return (
    <>
      <header className={style.header}>
        <nav>
          <ul>
              <li className={style.active}>
                <NavLink to='/' className={({ isActive }) =>isActive ? style.active : ''} end>Home</NavLink>
              </li>
              <li>
                <NavLink to='Books' className={({ isActive }) =>isActive ? style.active : ''}>Books</NavLink>
              </li>
              <li>
                <NavLink to='Categories' className={({ isActive }) =>isActive ? style.active : ''}>Categories</NavLink>
              </li>
              <li>
                <NavLink to='States' className={({ isActive }) =>isActive ? style.active : ''}>States</NavLink>
              </li>
              <li>
                <NavLink to='History' className={({ isActive }) =>isActive ? style.active : ''}>History</NavLink>
              </li>
              <li>
                <NavLink to='Cart' className={({ isActive }) =>isActive ? style.active : ''}>Cart</NavLink>
              </li>
              <li>
                <a onClick={handleClickCloseSession}>{user.name}</a>
              </li>
          </ul>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
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
