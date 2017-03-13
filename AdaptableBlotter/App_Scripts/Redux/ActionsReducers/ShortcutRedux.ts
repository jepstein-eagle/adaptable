/// <reference path="../../../typings/index.d.ts" />

import { ShortcutState } from './Interface/IState';
import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
import { ICellInfo } from '../../Core/Interface/IStrategy';
import { DataType, ShortcutAction } from '../../Core/Enums';

export const SHORTCUT_SELECT = 'SHORTCUT_SELECT';
export const SHORTCUT_APPLY = 'SHORTCUT_APPLY';
export const SHORTCUT_ADD = 'SHORTCUT_ADD';
export const SHORTCUT_DELETE = 'SHORTCUT_DELETE';
export const SHORTCUT_CHANGE_KEY = 'SHORTCUT_CHANGE_KEY';
export const SHORTCUT_CHANGE_OPERATION = 'SHORTCUT_CHANGE_OPERATION';
export const SHORTCUT_CHANGE_RESULT = 'SHORTCUT_CHANGE_RESULT';

export interface ShortcutSelectAction extends Redux.Action {
    Shortcut: IShortcut,

}

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
    NewShortcutAction: ShortcutAction
}

export interface ShortcutChangeResultAction extends Redux.Action {
    Shortcut: IShortcut,
    NewShortcutResult: any;
}

export const ShortcutSelect = (Shortcut: IShortcut): ShortcutSelectAction => ({
    type: SHORTCUT_SELECT,
    Shortcut
})

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

export const ShortcutChangeOperation = (Shortcut: IShortcut, NewShortcutAction: ShortcutAction): ShortcutChangeOperationAction => ({
    type: SHORTCUT_CHANGE_OPERATION,
    Shortcut,
    NewShortcutAction
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
    NumericShortcuts: [
        { ShortcutKey: "M", ShortcutResult: 1000000, DataType: DataType.Number, ShortcutAction: ShortcutAction.Multiply, IsLive: false, IsPredefined: true, IsDynamic: false },
        { ShortcutKey: "K", ShortcutResult: 1000, DataType: DataType.Number, ShortcutAction: ShortcutAction.Multiply, IsLive: false, IsPredefined: true, IsDynamic: false },
        { ShortcutKey: "H", ShortcutResult: 100, DataType: DataType.Number, ShortcutAction: ShortcutAction.Multiply, IsLive: false, IsPredefined: true, IsDynamic: false },
    ],
    DateShortcuts: [
        { ShortcutKey: "T", ShortcutResult: "Today", DataType: DataType.Date, ShortcutAction: ShortcutAction.Replace, IsLive: false, IsPredefined: true, IsDynamic: true },
        { ShortcutKey: "L", ShortcutResult: "Last Work Day", DataType: DataType.Date, ShortcutAction: ShortcutAction.Replace, IsLive: false, IsPredefined: true, IsDynamic: true },
        { ShortcutKey: "N", ShortcutResult: "Next Work Day", DataType: DataType.Date, ShortcutAction: ShortcutAction.Replace, IsLive: false, IsPredefined: true, IsDynamic: true },
    ]
}

export const ShortcutReducer: Redux.Reducer<ShortcutState> = (state: ShortcutState = initialShortcutState, action: Redux.Action): ShortcutState => {
    switch (action.type) {
        case SHORTCUT_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state)


        case SHORTCUT_CHANGE_KEY: {
            let actionTyped = <ShortcutChangeKeyAction>action
            let shortcut = actionTyped.Shortcut
            if (shortcut.DataType == DataType.Number) {
                let items: Array<IShortcut> = [].concat(state.NumericShortcuts);
                let index = items.indexOf(shortcut)
                items[index] = Object.assign({}, shortcut, { ShortcutKey: actionTyped.NewShortcutKey })
                return Object.assign({}, state, {
                    NumericShortcuts: items
                });
            }
            else if (shortcut.DataType == DataType.Date) {
                let items: Array<IShortcut> = [].concat(state.DateShortcuts);
                let index = items.indexOf(shortcut)
                items[index] = Object.assign({}, shortcut, { ShortcutKey: actionTyped.NewShortcutKey })
                return Object.assign({}, state, {
                    DateShortcuts: items
                });
            }
        }
        case SHORTCUT_CHANGE_OPERATION: {
            let actionTyped = <ShortcutChangeOperationAction>action
            let shortcut = actionTyped.Shortcut
            if (shortcut.DataType == DataType.Number) {
                let items: Array<IShortcut> = [].concat(state.NumericShortcuts);
                let index = items.indexOf(shortcut)
                items[index] = Object.assign({}, shortcut, { ShortcutAction: actionTyped.NewShortcutAction })
                return Object.assign({}, state, {
                    NumericShortcuts: items
                });
            }
            else if (shortcut.DataType == DataType.Date) {
                let items: Array<IShortcut> = [].concat(state.DateShortcuts);
                let index = items.indexOf(shortcut)
                items[index] = Object.assign({}, shortcut, { ShortcutAction: actionTyped.NewShortcutAction })
                return Object.assign({}, state, {
                    DateShortcuts: items
                });
            }
        }
        case SHORTCUT_CHANGE_RESULT: {
            let actionTyped = <ShortcutChangeResultAction>action
            let shortcut = actionTyped.Shortcut
            if (shortcut.DataType == DataType.Number) {
                let items: Array<IShortcut> = [].concat(state.NumericShortcuts);
                let index = items.indexOf(shortcut)
                items[index] = Object.assign({}, shortcut, { ShortcutResult: actionTyped.NewShortcutResult })
                return Object.assign({}, state, {
                    NumericShortcuts: items
                });
            }
            else if (shortcut.DataType == DataType.Date) {
                let items: Array<IShortcut> = [].concat(state.DateShortcuts);
                let index = items.indexOf(shortcut)
                items[index] = Object.assign({}, shortcut, { ShortcutResult: actionTyped.NewShortcutResult })
                return Object.assign({}, state, {
                    DateShortcuts: items
                });
            }
        }
        case SHORTCUT_ADD: {
            let newShortcut = (<ShortcutAddAction>action).Shortcut
            if (newShortcut.DataType == DataType.Number) {
                var items: Array<IShortcut> = [].concat(state.NumericShortcuts);
                items.push(newShortcut);
                return Object.assign({}, state, {
                    NumericShortcuts: items
                });
            }
            else if (newShortcut.DataType == DataType.Date) {
                var items: Array<IShortcut> = [].concat(state.DateShortcuts);
                items.push(newShortcut);
                return Object.assign({}, state, {
                    DateShortcuts: items
                });
            }
        }
        case SHORTCUT_SELECT: {
            let updatedShortcut = (<ShortcutSelectAction>action).Shortcut
            if (updatedShortcut.DataType == DataType.Number) {
                var items: Array<IShortcut> = [].concat(state.NumericShortcuts);
                updatedShortcut = Object.assign({}, updatedShortcut, {
                    IsLive: !updatedShortcut.IsLive
                });
                let index = items.findIndex(x => x.ShortcutKey == updatedShortcut.ShortcutKey)
                items[index] = updatedShortcut;
                return Object.assign({}, state, {
                    NumericShortcuts: items
                });
            }
            else if (updatedShortcut.DataType == DataType.Date) {
                var items: Array<IShortcut> = [].concat(state.DateShortcuts);
                updatedShortcut = Object.assign({}, updatedShortcut, {
                    IsLive: !updatedShortcut.IsLive
                });
                let index = items.findIndex(x => x.ShortcutKey == updatedShortcut.ShortcutKey)
                items[index] = updatedShortcut;
                return Object.assign({}, state, {
                    DateShortcuts: items
                });
            }
        }

        case SHORTCUT_DELETE: {
            let deletedShortcut = (<ShortcutDeleteAction>action).Shortcut;

            // Should not be able to click delete button on predefined shortcuts but seems older browsers might not play ball so will add the check here as well....
            if (deletedShortcut.IsPredefined) {
                alert("You cannot delete this shortcut");
                return state;
            }

            if (deletedShortcut.DataType == DataType.Number) {
                var items: Array<IShortcut> = [].concat(state.NumericShortcuts);
                let index = items.findIndex(x => x.ShortcutKey == deletedShortcut.ShortcutKey)
                items.splice(index, 1);

                return Object.assign({}, state, {
                    NumericShortcuts: items
                });

            }
            else if (deletedShortcut.DataType == DataType.Date) {
                var items: Array<IShortcut> = [].concat(state.DateShortcuts);
                let index = items.findIndex(x => x.ShortcutKey == deletedShortcut.ShortcutKey)
                items.splice(index, 1);

                return Object.assign({}, state, {
                    DateShortcuts: items
                });
            }
        }
        default:
            return state
    }
}