/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { LayoutState } from './interface/IState'
import { ILayout } from '../../Core/interface/ILayoutStrategy';
import { IColumn } from '../../Core/interface/IAdaptableBlotter'
import { InputAction } from '../../Core/Interface/IStrategy';


export const SET_CURRENT_LAYOUT = 'SET_CURRENT_LAYOUT';
const ADD_LAYOUT = 'ADD_LAYOUT';
const SAVE_LAYOUT = 'SAVE_LAYOUT';
export const DELETE_LAYOUT = 'DELETE_LAYOUT';

export interface SetCurrentLayoutAction extends Redux.Action {
    LayoutName: string;
}

export const SetCurrentLayout = (LayoutName: string): SetCurrentLayoutAction => ({
    type: SET_CURRENT_LAYOUT,
    LayoutName
})

export interface AddLayoutAction extends InputAction {
    Columns: string[],

}

export const AddLayout = (Columns: string[], InputText: string): AddLayoutAction => ({
    type: ADD_LAYOUT,
    Columns,
    InputText
})

export interface SaveLayoutAction extends Redux.Action {
    LayoutName: string,
    Columns: string[],
}

export const SaveLayout = (Columns: string[], LayoutName: string): SaveLayoutAction => ({
    type: SAVE_LAYOUT,
    Columns,
    LayoutName
})

export interface DeleteLayoutAction extends Redux.Action {
    LayoutName: string
}

export const DeleteLayout = (LayoutName: string): DeleteLayoutAction => ({
    type: DELETE_LAYOUT,
    LayoutName
})


const initialLayoutState: LayoutState = {
    CurrentLayout: "",
    AvailableLayouts: [],
}

export const LayoutReducer: Redux.Reducer<LayoutState> = (state: LayoutState = initialLayoutState, action: Redux.Action): LayoutState => {
    let index: number;
    let layouts: ILayout[]
    switch (action.type) {
        case SET_CURRENT_LAYOUT:
            return Object.assign({}, state, { CurrentLayout: (<SetCurrentLayoutAction>action).LayoutName })
        case ADD_LAYOUT:
            let actionTypedAdd = (<AddLayoutAction>action)
            let layoutToAdd: ILayout = { Columns: actionTypedAdd.Columns, Name: actionTypedAdd.InputText }
            layouts = [].concat(state.AvailableLayouts);
            layouts.push(layoutToAdd);
            return Object.assign({}, state, { CurrentLayout: layoutToAdd.Name, AvailableLayouts: layouts });
        case DELETE_LAYOUT:
            let actionTypedDelete = (<DeleteLayoutAction>action)
            layouts = [].concat(state.AvailableLayouts)
            index = layouts.findIndex(a => a.Name == actionTypedDelete.LayoutName)
            layouts.splice(index, 1);
            return Object.assign({}, state, { CurrentLayout: "", AvailableLayouts: layouts })
        case SAVE_LAYOUT:
            let actionTypedSave = <SaveLayoutAction>action;
            layouts = [].concat(state.AvailableLayouts);
            index = layouts.findIndex(a => a.Name == actionTypedSave.LayoutName)
            let layoutToSave: ILayout = { Columns: actionTypedSave.Columns, Name: actionTypedSave.LayoutName }
            layouts[index] = layoutToSave;
            return Object.assign({}, state, { AvailableLayouts: layouts });
        default:
            return state
    }
}