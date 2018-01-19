import { CustomSortState } from './Interface/IState';
import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
import * as Redux from 'redux'

export const CUSTOMSORT_ADD = 'CUSTOMSORT_ADD';
export const CUSTOMSORT_EDIT = 'CUSTOMSORT_EDIT';
export const CUSTOMSORT_DELETE = 'CUSTOMSORT_DELETE';

export interface CustomSortAddAction extends Redux.Action {
    CustomSort: ICustomSort
}

export interface CustomSortEditAction extends Redux.Action {
    CustomSort: ICustomSort
}

export interface CustomSortDeleteAction extends Redux.Action {
    CustomSort: ICustomSort
}

export const CustomSortAdd = (CustomSort: ICustomSort): CustomSortAddAction => ({
    type: CUSTOMSORT_ADD,
    CustomSort
})

export const CustomSortEdit = (CustomSort: ICustomSort): CustomSortEditAction => ({
    type: CUSTOMSORT_EDIT,
    CustomSort
})
export const CustomSortDelete = (CustomSort: ICustomSort): CustomSortDeleteAction => ({
    type: CUSTOMSORT_DELETE,
    CustomSort
})

const initialCustomSortState: CustomSortState = {
    CustomSorts: []
}

export const CustomSortReducer: Redux.Reducer<CustomSortState> = (state: CustomSortState = initialCustomSortState, action: Redux.Action): CustomSortState => {
    let customSorts: ICustomSort[]

    switch (action.type) {
<<<<<<< HEAD
        case CUSTOMSORT_ADD:
            customSorts = [].concat(state.CustomSorts);
            customSorts.push((<CustomSortAddAction>action).CustomSort);
=======
        case CUSTOMSORT_ADD: {
            let items: Array<ICustomSort> = [].concat(state.CustomSorts);

            items.push((<CustomSortAddAction>action).CustomSort);
>>>>>>> d8124607be5295d24aac33c46b01b2409145eb0c
            return Object.assign({}, state, {
                CustomSorts: customSorts
            });
        }
        case CUSTOMSORT_EDIT: {
<<<<<<< HEAD
            customSorts = [].concat(state.CustomSorts);
            let index = customSorts.findIndex(x => x.ColumnId == (<CustomSortAddAction>action).CustomSort.ColumnId)
            customSorts[index] = (<CustomSortAddAction>action).CustomSort;
=======
            let items: Array<ICustomSort> = [].concat(state.CustomSorts);
            let index = items.findIndex(x => x.ColumnId == (<CustomSortAddAction>action).CustomSort.ColumnId)
            items[index] = (<CustomSortAddAction>action).CustomSort;

>>>>>>> d8124607be5295d24aac33c46b01b2409145eb0c
            return Object.assign({}, state, {
                CustomSorts: customSorts
            });
        }
<<<<<<< HEAD
        case CUSTOMSORT_DELETE:
            customSorts = [].concat(state.CustomSorts);
            let index = customSorts.findIndex(x => x.ColumnId == (<CustomSortDeleteAction>action).CustomSort.ColumnId)
            customSorts.splice(index, 1);
=======
        case CUSTOMSORT_DELETE: {
            let items: Array<ICustomSort> = [].concat(state.CustomSorts);
            let index = items.findIndex(x => x.ColumnId == (<CustomSortDeleteAction>action).CustomSort.ColumnId)
            items.splice(index, 1);

>>>>>>> d8124607be5295d24aac33c46b01b2409145eb0c
            return Object.assign({}, state, {
                CustomSorts: customSorts
            });
        }
        default:
            return state
    }
}