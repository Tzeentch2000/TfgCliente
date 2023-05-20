import React from 'react'
import style from './Error.module.scss'
import { useRouteError } from 'react-router-dom'
import errorImage from '../../assets/images/Error.webp'

const Error = () => {
  const error:any = useRouteError()
  console.error(`ERROR IN THE WEB: ${error.statusText || error.message}`)
  return (
    <div className={style.error}>
      <h1 className={style.title}>Books - Error</h1>
      <img className={style.image} src={`${errorImage}`} />
    </div>
  )
}

export default Error
