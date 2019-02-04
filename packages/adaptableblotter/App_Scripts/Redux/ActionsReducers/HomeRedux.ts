import { HomeState } from './Interface/IState';
import * as Redux from 'redux'

export const FILTER_FORM_HIDE = 'FILTER_FORM_HIDE';

export const FLOATING_FILTER_BAR_SHOW = 'FLOATING_FILTER_BAR_SHOW';
export const FLOATING_FILTER_BAR_HIDE = 'FLOATING_FILTER_BAR_HIDE';


export interface FilterFormHideAction extends Redux.Action {
}

export interface FloatingFilterBarShowAction extends Redux.Action {
}

export interface FloatingFilterBarHideAction extends Redux.Action {
}

export const FilterFormHide = (): FilterFormHideAction => ({
    type: FILTER_FORM_HIDE,
})

export const FloatingilterBarShow = (): FloatingFilterBarShowAction => ({
    type: FLOATING_FILTER_BAR_SHOW
})

export const FloatingFilterBarHide = (): FloatingFilterBarHideAction => ({
    type: FLOATING_FILTER_BAR_HIDE
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

