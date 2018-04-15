import * as Redux from 'redux';
import { LayoutState } from './Interface/IState'
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy';
import { InputAction } from '../../Core/Interface/IMessage';

export const LAYOUT_SELECT = 'LAYOUT_SELECT';
const LAYOUT_ADD_UPDATE = 'LAYOUT_ADD_UPDATE';
const LAYOUT_SAVE = 'LAYOUT_SAVE';
export const LAYOUT_DELETE = 'DELETE_LAYOUT';

export interface LayoutAddUpdateAction extends Redux.Action {
    Index: number,
    Layout: ILayout
}

export interface LayoutSelectAction extends Redux.Action {
    LayoutName: string;
}

export interface LayoutSaveAction extends Redux.Action {
    Layout: ILayout
}

export interface LayoutDeleteAction extends Redux.Action {
    LayoutName: string
}

export const LayoutAddUpdate = (Index: number, Layout: ILayout): LayoutAddUpdateAction => ({
    type: LAYOUT_ADD_UPDATE,
    Index,
    Layout
})

export const LayoutSelect = (LayoutName: string): LayoutSelectAction => ({
    type: LAYOUT_SELECT,
    LayoutName
})

export const LayoutSave = (Layout: ILayout): LayoutSaveAction => ({
    type: LAYOUT_SAVE,
    Layout
})

export const LayoutDelete = (LayoutName: string): LayoutDeleteAction => ({
    type: LAYOUT_DELETE,
    LayoutName
})

const initialLayoutState: LayoutState = {
    CurrentLayout: "",
    Layouts: []
}

export const LayoutReducer: Redux.Reducer<LayoutState> = (state: LayoutState = initialLayoutState, action: Redux.Action): LayoutState => {
    let index: number;
    let layouts: ILayout[]
    switch (action.type) {
        case LAYOUT_SELECT:
            return Object.assign({}, state, { CurrentLayout: (<LayoutSelectAction>action).LayoutName })
        case LAYOUT_ADD_UPDATE:
            let actionTypedAddUpdate = (<LayoutAddUpdateAction>action)
            layouts = [].concat(state.Layouts);
            index = actionTypedAddUpdate.Index + 1; // we add 1 to the index because the first is always default that is not passed in
            if (index > 0) {  // it exists
                layouts[index] = actionTypedAddUpdate.Layout
            } else {
                layouts.push(actionTypedAddUpdate.Layout)
            }
            return Object.assign({}, state, { Layouts: layouts })
        case LAYOUT_DELETE:
            let actionTypedDelete = (<LayoutDeleteAction>action)
            layouts = [].concat(state.Layouts)
            index = layouts.findIndex(a => a.Name == actionTypedDelete.LayoutName)
            layouts.splice(index, 1);
            return Object.assign({}, state, { Layouts: layouts })
        case LAYOUT_SAVE:
            let actionTypedSave = <LayoutSaveAction>action;
            layouts = [].concat(state.Layouts);
            index = layouts.findIndex(a => a.Name == actionTypedSave.Layout.Name)  // assuming you only save and not edit...
            layouts[index] = actionTypedSave.Layout;
            return Object.assign({}, state, { Layouts: layouts });
        default:
            return state
    }
}