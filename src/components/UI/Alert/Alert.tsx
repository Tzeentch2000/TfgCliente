import React from 'react'
import style from './Alert.module.scss'

const Alert: React.FC<{type: string, message: string}> = (props) => {
    const { type,message } = props
    const className = type === 'error' ? style.error : undefined
  return (
    <div className={`${style.alert} ${className}`}>
      {message}
    </div>
  )
}

export default Alert
