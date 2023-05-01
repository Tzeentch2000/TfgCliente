import React, { useState } from 'react'
import style from './Table.module.scss'
import Modal from '../modal/Modal'
import { IEditTable } from '../../../interfaces/Interfaces'

type Props = {
    th:string[],
    td: {[key: string]: any}[],
    properties:string[],
    editAction?:IEditTable
    deleteAction?:(id:string) => void
}

const Table = (props:Props) => {
  const [ editId,setEditId ] = useState('')
  const [ modal,setModal ] = useState(false)

  const handleClickEdit = (id:string) => {
    setEditId(id)
    setModal(true)
  }

  const changeModal = (modal:boolean) => {
    setModal(modal)
  }

  const { th,td,properties,editAction,deleteAction } = props
  const actionsTh = (editAction || deleteAction) ? (<th>Actions</th>) : ''

  const handleDelete = (id:string,name:string) => {
    if(window.confirm(`Are you sure you want to delete ${name}?`)) deleteAction && deleteAction(id)
  }
  return (
    <>
      <table className={style.table}>
      <thead>
        <tr>
          {th.map((_th,index) => (
            <th key={index}>{_th}</th>
          ))}
          {actionsTh}
        </tr>
      </thead>
      <tbody>
      {td.map(_td => (
        <tr key={_td['id']}>
          {properties.map((p,index) => (
            <td key={index}>{_td[p]}</td>
          ))}
          {(editAction || deleteAction) && (<td className={style.containerButton}>
            {editAction && (<button className={style.editButton} onClick={() => handleClickEdit(_td['id'])}>Edit</button>)}
            {deleteAction && (<button className={style.deleteButton} onClick={() => handleDelete(_td['id'],_td['name'] || _td['title'])}>Delete</button>)}
          </td>)}
        </tr>
      ))}
      </tbody>
      </table>
      {modal && <Modal title={editAction?.modalTitle!} setModal={changeModal} editId={editId}>{editAction?.modalContent!}</Modal>}
    </>
  )
}

export default Table
