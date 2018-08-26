import * as Redux from 'redux';
import { LayoutState } from './Interface/IState'
import { InputAction } from '../../Core/Interface/IMessage';
import { ILayout } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { DEFAULT_LAYOUT } from '../../Core/Constants/GeneralConstants';

export const LAYOUT_SELECT = 'LAYOUT_SELECT';
export const LAYOUT_ADD_UPDATE = 'LAYOUT_ADD_UPDATE';
export const LAYOUT_SAVE = 'LAYOUT_SAVE';
export const LAYOUT_DELETE = 'DELETE_LAYOUT';
export const LAYOUT_PRESAVE = 'LAYOUT_PRESAVE';

export interface LayoutPreSaveAction extends Redux.Action {
    Index: number,
    Layout: ILayout
}

export interface LayoutAddUpdateAction extends Redux.Action {
    Index: number,
    Layout: ILayout
}

export interface LayoutSelectAction extends Redux.Action {
    LayoutName: string;
}

export interface LayoutDeleteAction extends Redux.Action {
    LayoutName: string
}

export interface LayoutIncludeVendorStateAction extends Redux.Action {
}

export interface LayoutExcludeVendorStateAction extends Redux.Action {
}

export const LayoutPreSave = (Index: number, Layout: ILayout): LayoutPreSaveAction => ({
    type: LAYOUT_PRESAVE,
    Index,
    Layout
})

export const LayoutAddUpdate = (Index: number, Layout: ILayout): LayoutAddUpdateAction => ({
    type: LAYOUT_ADD_UPDATE,
    Index,
    Layout
})

export const LayoutSelect = (LayoutName: string): LayoutSelectAction => ({
    type: LAYOUT_SELECT,
    LayoutName
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
        case LAYOUT_PRESAVE:
            return state
        case LAYOUT_SELECT:
            return Object.assign({}, state, { CurrentLayout: (<LayoutSelectAction>action).LayoutName })
        case LAYOUT_ADD_UPDATE:
            let actionTypedAddUpdate = (<LayoutAddUpdateAction>action)
            layouts = [].concat(state.Layouts);
            index = actionTypedAddUpdate.Index;
            if (actionTypedAddUpdate.Index > -1) {  // it exists
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
         default:
            return state
    }
}