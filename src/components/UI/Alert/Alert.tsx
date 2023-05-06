import React from 'react'
import style from './Alert.module.scss'

const Alert: React.FC<{type: string, message: string}> = (props) => {
    const { type,message } = props
    let className = ''
    if(type === 'error')
      className = ' ' + style.error
    
    if(type === 'success')
      className = ' ' + style.success
    
  return (
    <div className={`${style.alert}${className}`}>
      {message}
    </div>
  )
}

export default Alert
