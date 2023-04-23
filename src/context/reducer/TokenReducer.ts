import { IToken } from "../../interfaces/Interfaces";

type TokenAction = 
    | { type: 'changeId', playload: string}
    | { type: 'changeIsAdmin', playload: boolean}

export function tokenReducer(state: IToken, action: TokenAction): IToken{
    switch (action.type) {
        case 'changeId':
            return {...state,id:action.playload}
            break;
        case 'changeIsAdmin':
            return {...state,isAdmin:action.playload}
            break;
        default:
            return {id:'',isAdmin:false}
            break;
    }
}