import { HomeState } from './Interface/IState';
import * as Redux from 'redux'

export const FILTER_FORM_HIDE = 'FILTER_FORM_HIDE';



export interface FilterFormHideAction extends Redux.Action {
}



export const FilterFormHide = (): FilterFormHideAction => ({
    type: FILTER_FORM_HIDE,
})



const initialFilterState:
    HomeState = {
}

export const HomeReducer: Redux.Reducer<HomeState> = (state: HomeState = initialFilterState, action: Redux.Action): HomeState => {
  
    switch (action.type) {

        default:
            return state
    }
}

