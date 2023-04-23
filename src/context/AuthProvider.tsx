import { useState,useEffect,createContext, useReducer } from "react";
import { tokenReducer } from "./reducer/TokenReducer";
import { IToken } from "../interfaces/Interfaces";
import { getCookie } from "../assets/functions/cookie";
import { validateToken } from "../assets/functions/validation";

//For children
interface props {
    children: React.ReactNode
}
type AuthContextType = {
    token: IToken
    setId: (id:string) => void,
    setIsAdmin: (isAdmin:boolean) => void,
    a:string,
    setA: (a:string) => void
}
//For object
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

//For useReducer
const INITIAL_TOKEN_STATE: IToken = {
    id:'',
    isAdmin:true
}

const AuthProvider = ({children}: props) => {

   const [token,dispatchToken] = useReducer(tokenReducer,INITIAL_TOKEN_STATE)
   const [a,setA] = useState('F')

   const setId = (id:string) => {
        dispatchToken({ type: 'changeId', playload: id})
   }
   const setIsAdmin = (isAdmin:boolean) => {
        dispatchToken({ type: 'changeIsAdmin', playload: isAdmin})
   }

    return(
        <AuthContext.Provider
            value={{
                token,
                setId,
                setIsAdmin,
                a,
                setA
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthProvider
}

export default AuthContext