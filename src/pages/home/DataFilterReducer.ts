import { IFilter } from "../../interfaces/Interfaces";

type FilterAction = 
    | { type: 'changeCategory', playload: string}
    | { type: 'changeState', playload: string}
    | { type: 'changeSearch', playload: string}

export function filteredDataReducer(state: IFilter, action: FilterAction): IFilter{
    switch (action.type) {
        case 'changeCategory':
            return {...state,category:action.playload}
            break;
        case 'changeState':
            return {...state,state:action.playload}
            break;
        case 'changeSearch':
            return {...state,search:action.playload}
            break;
        default:
            return {...state}
            break;
    }
}