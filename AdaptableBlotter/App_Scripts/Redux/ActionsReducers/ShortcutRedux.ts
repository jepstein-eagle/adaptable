/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import {ShortcutState} from './Interface/IState';
import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
import { ColumnType} from '../../Core/Enums';
import {ShortcutAction} from '../../Core/Enums';

export const SHORTCUT_SELECT = 'SHORTCUT_SELECT';
export const SHORTCUT_ADD = 'SHORTCUT_ADD';
export const SHORTCUT_EDIT = 'SHORTCUT_EDIT';
export const SHORTCUT_DELETE = 'SHORTCUT_DELETE';

export interface ShortcutSelectAction extends Redux.Action {
    Shortcut: IShortcut
}

export interface ShortcutAddAction extends Redux.Action {
    Shortcut: IShortcut
}

export interface ShortcutEditAction extends Redux.Action {
    Shortcut: IShortcut
}

export interface ShortcutDeleteAction extends Redux.Action {
    Shortcut: IShortcut
}

export const SelectShortcut = (Shortcut: IShortcut): ShortcutSelectAction => ({
    type: SHORTCUT_SELECT,
    Shortcut
})

export const AddShortcut = (Shortcut: IShortcut): ShortcutAddAction => ({
    type: SHORTCUT_ADD,
    Shortcut
})

export const EditShortcut = (Shortcut: IShortcut): ShortcutEditAction => ({
    type: SHORTCUT_EDIT,
    Shortcut
})

export const DeleteShortcut = (Shortcut: IShortcut): ShortcutDeleteAction => ({
    type: SHORTCUT_DELETE,
    Shortcut
})

const initialShortcutState: ShortcutState = {
    NumericShortcuts: [
        { ShortcutKey: "M", ShortcutResult: 1000, ColumnType: ColumnType.Number, ShortcutAction: ShortcutAction.Multiply, IsLive: true, IsPredefined: true, IsDynamic: false },
        { ShortcutKey: "H", ShortcutResult: 100, ColumnType: ColumnType.Number, ShortcutAction: ShortcutAction.Multiply, IsLive: true, IsPredefined: true, IsDynamic: false },
    ],
    DateShortcuts: [
        { ShortcutKey: "T", ShortcutResult: "[Today Date]", ColumnType: ColumnType.Date, ShortcutAction: ShortcutAction.Replace, IsLive: false, IsPredefined: true, IsDynamic: true },
        { ShortcutKey: "L", ShortcutResult: "[Last Working Day]", ColumnType: ColumnType.Date, ShortcutAction: ShortcutAction.Replace, IsLive: false, IsPredefined: true, IsDynamic: true },
        { ShortcutKey: "N", ShortcutResult: "[Next Working Day]", ColumnType: ColumnType.Date, ShortcutAction: ShortcutAction.Replace, IsLive: false, IsPredefined: true, IsDynamic: true },
    ]
}

export const ShortcutReducer: Redux.Reducer<ShortcutState> = (state: ShortcutState = initialShortcutState, action: Redux.Action): ShortcutState => {
    switch (action.type) {
        //  have take all the otehr actions out of here for now; need to add back when we do add / edit / delete
        case SHORTCUT_ADD: {
            let newShortcut = (<ShortcutAddAction>action).Shortcut
            if (newShortcut.ColumnType == ColumnType.Number) {
                var items: Array<IShortcut> = [].concat(state.NumericShortcuts);
                items.push(newShortcut);
                return Object.assign({}, state, {
                    NumericShortcuts: items
                });
            }
            else if (newShortcut.ColumnType == ColumnType.Date) {
                var items: Array<IShortcut> = [].concat(state.DateShortcuts);
                items.push(newShortcut);
                return Object.assign({}, state, {
                    DateShortcuts: items
                });
            }
        }
        case SHORTCUT_SELECT: {
            let updatedShortcut = (<ShortcutSelectAction>action).Shortcut
            if (updatedShortcut.ColumnType == ColumnType.Number) {
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
            else if (updatedShortcut.ColumnType == ColumnType.Date) {
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

        case SHORTCUT_DELETE:{
            let deletedShortcut = (<ShortcutDeleteAction>action).Shortcut;

            // Should not be able to click delete button on predefined shortcuts but seems older browsers might not play ball so will add the check here as well....
            if (deletedShortcut.IsPredefined) {
                alert("You cannot delete this shortcut");
                return state;
            }

            if (deletedShortcut.ColumnType == ColumnType.Number) {
                var items: Array<IShortcut> = [].concat(state.NumericShortcuts);
                let index = items.findIndex(x => x.ShortcutKey == deletedShortcut.ShortcutKey)
                items.splice(index, 1);

                return Object.assign({}, state, {
                    NumericShortcuts: items
                });

            }
            else if (deletedShortcut.ColumnType == ColumnType.Date) {
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