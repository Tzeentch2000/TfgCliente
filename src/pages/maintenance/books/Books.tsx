import React, { useReducer, useState } from 'react'
import style from './Books.module.scss'
import Container from '../../../components/UI/container/Container'
import PageTitle from '../../../components/UI/pageTitle/PageTitle'
import { getBooks } from '../../../assets/functions/api'
import { useLoaderData } from 'react-router-dom'
import { IBook } from '../../../interfaces/Interfaces'
import Table from '../../../components/UI/Table/Table'
import NoElements from '../../../components/UI/noElements/NoElements'
import Modal from '../../../components/UI/modal/Modal'
import Confirm from '../../../components/confirm/Confirm'
import { ModalReducer } from '../../../components/confirm/reducer/ModalReducer'

const Books = () => {
  const books = useLoaderData() as IBook[]
  const [ editModal,setEditModal ] = useState(false)
  const [ modal,dispatchModal ] = useReducer(ModalReducer,{modal:false,title:'',bookId:0})
  
  const changeEditModal = (modal:boolean) => {
    setEditModal(modal)
  }

  const changeDeleteModal = (modal:boolean) => {
    dispatchModal({type:'changeModal',playload:modal})
  }

  const table = books.length > 0 ? 
  <Table 
    th={['Title','Author','Price']} 
    td={books} 
    properties={['name','author','price']} 
    editAction={changeEditModal} 
    deleteAction={dispatchModal} /> :
  <NoElements text='No books' />

  return (
    <>
      <Container>
        <div className={style.header}>
          <PageTitle title='Books maintenance' />
          <button>New Book</button>
        </div>
        {table}
      </Container>
      {modal.modal &&  <Modal title={'Remove'} setModal={changeDeleteModal}>
        <Confirm id={1} question={modal.title} closeModal={changeDeleteModal} handleClick={() => console.log('a')} />
      </Modal>}
    </>
  )
}

export default Books

export async function loader(){
  try{
    const books = await getBooks()
    return books
  }catch(e){
    throw new Response(`Error: ${e}`, { status: 500 });
  }
}
