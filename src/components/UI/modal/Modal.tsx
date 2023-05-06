import React, { ReactNode, useEffect, useState } from 'react'
import style from './Modal.module.scss'
import { IBook } from '../../../interfaces/Interfaces'
import { getBookById } from '../../../assets/functions/api'

type Props = {
  title:string
  children: ReactNode
  setModal:(modal:boolean) => void
  editId?:string
}

const Modal = (props:Props) => {
  const { title,children,setModal,editId } = props
  const [ book, setBook ] = useState({} as IBook)

  useEffect(() => {
    const chargeBook = async() => {
      const obtainedBook = await getBookById(Number(editId))
      setBook(obtainedBook)
    }
    if(editId){
      chargeBook()
    }
  },[])

  return (
    <div className={style.modal}>
      <div className={style.modalCard}>
        <div className={style.modalHeader}>
          <div className={style.modalTitle}>{title}</div>
          <div className={style.modalClose} onClick={() => setModal(false)}></div>
        </div>
        <div className={style.modalBody}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
