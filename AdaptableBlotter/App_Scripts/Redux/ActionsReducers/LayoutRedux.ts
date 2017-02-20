/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { LayoutState } from './interface/IState'
import { ILayout } from '../../Core/interface/ILayoutStrategy';
import { IColumn } from '../../Core/interface/IAdaptableBlotter'
import { InputAction } from '../../Core/Interface/IStrategy';


const LOAD_LAYOUT = 'LOAD_LAYOUT';
const SAVE_LAYOUT = 'SAVE_LAYOUT';
const DELETE_LAYOUT = 'DELETE_LAYOUT';

export interface LoadLayoutAction extends Redux.Action {
    LayoutName: string;
}

export const LoadLayout = (LayoutName: string): LoadLayoutAction => ({
    type: LOAD_LAYOUT,
    LayoutName
})

export interface SaveLayoutAction extends InputAction{
    Columns: IColumn[],
    
}

export const SaveLayout = (Columns: IColumn[], InputText: string): SaveLayoutAction => ({
    type: SAVE_LAYOUT,
    Columns,
    InputText
})

export interface LayoutDeleteAction extends Redux.Action {
    LayoutName: string
}

export const DeleteLayout = (LayoutName: string): LayoutDeleteAction => ({
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
        case LOAD_LAYOUT:
            return Object.assign({}, state, { CurrentLayout: (<LoadLayoutAction>action).LayoutName })
        case SAVE_LAYOUT:
            let actionTypedSave = (<SaveLayoutAction>action)
            let newLayout: ILayout = { Columns: actionTypedSave.Columns, Name: actionTypedSave.InputText }
            layouts = [].concat(state.AvailableLayouts);
            layouts.push(newLayout);
            return Object.assign({}, state, { CurrentLayout: newLayout.Name, AvailableLayouts: layouts });
        case DELETE_LAYOUT:
            let actionTypedDelete = (<LayoutDeleteAction>action)
            layouts = [].concat(state.AvailableLayouts)
            index = layouts.findIndex(a => a.Name == actionTypedDelete.LayoutName)
            layouts.splice(index, 1);
            return Object.assign({}, state, { CurrentLayout: "", AvailableLayouts: layouts })
        default:
            return state
    }
}