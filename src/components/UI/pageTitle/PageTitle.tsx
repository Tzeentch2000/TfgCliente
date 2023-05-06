import React from 'react'
import style from './PageTitle.module.scss'

type Props = {
    title:string
}

const PageTitle = (props:Props) => {
  return (
    <h2 className={style.title}>
      {props.title}
    </h2>
  )
}

export default PageTitle
