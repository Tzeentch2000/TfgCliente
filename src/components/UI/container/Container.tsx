import React from 'react'
import style from './Container.module.scss'

type Props = {
    children: React.ReactNode
}

const Container = ({children} : Props) => {
  return (
    <div className={style.container}>
      {children}
    </div>
  )
}

export default Container
