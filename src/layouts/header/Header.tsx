import React, { useEffect, useState } from 'react'
import style from './Header.module.scss'
import { getCookie } from '../../assets/functions/cookie'
import { validateToken } from '../../assets/functions/validation'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const {token,setId,setIsAdmin,a,setA} = useAuth();

    useEffect(() => {
      setA(getCookie('token'))
      if(getCookie('token') === null){
          navigate('/authentication')
          return
      }
      setId(validateToken(getCookie('token')).id)
      if(validateToken(getCookie('token')).userRole === 'True'){
          setIsAdmin(true)
      }
    },[])
    
  return (
    <header className={style.header}>
      <nav>
        <ul>
            <li className={style.active}><a>Home</a></li>
            <li><a>Books</a></li>
            <li><a>Categories</a></li>
            <li><a>States</a></li>
            <li><a>Charts</a></li>
            <li><a>History</a></li>
            <li><a>Cart</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
