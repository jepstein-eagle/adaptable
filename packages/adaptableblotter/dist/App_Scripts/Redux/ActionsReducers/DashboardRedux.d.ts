import * as Redux from 'redux';
import { DashboardState } from './Interface/IState';
import { Visibility } from '../../Core/Enums';
export interface DashboardSetAvailableToolbarsAction extends Redux.Action {
    StrategyConstants: string[];
}
export interface DashboardSetToolbarsAction extends Redux.Action {
    StrategyConstants: string[];
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
    StrategyConstants: string[];
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
export interface DashboardShowFunctionsDropdownAction extends Redux.Action {
}
export interface DashboardHideFunctionsDropdownAction extends Redux.Action {
}
export interface DashboardShowColumnsDropdownAction extends Redux.Action {
}
export interface DashboardHideColumnsDropdownAction extends Redux.Action {
}
export interface DashboardSetHomeToolbarTitleAction extends Redux.Action {
    Title: string;
}
export interface DashboardSetApplicationToolbarTitleAction extends Redux.Action {
    Title: string;
}
export declare const DashboardSetAvailableToolbars: (StrategyConstants: string[]) => DashboardSetAvailableToolbarsAction;
export declare const DashboardSetToolbars: (StrategyConstants: string[]) => DashboardSetToolbarsAction;
export declare const DashboardShowToolbar: (StrategyId: string) => DashboardShowToolbarAction;
export declare const DashboardHideToolbar: (StrategyId: string) => DashboardHideToolbarAction;
export declare const DashboardMoveItem: (StrategyId: string, NewIndex: number) => DashboardMoveItemAction;
export declare const DashboardSetFunctionButtons: (StrategyConstants: string[]) => DashboardSetFunctionButtonsAction;
export declare const DashboardSetZoom: (Zoom: Number) => DashboardSetZoomAction;
export declare const DashboardSetVisibility: (Visibility: Visibility) => DashboardSetVisibilityAction;
export declare const DashboardShowSystemStatusButton: () => DashboardShowSystemStatusButtonAction;
export declare const DashboardHideSystemStatusButton: () => DashboardHideSystemStatusButtonAction;
export declare const DashboardShowFunctionsDropdownButton: () => DashboardShowFunctionsDropdownAction;
export declare const DashboardHideFunctionsDropdownButton: () => DashboardHideFunctionsDropdownAction;
export declare const DashboardShowColumnsDropdownButton: () => DashboardShowColumnsDropdownAction;
export declare const DashboardHideColumnsDropdownButton: () => DashboardHideColumnsDropdownAction;
export declare const DashboardSetHomeToolbarTitle: (Title: string) => DashboardSetHomeToolbarTitleAction;
export declare const DashboardSetApplicationToolbarTitle: (Title: string) => DashboardSetHomeToolbarTitleAction;
export declare const DashboardReducer: Redux.Reducer<DashboardState>;
