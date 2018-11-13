import { HomeState } from './Interface/IState';
import * as Redux from 'redux'

export const FILTER_FORM_HIDE = 'FILTER_FORM_HIDE';

export const QUICK_FILTER_BAR_SHOW = 'QUICK_FILTER_BAR_SHOW';
export const QUICK_FILTER_BAR_HIDE = 'QUICK_FILTER_BAR_HIDE';


export interface HideFilterFormAction extends Redux.Action {
}

export interface QuickFilterBarShowAction extends Redux.Action {
}

export interface QuickFilterBarHideAction extends Redux.Action {
}

export const HideFilterForm = (): HideFilterFormAction => ({
    type: FILTER_FORM_HIDE,
})

export const QuickFilterBarShow = (): QuickFilterBarShowAction => ({
    type: QUICK_FILTER_BAR_SHOW
})

export const QuickFilterBarHide = (): QuickFilterBarHideAction => ({
    type: QUICK_FILTER_BAR_HIDE
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

