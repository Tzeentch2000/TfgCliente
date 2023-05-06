import { modalRemoveCartElement } from "../../../interfaces/Interfaces";

type ModalActions = 
    | { type: 'changeModal', playload: boolean}
    | { type: 'changeTitle', playload: string}
    | { type: 'changeId', playload:number}

export function ModalReducer(state: modalRemoveCartElement, action: ModalActions): modalRemoveCartElement{
    switch (action.type) {
        case 'changeModal':
            return {...state,modal:action.playload}
            break;
        case 'changeTitle':
            return {...state,title:action.playload}
            break;
        case 'changeId':
            return {...state,bookId:action.playload}
            break;
        default:
            return {modal:false,title:'',bookId:0}
            break;
    }
}