import * as Redux from 'redux';
import { LayoutState } from './Interface/IState'
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy';
import { InputAction } from '../../Core/Interface/IMessage';
import { IGridSort } from '../../Core/Interface/Interfaces';

export const LAYOUT_SELECT = 'LAYOUT_SELECT';
const LAYOUT_ADD = 'LAYOUT_ADD';
const LAYOUT_SAVE = 'LAYOUT_SAVE';
export const LAYOUT_DELETE = 'DELETE_LAYOUT';

export interface LayoutAddAction extends InputAction {
    Columns: string[],
    GridSort: IGridSort
}

export interface LayoutSelectAction extends Redux.Action {
    LayoutName: string;
}

export interface LayoutSaveAction extends Redux.Action {
    LayoutName: string,
    Columns: string[],
    GridSort: IGridSort
}

export interface LayoutDeleteAction extends Redux.Action {
    LayoutName: string
}

export const LayoutAdd = (Columns: string[], GridSort: IGridSort, InputText: string): LayoutAddAction => ({
    type: LAYOUT_ADD,
    Columns,
    GridSort,
    InputText
})

export const LayoutSelect = (LayoutName: string): LayoutSelectAction => ({
    type: LAYOUT_SELECT,
    LayoutName
})

export const LayoutSave = (Columns: string[],  GridSort: IGridSort, LayoutName: string): LayoutSaveAction => ({
    type: LAYOUT_SAVE,
    Columns,
    GridSort,
    LayoutName
})

export const LayoutDelete = (LayoutName: string): LayoutDeleteAction => ({
    type: LAYOUT_DELETE,
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
        case LAYOUT_SELECT:
            return Object.assign({}, state, { CurrentLayout: (<LayoutSelectAction>action).LayoutName })
        case LAYOUT_ADD:
            let actionTypedAdd = (<LayoutAddAction>action)
            let layoutToAdd: ILayout = { Columns: actionTypedAdd.Columns, GridSort: actionTypedAdd.GridSort, Name: actionTypedAdd.InputText, IsPredefined: false }
            layouts = [].concat(state.AvailableLayouts);
            layouts.push(layoutToAdd);
            return Object.assign({}, state, { CurrentLayout: layoutToAdd.Name, AvailableLayouts: layouts });
        case LAYOUT_DELETE:
            let actionTypedDelete = (<LayoutDeleteAction>action)
            layouts = [].concat(state.AvailableLayouts)
            index = layouts.findIndex(a => a.Name == actionTypedDelete.LayoutName)
            layouts.splice(index, 1);
            return Object.assign({}, state, { AvailableLayouts: layouts })
        case LAYOUT_SAVE:
            let actionTypedSave = <LayoutSaveAction>action;
            layouts = [].concat(state.AvailableLayouts);
            index = layouts.findIndex(a => a.Name == actionTypedSave.LayoutName)
            let layoutToSave: ILayout = { Columns: actionTypedSave.Columns, GridSort: actionTypedSave.GridSort, Name: actionTypedSave.LayoutName, IsPredefined: false }
            layouts[index] = layoutToSave;
            return Object.assign({}, state, { AvailableLayouts: layouts });
        default:
            return state
    }
}