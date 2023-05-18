import React from 'react'
import style from './Chart.module.scss'
import Container from '../../components/UI/container/Container'
import PageTitle from '../../components/UI/pageTitle/PageTitle'
import { NavLink, Outlet, useNavigation } from 'react-router-dom'
import Spinner from '../../components/UI/spinner/Spinner'

const Chart = () => {
  const navigation = useNavigation()
  return (navigation.state === 'loading' ? <Spinner /> :
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
