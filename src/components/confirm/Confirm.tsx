import React from 'react'
import style from './Confirm.module.scss'

type Props = {
    id:number,
    question:string,
    closeModal:(modal:boolean) => void,
    handleClick: (id:number) => Promise<void>,
    removeError?:(error:boolean) => void
}

const Confirm = (props:Props) => {

    const { id,question,closeModal,handleClick,removeError } = props

    const handleClickYes = async() => {
      try{
        await handleClick(id)
        closeModal(false)
      }catch(e){
        return
      }
    }

    const handleClickNo = () => {
      closeModal(false)
      if(removeError !== undefined) removeError(false)
    }

  return (
    <div className={style.container}>
      <div className={style.question}>Are you sure you want to remove "{question}"?</div>
      <div className={style['btn-container']}>
        <button onClick={handleClickYes}>Yes</button>
        <button onClick={handleClickNo}>No</button></div>
    </div>
  )
}

export default Confirm
