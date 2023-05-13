import React, { useReducer, useState } from 'react'
import style from '../Maintenance.module.scss'
import Container from '../../../components/UI/container/Container'
import PageTitle from '../../../components/UI/pageTitle/PageTitle'
import { deleteState, getStates } from '../../../assets/functions/api'
import { useLoaderData } from 'react-router-dom'
import { IState } from '../../../interfaces/Interfaces'
import Table from '../../../components/UI/Table/Table'
import NoElements from '../../../components/UI/noElements/NoElements'
import Modal from '../../../components/UI/modal/Modal'
import Confirm from '../../../components/confirm/Confirm'
import { ModalReducer } from '../../../components/confirm/reducer/ModalReducer'
import { getCookie } from '../../../assets/functions/cookie'
import StateForm from '../../../components/stateForm/StateForm'

const States = () => {
  const states = useLoaderData() as IState[]
  const [ _states,_setStates ] = useState(states)
  const [ createModal,setCreateModal ] = useState(false)
  const [ editModal,dispatchEditModal ] = useReducer(ModalReducer,{modal:false,title:'',bookId:0})
  const [ modal,dispatchModal ] = useReducer(ModalReducer,{modal:false,title:'',bookId:0})
  const [ failedToDelete,setFailedToDelete ] = useState(false)

  const addState = (state:IState) => {
    _setStates((prevState: any) => {
      return [state,...prevState]
    })
  }

  const updateState = (updateState:IState) => {
    const updatedStates = _states.map(c => {
      if(c.id === updateState.id) return updateState
      return c
    })
    _setStates(updatedStates)
  }

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
      await deleteState(id,token)

      const newBooks = states.filter(c => c.id !== id)
      _setStates(newBooks)
    }catch(e){
      changeFailedToDeleteModal(true)
      throw new Error('Cant delete book')
    }
  }

  const table = _states.length > 0 ? 
  <Table 
    th={['Name','Description']} 
    td={_states} 
    properties={['name','description']} 
    editAction={dispatchEditModal} 
    deleteAction={dispatchModal} /> :
  <NoElements text='No books' />

  return (
    <>
      <Container>
        <div className={style.header}>
          <PageTitle title='State backoffice' />
          <button onClick={() => changeCreateModal(true)}>New State</button>
        </div>
        {table}
      </Container>

      {createModal &&  <Modal title='New State' setModal={changeCreateModal}>
      <StateForm addState={addState} closeModal={changeEditModal} />
        {/*<BookForm closeModal={changeCreateModal} addBook={addBook} /> */}
      </Modal>}

      {editModal.modal &&   <Modal title={`Edit State "${editModal.title}"`} setModal={changeEditModal}>
        <StateForm stateId={editModal.bookId} updateState={updateState} closeModal={changeEditModal} />
       {/* <BookForm bookId={editModal.bookId} updateBook={updateBook} closeModal={changeEditModal} /> */}
      </Modal>}

      {modal.modal &&  <Modal title={'Remove'} setModal={changeDeleteModal} removeError={changeFailedToDeleteModal} >
        <Confirm id={1} question={modal.title} closeModal={changeDeleteModal} handleClick={() => handleDeleteBook(modal.bookId)} removeError={changeFailedToDeleteModal} />
        {failedToDelete && <p className={style.error}>Cannot delete this state. It has related books. You can update this state to inactive</p>}
      </Modal>}
    </>
  )
}

export default States

export async function loader(){
  try{
    const states = await getStates()
    return states
  }catch(e){
    throw new Response(`Error: ${e}`, { status: 500 });
  }
}

