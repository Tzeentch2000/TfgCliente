import React from 'react'
import { Outlet } from 'react-router-dom'
import style from './Auth.module.scss'
import Card from '../../components/card/Card'

const Auth = () => {
  return (
    <div className={style.background}>
      <Card>
        <h2>Book eShop</h2>
        <Outlet />
      </Card>
    </div>
  )
}

export default Auth
