import React from 'react'
import style from './Confirm.module.scss'

type Props = {
    id:number,
    question:string,
    closeModal:(modal:boolean) => void,
    handleClick:(id:number) => void
}

const Confirm = (props:Props) => {

    const { id,question,closeModal,handleClick } = props

    const handleClickYes = () => {
        handleClick(id)
        closeModal(false)
    }

  return (
    <div className={style.container}>
      <div className={style.question}>Are you sure you want to remove "{question}"?</div>
      <div className={style['btn-container']}>
        <button onClick={handleClickYes}>Yes</button>
        <button onClick={() => closeModal(false)}>No</button></div>
    </div>
  )
}

export default Confirm
