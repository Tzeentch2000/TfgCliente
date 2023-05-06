import { useState,useEffect,createContext, useReducer } from "react";
import { tokenReducer } from "./reducer/TokenReducer";
import { IOrderCart, IToken, IUser } from "../interfaces/Interfaces";
import { getCookie } from "../assets/functions/cookie";
import { validateToken } from "../assets/functions/validation";

interface props {
    children: React.ReactNode
}
type CartContextType = {
    cart:IOrderCart[],
    setCart:(orders: any) => void
}
//For object
const CartContext = createContext<CartContextType>({} as CartContextType)


const CartProvider = ({children}: props) => {

   const [ cart,setCart ] = useState<IOrderCart[]>([] as IOrderCart[])

    return(
        <CartContext.Provider
            value={{
                cart,
                setCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}


export {
    CartProvider
}

export default CartContext