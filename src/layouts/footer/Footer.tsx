import React from 'react'
import style from './Footer.module.scss'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className={style.footer}>
        <nav>
            <ul>
                <li>
                    <NavLink to='/'>TFG San Valero Guillermo Sánchez Sanz 2022-2023</NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Footer
