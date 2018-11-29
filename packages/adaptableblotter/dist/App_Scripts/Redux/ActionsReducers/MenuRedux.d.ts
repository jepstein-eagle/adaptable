import * as Redux from 'redux';
import { IMenuItem } from '../../Api/Interface/IMenu';
import { MenuState } from './Interface/IState';
export declare const SET_MENUITEMS = "SET_MENUITEMS";
export declare const BUILD_COLUMN_CONTEXT_MENU = "BUILD_COLUMN_CONTEXT_MENU";
export declare const ADD_ITEM_COLUMN_CONTEXT_MENU = "ADD_ITEM_COLUMN_CONTEXT_MENU";
export declare const CLEAR_COLUMN_CONTEXT_MENU = "CLEAR_COLUMN_CONTEXT_MENU";
export interface SetMenuItemsAction extends Redux.Action {
    MenuItems: IMenuItem[];
}
export interface BuildColumnContextMenuAction extends Redux.Action {
    ColumnId: string;
}
export interface AddItemColumnContextMenuAction extends Redux.Action {
    Item: IMenuItem;
}
export interface ClearColumnContextMenuAction extends Redux.Action {
}
export declare const SetMenuItems: (MenuItems: IMenuItem[]) => SetMenuItemsAction;
export declare const BuildColumnContextMenu: (ColumnId: string) => BuildColumnContextMenuAction;
export declare const AddItemColumnContextMenu: (Item: IMenuItem) => AddItemColumnContextMenuAction;
export declare const ClearColumnContextMenu: () => ClearColumnContextMenuAction;
export declare const MenuReducer: Redux.Reducer<MenuState>;
