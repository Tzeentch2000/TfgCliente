import React, { useReducer, useState } from 'react'
import style from './Books.module.scss'
import Container from '../../../components/UI/container/Container'
import PageTitle from '../../../components/UI/pageTitle/PageTitle'
import { deleteBook, getBooks } from '../../../assets/functions/api'
import { useLoaderData } from 'react-router-dom'
import { IBook } from '../../../interfaces/Interfaces'
import Table from '../../../components/UI/Table/Table'
import NoElements from '../../../components/UI/noElements/NoElements'
import Modal from '../../../components/UI/modal/Modal'
import Confirm from '../../../components/confirm/Confirm'
import { ModalReducer } from '../../../components/confirm/reducer/ModalReducer'
import { getCookie } from '../../../assets/functions/cookie'
import BookForm from '../../../components/bookForm/BookForm'

const Books = () => {
  const books = useLoaderData() as IBook[]
  const [ _books,_setBooks ] = useState(books)
  const [ createModal,setCreateModal ] = useState(false)
  const [ editModal,dispatchEditModal ] = useReducer(ModalReducer,{modal:false,title:'',bookId:0})
  const [ modal,dispatchModal ] = useReducer(ModalReducer,{modal:false,title:'',bookId:0})
  const [ failedToDelete,setFailedToDelete ] = useState(false)

  const changeCreateModal = (modal:boolean) => {
    setCreateModal(modal)
  }
  
  const changeEditModal = (modal:boolean) => {
    dispatchEditModal({type:'changeModal',playload:modal})
  }

  const changeDeleteModal = (modal:boolean) => {
    dispatchModal({type:'changeModal',playload:modal})
  }

  const changeFailedToDeleteModal = (modal:boolean) => {
    setFailedToDelete(modal)
  }

  const handleDeleteBook = async (id:number) => {
    try{
      const token = getCookie('token')
      await deleteBook(id,token)

      const newBooks = _books.filter(b => b.id !== id)
      _setBooks((prevBooks: any) => {
        return [newBooks,...prevBooks]
      })
    }catch(e){
      changeFailedToDeleteModal(true)
      throw new Error('Cant delete book')
    }
  }

  const table = _books.length > 0 ? 
  <Table 
    th={['Title','Author','Price']} 
    td={_books} 
    properties={['name','author','price']} 
    editAction={dispatchEditModal} 
    deleteAction={dispatchModal} /> :
  <NoElements text='No books' />

  return (
    <>
      <Container>
        <div className={style.header}>
          <PageTitle title='Books maintenance' />
          <button onClick={() => changeCreateModal(true)}>New Book</button>
        </div>
        {table}
      </Container>

      {createModal &&  <Modal title='Create book' setModal={changeCreateModal}>
        <BookForm />
      </Modal>}

      {editModal.modal &&   <Modal title={`Edit book "${editModal.title}"`} setModal={changeEditModal}>
        <BookForm bookId={editModal.bookId} />
      </Modal>}

      {modal.modal &&  <Modal title={'Remove'} setModal={changeDeleteModal} removeError={changeFailedToDeleteModal} >
        <Confirm id={1} question={modal.title} closeModal={changeDeleteModal} handleClick={() => handleDeleteBook(modal.bookId)} removeError={changeFailedToDeleteModal} />
        {failedToDelete && <p className={style.error}>Cannot delete this book. It has related users. You can update this book to inactive</p>}
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
