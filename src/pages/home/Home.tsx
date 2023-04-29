import React, { useEffect } from 'react'
import style from './Home.module.scss'
import { useLoaderData } from 'react-router-dom'
import { IHomeLoaderData } from '../../interfaces/Interfaces'
import { getBooks, getCategories, getStates } from '../../assets/functions/api'
import Filter from '../../components/UI/Filter/Filter'
import SearchBar from '../../components/search/SearchBar'
import BookList from '../../components/bookList/BookList'

const Home = () => {
  const data = useLoaderData() as IHomeLoaderData
  return (
    <div className={style.container}>
      <h2 className={style.title}>Book List</h2>
      <div className={style.filter}>
        <div className={style.select}>
          <Filter items={data.categories} />
          <Filter items={data.states} />
        </div>
        <SearchBar />
      </div>
      <BookList books={data.books} />
    </div>
  )
}

export default Home

export async function loader(){
  const data = {} as IHomeLoaderData
  data.books = await getBooks()
  data.categories = await getCategories()
  data.states = await getStates()
  return data
}
