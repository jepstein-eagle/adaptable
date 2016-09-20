/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import {IMenuItem} from '../../Core/Interface/IStrategy';
import {MenuState} from './interface/IState'
const SET_MENUITEMS = 'SET_MENUITEMS';
const MENUITEM_CLICKED = 'MENUITEM_CLICKED';

export interface SetMenuItemsAction extends Redux.Action {
    MenuItems: IMenuItem[];
}

export interface MenuItemClickedAction extends Redux.Action {
    MenuItem: IMenuItem;
}

// export const SetMenuItems: Redux.ActionCreator<SetMenuItemsAction> = (MenuItems: IMenuItem[]) => ({
//     type: SET_MENUITEMS,
//     MenuItems
// })

//we do not use Redux.ActionCreator as we want to be typed safe for the arguments..... Redux.ActionCreator doesnt really make any sense to me as a consequence!!!!
export const SetMenuItems = (MenuItems: IMenuItem[]): SetMenuItemsAction => ({
    type: SET_MENUITEMS,
    MenuItems
})

export const MenuItemClicked = (MenuItem: IMenuItem): MenuItemClickedAction => ({
    type: MENUITEM_CLICKED,
    MenuItem
})

const initialMenuState: MenuState = {
    MenuItems: []
}

export const MenuReducer: Redux.Reducer<MenuState> = (state: MenuState = initialMenuState, action: Redux.Action): MenuState => {
    switch (action.type) {
        case SET_MENUITEMS:
            //TODO: we need to merge with the existing set of menuitems instead of replacing it. 
            //it will be important we we ever allow show/hide on menus
            return {
                MenuItems: ([].concat((<SetMenuItemsAction>action).MenuItems).sort((a: IMenuItem, b: IMenuItem) =>
                    (a.Label < b.Label) ? -1
                        : (a.Label > b.Label) ? 1 : 0))
            }
        default:
            return state
    }
}