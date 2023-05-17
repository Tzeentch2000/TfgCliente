import React, { useReducer, useState } from 'react'
import style from '../Maintenance.module.scss'
import Container from '../../../components/UI/container/Container'
import PageTitle from '../../../components/UI/pageTitle/PageTitle'
import { deleteCategory, getCategories } from '../../../assets/functions/api'
import { useLoaderData, useNavigation } from 'react-router-dom'
import { ICategory } from '../../../interfaces/Interfaces'
import Table from '../../../components/UI/Table/Table'
import NoElements from '../../../components/UI/noElements/NoElements'
import Modal from '../../../components/UI/modal/Modal'
import Confirm from '../../../components/confirm/Confirm'
import { ModalReducer } from '../../../components/confirm/reducer/ModalReducer'
import { getCookie } from '../../../assets/functions/cookie'
import CategoryForm from '../../../components/categoryForm/CategoryForm'
import Spinner from '../../../components/UI/spinner/Spinner'

const Categories = () => {
  const navigation = useNavigation()
  const categories = useLoaderData() as ICategory[]
  const [ _categories,_setCategories ] = useState(categories)
  const [ createModal,setCreateModal ] = useState(false)
  const [ editModal,dispatchEditModal ] = useReducer(ModalReducer,{modal:false,title:'',bookId:0})
  const [ modal,dispatchModal ] = useReducer(ModalReducer,{modal:false,title:'',bookId:0})
  const [ failedToDelete,setFailedToDelete ] = useState(false)

  const addCategory = (category:ICategory) => {
    _setCategories((prevBooks: any) => {
      return [category,...prevBooks]
    })
  }

  const updateCategory = (updatedCategory:ICategory) => {
    const updatedCategories = _categories.map(c => {
      if(c.id === updatedCategory.id) return {...updatedCategory,date:c.date}
      return c
    })
    _setCategories(updatedCategories)
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
      await deleteCategory(id,token)

      const newBooks = _categories.filter(c => c.id !== id)
      _setCategories(newBooks)
    }catch(e){
      changeFailedToDeleteModal(true)
      throw new Error('Cant delete book')
    }
  }

  const table = _categories.length > 0 ? 
  <Table 
    th={['Name','Description']} 
    td={_categories} 
    properties={['name','description']} 
    editAction={dispatchEditModal} 
    deleteAction={dispatchModal} /> :
  <NoElements text='No Categories' />

  return ( navigation.state === 'loading' ? <Spinner /> :
    <>
      <Container>
        <div className={style.header}>
          <PageTitle title='Categories backoffice' />
          <button onClick={() => changeCreateModal(true)}>New Category</button>
        </div>
        {table}
      </Container>

      {createModal &&  <Modal title='New category' setModal={changeCreateModal}>
      <CategoryForm addCategory={addCategory} closeModal={changeCreateModal} />
      </Modal>}

      {editModal.modal &&   <Modal title={`Edit Category "${editModal.title}"`} setModal={changeEditModal}>
        <CategoryForm categoryId={editModal.bookId} updateCategory={updateCategory} closeModal={changeEditModal} />
      </Modal>}

      {modal.modal &&  <Modal title={'Remove'} setModal={changeDeleteModal} removeError={changeFailedToDeleteModal} >
        <Confirm id={1} question={modal.title} closeModal={changeDeleteModal} handleClick={() => handleDeleteBook(modal.bookId)} removeError={changeFailedToDeleteModal} />
        {failedToDelete && <p className={style.error}>Cannot delete this category. It has related books. You can update this category to inactive</p>}
      </Modal>}
    </>
  )
}

export default Categories

export async function loader(){
    const categories = await getCategories()
    if(categories === null) throw { message: 'Could not fetch events' }
    return categories
}

