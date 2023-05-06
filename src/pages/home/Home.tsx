import React, { useEffect, useReducer, useState } from 'react'
import style from './Home.module.scss'
import { useLoaderData } from 'react-router-dom'
import { IBook, IFilter, IHomeLoaderData } from '../../interfaces/Interfaces'
import { getActiveBooks, getActiveCategories, getActiveStates } from '../../assets/functions/api'
import Filter from '../../components/UI/Filter/Filter'
import SearchBar from '../../components/search/SearchBar'
import BookList from '../../components/bookList/BookList'
import { filteredDataReducer } from './DataFilterReducer'
import { filterCategory, filterSearch, filterState } from '../../assets/functions/filters'
import PageTitle from '../../components/UI/pageTitle/PageTitle'

const initialFilterData:IFilter = {
  category:'',
  state:'',
  search:''
}

const Home = () => {
  const data = useLoaderData() as IHomeLoaderData
  const [ books,setBooks ] = useState<IBook[]>([])
  const [ dataFilter,dispatchDataFilter ] = useReducer(filteredDataReducer,initialFilterData)

  useEffect(() => {
    const { category,state,search } = dataFilter
    const filteredBooks:IBook[] = data.books.filter(b => filterCategory(b,category)).filter(b => filterState(b,state)).filter(b => filterSearch(b,search))
    setBooks(filteredBooks)
  },[data,dataFilter])

  const handleChangeCategory = (value:string) => {
    dispatchDataFilter({ type: 'changeCategory', playload: value})
  }

  const handleChangeState = (value:string) => {
    dispatchDataFilter({ type: 'changeState', playload: value})
  }

  const handleChangeSearch = (value:string) => {
    dispatchDataFilter({ type: 'changeSearch', playload: value})
  }

  return (
    <div className={style.container}>
      <PageTitle title='Home' />
      <div className={style.filter}>
        <div className={style.select}>
          <Filter items={data.categories} handleChange={handleChangeCategory} />
          <Filter items={data.states} handleChange={handleChangeState} />
        </div>
        <SearchBar handleChange={handleChangeSearch}/>
      </div>
      <BookList books={books} />
    </div>
  )
}

export default Home

export async function loader(){
  const data = {} as IHomeLoaderData
  data.books = await getActiveBooks()
  data.categories = await getActiveCategories()
  data.states = await getActiveStates()
  return data
}
