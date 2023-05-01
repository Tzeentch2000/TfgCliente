import React, { ReactNode } from 'react'
import style from './Modal.module.scss'

type Props = {
  title:string
  children: ReactNode
  setModal:(modal:boolean) => void
  editId?:string
}

const Modal = (props:Props) => {
  const { title,children,setModal,editId } = props
  return (
    <div className={style.modal}>
      <div className={style.modalCard}>
        <div className={style.modalHeader}>
          <div className={style.modalTitle}>{title}</div>
          <div className={style.modalClose} onClick={() => setModal(false)}>X</div>
        </div>
        <div className={style.modalBody}>
          {children} id:{editId}
        </div>
      </div>
    </div>
  )
}

export default Modal
