import { ReactNode } from "react"

export interface IToken {
    id: string,
    isAdmin: boolean
}

export interface IState{
    id:number,
    name:string,
    description:string,
    isActive:boolean
}

export interface ICategory{
    id:number,
    name:string,
    description:string,
    isActive:boolean
}

export interface IBook{
    id:number,
    name:string,
    description:string,
    author:string,
    price:number,
    image:string,
    categories:ICategory[],
    state:IState,
    isActive:boolean
}

export interface IOrders{
    id:number,
    amount:number,
    date:Date,
    bookId:number,
    book:IBook,
    userId:number
}

export interface IOrderCart{
    amount:number,
    bookId:number,
    book:IBook,
    userId:number
}

export interface IBuyCart{
    amount:number,
    bookId:number
}

export interface IFormatedOrders{
    id:number,
    amount:number,
    date:string,
    bookName:string
    price:string
}

export interface IUser{
    id:number,
    email:string,
    name:string,
    surname:string,
    password:string,
    phone:number,
    isAdmin:boolean,
    orders:IOrders
}

export interface IHomeLoaderData{
    books:IBook[],
    categories:ICategory[],
    states:IState[]
}

export interface IFilter{
    category:string,
    state:string,
    search:string
}

export interface modalRemoveCartElement{
    modal:boolean
    title:string
    bookId:number
}

export interface bookMaintenanceCategory{
    isIn:boolean
    category:ICategory
}


export interface InsertBook{
    id?:number,
    name:string,
    description:string,
    author:string,
    price:number,
    image:string,
    categories:ICategory[],
    state:IState,
    isActive:boolean
}
