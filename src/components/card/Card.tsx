import React from 'react'
import style from './Card.module.scss'

type CardProps = {
    children: React.ReactNode
}

/*type CardProps = {
    message: string,
    children?: ReactNode
}*/

const Card = ({children} : CardProps) => {
  return (
    <div className={style.card}>
      {children}
    </div>
  )
}

export default Card
