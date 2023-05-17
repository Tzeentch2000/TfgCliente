import React from 'react'
import style from './Error.module.scss'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error:any = useRouteError()
  return (
    <div className={style.error}>
      <h1>Books - react</h1>
      <p><span>Error </span>{error.statusText || error.message}</p>
    </div>
  )
}

export default Error
