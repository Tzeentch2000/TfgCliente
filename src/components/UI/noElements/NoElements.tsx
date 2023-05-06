import React from 'react'
import style from './NoElements.module.scss'

type Props = {
    text:string
}

const NoElements = (props:Props) => {
  return (
    <p className={style.nothing}>
        {props.text}
    </p>
  )
}

export default NoElements
