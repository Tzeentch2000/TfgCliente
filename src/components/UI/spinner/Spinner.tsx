import React from 'react'
import style from './Spinner.module.scss'

const Spinner = () => {
  return (
    <div className={style['container']}>
        <div className={style['sk-chase']}>
            <div className={style['sk-chase-dot']}></div>
            <div className={style['sk-chase-dot']}></div>
            <div className={style['sk-chase-dot']}></div>
            <div className={style['sk-chase-dot']}></div>
            <div className={style['sk-chase-dot']}></div>
            <div className={style['sk-chase-dot']}></div>
        </div>
    </div>
  )
}

export default Spinner
