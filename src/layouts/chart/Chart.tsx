import React from 'react'
import style from './Chart.module.scss'
import Container from '../../components/UI/container/Container'
import PageTitle from '../../components/UI/pageTitle/PageTitle'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Chart = () => {
  const navigate = useNavigate()
  return (
    <Container>
        <p className={style.breadcrumb}>
          <NavLink to='/charts' className={({ isActive }) =>isActive ? style.active : ''} end>Line</NavLink>
          <NavLink to='/charts/radio' className={({ isActive }) =>isActive ? style.active : ''} end>Radio</NavLink>
        </p>
        <Outlet />
    </Container>
  )
}

export default Chart
