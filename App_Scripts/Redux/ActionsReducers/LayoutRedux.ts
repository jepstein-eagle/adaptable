import * as Redux from 'redux';
import { LayoutState } from './Interface/IState'
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy';
import { InputAction } from '../../Core/Interface/IMessage';

export const LAYOUT_SELECT = 'LAYOUT_SELECT';
const LAYOUT_ADD = 'LAYOUT_ADD';
const LAYOUT_SAVE = 'LAYOUT_SAVE';
export const LAYOUT_DELETE = 'DELETE_LAYOUT';

export interface LayoutAddAction extends InputAction {
    Columns: string[],
}

export interface LayoutSelectAction extends Redux.Action {
    LayoutName: string;
}

export interface LayoutSaveAction extends Redux.Action {
    LayoutName: string,
    Columns: string[],
}

export interface LayoutDeleteAction extends Redux.Action {
    LayoutName: string
}

export const LayoutAdd = (Columns: string[], InputText: string): LayoutAddAction => ({
    type: LAYOUT_ADD,
    Columns,
    InputText
})

export const LayoutSelect = (LayoutName: string): LayoutSelectAction => ({
    type: LAYOUT_SELECT,
    LayoutName
})

export const LayoutSave = (Columns: string[], LayoutName: string): LayoutSaveAction => ({
    type: LAYOUT_SAVE,
    Columns,
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
            let layoutToAdd: ILayout = { Columns: actionTypedAdd.Columns, Name: actionTypedAdd.InputText, IsPredefined: false }
            layouts = [].concat(state.AvailableLayouts);
            layouts.push(layoutToAdd);
            return Object.assign({}, state, { CurrentLayout: layoutToAdd.Name, AvailableLayouts: layouts });
        case LAYOUT_DELETE:
            let actionTypedDelete = (<LayoutDeleteAction>action)
            layouts = [].concat(state.AvailableLayouts)
            index = layouts.findIndex(a => a.Name == actionTypedDelete.LayoutName)
            layouts.splice(index, 1);
            return Object.assign({}, state, { CurrentLayout: "", AvailableLayouts: layouts })
        case LAYOUT_SAVE:
            let actionTypedSave = <LayoutSaveAction>action;
            layouts = [].concat(state.AvailableLayouts);
            index = layouts.findIndex(a => a.Name == actionTypedSave.LayoutName)
            let layoutToSave: ILayout = { Columns: actionTypedSave.Columns, Name: actionTypedSave.LayoutName, IsPredefined: false }
            layouts[index] = layoutToSave;
            return Object.assign({}, state, { AvailableLayouts: layouts });
        default:
            return state
    }
}