import * as Redux from 'redux';
import { DashboardState } from './Interface/IState';
import { Visibility } from '../../Utilities/Enums';
export interface DashboardSetAvailableToolbarsAction extends Redux.Action {
    StrategyIds: string[];
}
export interface DashboardSetToolbarsAction extends Redux.Action {
    StrategyIds: string[];
}
export interface DashboardShowToolbarAction extends Redux.Action {
    StrategyId: string;
}
export interface DashboardHideToolbarAction extends Redux.Action {
    StrategyId: string;
}
export interface DashboardMoveItemAction extends Redux.Action {
    StrategyId: string;
    NewIndex: number;
}
export interface DashboardCreateDefaultConfigurationItemAction extends Redux.Action {
    StrategyId: string;
}
export interface DashboardSetFunctionButtonsAction extends Redux.Action {
    StrategyIds: string[];
}
export interface DashboardSetZoomAction extends Redux.Action {
    Zoom: Number;
}
export interface DashboardSetVisibilityAction extends Redux.Action {
    Visibility: Visibility;
}
export interface DashboardShowSystemStatusButtonAction extends Redux.Action {
}
export interface DashboardHideSystemStatusButtonAction extends Redux.Action {
}
export interface DashboardShowAboutButtonAction extends Redux.Action {
}
export interface DashboardHideAboutButtonAction extends Redux.Action {
}
export interface DashboardShowFunctionsDropdownAction extends Redux.Action {
}
export interface DashboardHideFunctionsDropdownAction extends Redux.Action {
}
export interface DashboardShowColumnsDropdownAction extends Redux.Action {
}
export interface DashboardHideColumnsDropdownAction extends Redux.Action {
}
export interface DashboardShowToolbarsDropdownAction extends Redux.Action {
}
export interface DashboardHideToolbarsDropdownAction extends Redux.Action {
}
export interface DashboardSetHomeToolbarTitleAction extends Redux.Action {
    Title: string;
}
export interface DashboardSetApplicationToolbarTitleAction extends Redux.Action {
    Title: string;
}
export declare const DashboardSetAvailableToolbars: (StrategyIds: string[]) => DashboardSetAvailableToolbarsAction;
export declare const DashboardSetToolbars: (StrategyIds: string[]) => DashboardSetToolbarsAction;
export declare const DashboardShowToolbar: (StrategyId: string) => DashboardShowToolbarAction;
export declare const DashboardHideToolbar: (StrategyId: string) => DashboardHideToolbarAction;
export declare const DashboardMoveItem: (StrategyId: string, NewIndex: number) => DashboardMoveItemAction;
export declare const DashboardSetFunctionButtons: (StrategyIds: string[]) => DashboardSetFunctionButtonsAction;
export declare const DashboardSetZoom: (Zoom: Number) => DashboardSetZoomAction;
export declare const DashboardSetVisibility: (Visibility: Visibility) => DashboardSetVisibilityAction;
export declare const DashboardShowSystemStatusButton: () => DashboardShowSystemStatusButtonAction;
export declare const DashboardHideSystemStatusButton: () => DashboardHideSystemStatusButtonAction;
export declare const DashboardShowAboutButton: () => DashboardShowAboutButtonAction;
export declare const DashboardHideAboutButton: () => DashboardHideAboutButtonAction;
export declare const DashboardShowFunctionsDropdown: () => DashboardShowFunctionsDropdownAction;
export declare const DashboardHideFunctionsDropdown: () => DashboardHideFunctionsDropdownAction;
export declare const DashboardShowColumnsDropdown: () => DashboardShowColumnsDropdownAction;
export declare const DashboardHideColumnsDropdown: () => DashboardHideColumnsDropdownAction;
export declare const DashboardShowToolbarsDropdown: () => DashboardShowToolbarsDropdownAction;
export declare const DashboardHideToolbarsDropdown: () => DashboardHideToolbarsDropdownAction;
export declare const DashboardSetHomeToolbarTitle: (Title: string) => DashboardSetHomeToolbarTitleAction;
export declare const DashboardSetApplicationToolbarTitle: (Title: string) => DashboardSetHomeToolbarTitleAction;
export declare const DashboardReducer: Redux.Reducer<DashboardState>;
