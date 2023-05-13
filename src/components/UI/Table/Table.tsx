import React, { useState } from 'react'
import style from './Table.module.scss'
import Modal from '../modal/Modal'

type ModalActions = 
    | { type: 'changeModal', playload: boolean}
    | { type: 'changeTitle', playload: string}
    | { type: 'changeId', playload:number}

type Props = {
    th:string[],
    td: {[key: string]: any}[],
    properties:string[],
    editAction?:React.Dispatch<ModalActions>
    deleteAction?:React.Dispatch<ModalActions>
}

const Table = (props:Props) => {

  const handleClickEdit = (id:number,title:string) => {
    console.log(id)
    if(editAction!==undefined){
      editAction({type:'changeId',playload:id})
      editAction({type:'changeModal',playload:true})
      editAction({type:'changeTitle',playload:title})
    }
  }

  const handleClickDelete = (id:number,title:string) => {
    if(deleteAction!==undefined){
      deleteAction({type:'changeId',playload:id})
      deleteAction({type:'changeModal',playload:true})
      deleteAction({type:'changeTitle',playload:title})
    }
  }

  const { th,td,properties,editAction,deleteAction } = props
  const actionsTh = (editAction || deleteAction) ? (<th>Actions</th>) : ''

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
            {editAction && (<button className={style.editButton} onClick={() => handleClickEdit(_td['id'],_td['name'])}>Edit</button>)}
            {deleteAction && (<button className={style.deleteButton} onClick={() => handleClickDelete(_td['id'],_td['name'])}>Delete</button>)}
          </td>)}
        </tr>
      ))}
      </tbody>
      </table>
    </>
  )
}

export default Table
