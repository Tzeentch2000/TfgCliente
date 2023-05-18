import React from 'react'
import style from './Backoffice.module.scss'
import Container from '../../components/UI/container/Container'
import { NavLink, Outlet, useNavigation } from 'react-router-dom'
import Spinner from '../../components/UI/spinner/Spinner'

const Backoffice = () => {
    const navigation = useNavigation()
    return (navigation.state === 'loading' ? <Spinner /> :
      <Container>
          <p className={style.breadcrumb}>
            <NavLink to='/backoffice' className={({ isActive }) =>isActive ? style.active : ''} end>Books</NavLink>
            <NavLink to='/backoffice/categories' className={({ isActive }) =>isActive ? style.active : ''} end>Categories</NavLink>
            <NavLink to='/backoffice/states' className={({ isActive }) =>isActive ? style.active : ''} end>States</NavLink>
          </p>
          <Outlet />
      </Container>
    )
}

export default Backoffice
