import { ShortcutState } from './Interface/IState';
import { MathOperation } from '../../Utilities/Enums';
import * as Redux from 'redux'
import { ICellInfo } from "../../Utilities/Interface/ICellInfo";
import { IShortcut } from '../../Utilities/Interface/IAdaptableBlotterObjects';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const SHORTCUT_APPLY = 'SHORTCUT_APPLY';
export const SHORTCUT_ADD = 'SHORTCUT_ADD';
export const SHORTCUT_DELETE = 'SHORTCUT_DELETE';
export const SHORTCUT_CHANGE_KEY = 'SHORTCUT_CHANGE_KEY';
export const SHORTCUT_CHANGE_OPERATION = 'SHORTCUT_CHANGE_OPERATION';
export const SHORTCUT_CHANGE_RESULT = 'SHORTCUT_CHANGE_RESULT';

export interface ShortcutApplyAction extends Redux.Action {
    Shortcut: IShortcut,
    CellInfo: ICellInfo,
    KeyEventString: string,
    NewValue: any
}

export interface ShortcutAddAction extends Redux.Action {
    Shortcut: IShortcut
}

export interface ShortcutDeleteAction extends Redux.Action {
    Shortcut: IShortcut
}

export interface ShortcutChangeKeyAction extends Redux.Action {
    Shortcut: IShortcut,
    NewShortcutKey: string
}

export interface ShortcutChangeOperationAction extends Redux.Action {
    Shortcut: IShortcut,
    NewShortcutOperation: MathOperation
}

export interface ShortcutChangeResultAction extends Redux.Action {
    Shortcut: IShortcut,
    NewShortcutResult: any;
}


export const ShortcutApply = (Shortcut: IShortcut, CellInfo: ICellInfo, KeyEventString: string, NewValue: any): ShortcutApplyAction => ({
    type: SHORTCUT_APPLY,
    Shortcut,
    CellInfo,
    KeyEventString,
    NewValue
})

export const ShortcutAdd = (Shortcut: IShortcut): ShortcutAddAction => ({
    type: SHORTCUT_ADD,
    Shortcut
})

export const ShortcutChangeKey = (Shortcut: IShortcut, NewShortcutKey: string): ShortcutChangeKeyAction => ({
    type: SHORTCUT_CHANGE_KEY,
    Shortcut,
    NewShortcutKey
})

export const ShortcutChangeOperation = (Shortcut: IShortcut, NewShortcutOperation: MathOperation): ShortcutChangeOperationAction => ({
    type: SHORTCUT_CHANGE_OPERATION,
    Shortcut,
    NewShortcutOperation
})

export const ShortcutChangeResult = (Shortcut: IShortcut, NewShortcutResult: any): ShortcutChangeResultAction => ({
    type: SHORTCUT_CHANGE_RESULT,
    Shortcut,
    NewShortcutResult
})

export const ShortcutDelete = (Shortcut: IShortcut): ShortcutDeleteAction => ({
    type: SHORTCUT_DELETE,
    Shortcut
})

const initialShortcutState: ShortcutState = {
    Shortcuts: EMPTY_ARRAY
}

export const ShortcutReducer: Redux.Reducer<ShortcutState> = (state: ShortcutState = initialShortcutState, action: Redux.Action): ShortcutState => {
    let shortcuts: IShortcut[]

    switch (action.type) {
        case SHORTCUT_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state)

        case SHORTCUT_CHANGE_KEY: {
            let actionTyped = <ShortcutChangeKeyAction>action
            let shortcut = actionTyped.Shortcut
            shortcuts = [].concat(state.Shortcuts)
            let index = shortcuts.indexOf(shortcut)
            shortcuts[index] = Object.assign({}, shortcut, { ShortcutKey: actionTyped.NewShortcutKey })
            return Object.assign({}, state, { Shortcuts: shortcuts });
        }
        case SHORTCUT_CHANGE_OPERATION: {
            let actionTyped = <ShortcutChangeOperationAction>action
            let shortcut = actionTyped.Shortcut
            shortcuts = [].concat(state.Shortcuts)
            let index = shortcuts.indexOf(shortcut)
            shortcuts[index] = Object.assign({}, shortcut, { ShortcutOperation: actionTyped.NewShortcutOperation })
            return Object.assign({}, state, { Shortcuts: shortcuts });
        }
        case SHORTCUT_CHANGE_RESULT: {
            let actionTyped = <ShortcutChangeResultAction>action
            let shortcut = actionTyped.Shortcut
            shortcuts = [].concat(state.Shortcuts)
            let index = shortcuts.indexOf(shortcut)
            shortcuts[index] = Object.assign({}, shortcut, { ShortcutResult: actionTyped.NewShortcutResult })
            return Object.assign({}, state, { Shortcuts: shortcuts });
        }
        case SHORTCUT_ADD: {
            let newShortcut = (<ShortcutAddAction>action).Shortcut
            shortcuts = [].concat(state.Shortcuts)
            shortcuts.push(newShortcut);
            return Object.assign({}, state, { Shortcuts: shortcuts });
        }
        case SHORTCUT_DELETE: {
            let deletedShortcut = (<ShortcutDeleteAction>action).Shortcut;
            shortcuts = [].concat(state.Shortcuts)
            let index = shortcuts.findIndex(x => x.ShortcutKey == deletedShortcut.ShortcutKey)
            shortcuts.splice(index, 1);
            return Object.assign({}, state, { Shortcuts: shortcuts });
        }
        default:
            return state
    }
}