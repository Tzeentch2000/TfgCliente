import { useState,useEffect,createContext, useReducer } from "react";
import { tokenReducer } from "./reducer/TokenReducer";
import { IToken, IUser } from "../interfaces/Interfaces";
import { getCookie } from "../assets/functions/cookie";
import { validateToken } from "../assets/functions/validation";

//For children
interface props {
    children: React.ReactNode
}
type AuthContextType = {
    //token: IToken
    //setId: (id:string) => Promise<void>,
    //setIsAdmin: (isAdmin:boolean) => Promise<void>,
    user:IUser,
    setUser: (user:IUser) => void
}
//For object
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

//For useReducer
const INITIAL_TOKEN_STATE: IToken = {
    id:'',
    isAdmin:true
}

const AuthProvider = ({children}: props) => {

   //const [token,dispatchToken] = useReducer(tokenReducer,INITIAL_TOKEN_STATE)
   const [user,setUser] = useState({} as IUser)

   /*const setId = async (id:string) => {
       await dispatchToken({ type: 'changeId', playload: id})
   }
   const setIsAdmin = async (isAdmin:boolean) => {
       await dispatchToken({ type: 'changeIsAdmin', playload: isAdmin})
   }*/

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser
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