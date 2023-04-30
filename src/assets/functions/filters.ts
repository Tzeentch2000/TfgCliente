import { IBook } from "../../interfaces/Interfaces";

export const filterCategory = (book:IBook,category:string) => {
    if(category === ''){
        return book
    }

    let find = false
    book.categories.map(c =>{
        if(c.id.toString() === category){
            find = true
        }
    })
    
    if(find) return book
}

export const filterState = (book:IBook,state:string) => {
    if(state === ''){
        return book
    }

    if(book.state.id.toString() === state) return book
}


export const filterSearch = (book:IBook,search:string) => {
    if(search.trim() === ''){
        return book
    }

    if(book.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
        return book
    }
}