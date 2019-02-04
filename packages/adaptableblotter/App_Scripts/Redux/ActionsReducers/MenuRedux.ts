import * as Redux from 'redux';
import { MenuState } from './Interface/IState'
import { IMenuItem } from '../../Utilities/Interface/IMenu';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const SET_MENUITEMS = 'SET_MENUITEMS';
export const BUILD_COLUMN_CONTEXT_MENU = 'BUILD_COLUMN_CONTEXT_MENU';
export const ADD_ITEM_COLUMN_CONTEXT_MENU = 'ADD_ITEM_COLUMN_CONTEXT_MENU';
export const CLEAR_COLUMN_CONTEXT_MENU = 'CLEAR_COLUMN_CONTEXT_MENU';


export interface SetMenuItemsAction extends Redux.Action {
    MenuItems: IMenuItem[];
}

export interface BuildColumnContextMenuAction extends Redux.Action {
    ColumnId: string;
}

//export interface ShowColumnContextMenuAction extends Redux.Action {
//}

export interface AddItemColumnContextMenuAction extends Redux.Action {
    Item: IMenuItem
}

export interface ClearColumnContextMenuAction extends Redux.Action {
}

//we do not use Redux.ActionCreator as we want to be typed safe for the arguments..... Redux.ActionCreator doesnt really make any sense to me as a consequence!!!!
export const SetMenuItems = (MenuItems: IMenuItem[]): SetMenuItemsAction => ({
    type: SET_MENUITEMS,
    MenuItems
})

export const BuildColumnContextMenu = (ColumnId: string): BuildColumnContextMenuAction => ({
    type: BUILD_COLUMN_CONTEXT_MENU,
    ColumnId
})

//export const ShowColumnContextMenu = (): ShowColumnContextMenuAction => ({
//   type: SHOW_COLUMN_CONTEXT_MENU
//})

export const AddItemColumnContextMenu = (Item: IMenuItem): AddItemColumnContextMenuAction => ({
    type: ADD_ITEM_COLUMN_CONTEXT_MENU,
    Item
})

export const ClearColumnContextMenu = (): ClearColumnContextMenuAction => ({
    type: CLEAR_COLUMN_CONTEXT_MENU
})

const initialMenuState: MenuState = {
    MenuItems: EMPTY_ARRAY,
    ContextMenu: {
        ColumnId: null,
        Items: EMPTY_ARRAY
    }
}

export const MenuReducer: Redux.Reducer<MenuState> = (state: MenuState = initialMenuState, action: Redux.Action): MenuState => {
    switch (action.type) {
        case SET_MENUITEMS:
            {
                //TODO: we need to merge with the existing set of menuitems instead of replacing it. 
                //it will be important we we ever allow show/hide on menus
                let actionTyped = <SetMenuItemsAction>action;
                let menuItems = actionTyped.MenuItems.sort((a: IMenuItem, b: IMenuItem) =>
                    (a.Label < b.Label) ? -1
                        : (a.Label > b.Label) ? 1 : 0)

                return Object.assign({}, state, { MenuItems: menuItems });
            }
        case BUILD_COLUMN_CONTEXT_MENU:
            {
                let actionTyped = <BuildColumnContextMenuAction>action
                return Object.assign({}, state,
                    {
                        ContextMenu: {
                            ColumnId: actionTyped.ColumnId,
                            Items: []
                        }
                    })
            }
        case CLEAR_COLUMN_CONTEXT_MENU:
            {
                return Object.assign({}, state,
                    {
                        ContextMenu: {
                            ColumnId: "",
                            Items: []
                        }
                    })
            }
        case ADD_ITEM_COLUMN_CONTEXT_MENU: {
            let actionTyped = <AddItemColumnContextMenuAction>action
            return Object.assign({}, state,
                {
                    ContextMenu: {
                        ColumnId: state.ContextMenu.ColumnId,
                        Items: [].concat(state.ContextMenu.Items, actionTyped.Item).sort((a: IMenuItem, b: IMenuItem) =>
                            (a.Label < b.Label) ? -1
                                : (a.Label > b.Label) ? 1 : 0)
                    }
                })
        }
        default:
            return state
    }
}