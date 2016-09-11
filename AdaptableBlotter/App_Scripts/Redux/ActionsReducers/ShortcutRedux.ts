/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import {ShortcutState} from './Interface/IState';
import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
import { ColumnType} from '../../Core/Enums';

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
    // creating 2 shortcuts one of which we will not make ispredefined to test
    Shortcuts: [
        { ShortcutId: 1, ShortcutKey: "M", ShortcutResult: 1000, ColumnType: ColumnType.Number,  IsLive: true, IsPredefined: true , IsDynamic: false }, 
        { ShortcutId: 2, ShortcutKey: "H", ShortcutResult: 100, ColumnType: ColumnType.Number, IsLive: false, IsPredefined: false, IsDynamic: false },
        { ShortcutId: 3, ShortcutKey: "T", ShortcutResult: "[Today Date]", ColumnType: ColumnType.Date, IsLive: true, IsPredefined: false, IsDynamic: true },
        { ShortcutId: 4, ShortcutKey: "L", ShortcutResult: "[Last Working Day]", ColumnType: ColumnType.Date, IsLive: true, IsPredefined: false, IsDynamic: true },
        { ShortcutId: 5, ShortcutKey: "N", ShortcutResult: "[Next Working Day]", ColumnType: ColumnType.Date, IsLive: true, IsPredefined: false, IsDynamic: true },
        ]
}

export const ShortcutReducer: Redux.Reducer<ShortcutState> = (state: ShortcutState = initialShortcutState, action: Redux.Action): ShortcutState => {
    switch (action.type) {
        //  have take all the otehr actions out of here for now; need to add back when we do add / edit / delete


         case SHORTCUT_SELECT: {
            var items: Array<IShortcut> = [].concat(state.Shortcuts);
            let updatedShortcut = (<ShortcutSelectAction>action).Shortcut;
             updatedShortcut.IsLive = !updatedShortcut.IsLive;
            let index = items.findIndex(x => x.ShortcutId == updatedShortcut.ShortcutId)
            items[index] = updatedShortcut;
 return Object.assign({}, state, {
                Shortcuts: items
            });
        }

case SHORTCUT_DELETE:
      let deletedShortcut = (<ShortcutDeleteAction>action).Shortcut; 
       
       // Should not be able to click delete button on predefined shortcuts but seems older browsers might not play ball so will add the check here as well....
        if (deletedShortcut.IsPredefined) {
           alert("You cannot delete this shortcut");
           return state;
        }
       
        // TODO: Some way of warning before delete 
            var items: Array<IShortcut> = [].concat(state.Shortcuts);
            let index = items.findIndex(x => x.ShortcutId == deletedShortcut.ShortcutId)
            items.splice(index, 1);

            return Object.assign({}, state, {
                Shortcuts: items
            });

        default:
            return state
    }
}