export interface IToken {
    id: string,
    isAdmin: boolean
}

export interface IState{
    id:Number,
    name:string,
    description:string,
    isActive:boolean
}

export interface ICategory{
    id:Number,
    name:string,
    description:string,
    isActive:boolean
}

export interface IBook{
    id:Number,
    name:string,
    description:string,
    author:string,
    price:Number,
    image:string,
    categories:ICategory,
    state:IState,
    isActive:boolean
}

export interface IOrders{
    id:Number,
    amount:Number,
    Date:Date,
    BookId:Number,
    Book:IBook,
    UserId:Number
}

export interface IUser{
    id:Number,
    email:string,
    name:string,
    surname:string,
    password:string,
    phone:Number,
    isAdmin:boolean,
    orders:IOrders
}