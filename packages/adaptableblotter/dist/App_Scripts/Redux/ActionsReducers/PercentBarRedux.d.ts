import * as Redux from 'redux';
import { PercentBarState } from './Interface/IState';
import { IPercentBar } from "../../Utilities/Interface/BlotterObjects/IPercentBar";
export declare const PERCENT_BAR_ADD = "PERCENT_BAR_ADD";
export declare const PERCENT_BAR_EDIT = "PERCENT_BAR_EDIT";
export declare const PERCENT_BAR_DELETE = "PERCENT_BAR_DELETE";
export declare const PERCENT_BAR_CHANGE_MINIMUM_VALUE = "PERCENT_BAR_CHANGE_MINIMUM_VALUE";
export declare const PERCENT_BAR_CHANGE_MAXIMUM_VALUE = "PERCENT_BAR_CHANGE_MAXIMUM_VALUE";
export declare const PERCENT_BAR_CHANGE_POSITIVE_COLOR = "PERCENT_BAR_CHANGE_POSITIVE_COLOR";
export declare const PERCENT_BAR_CHANGE_NEGATIVE_COLOR = "PERCENT_BAR_CHANGE_NEGATIVE_COLOR";
export interface PercentBarAddAction extends Redux.Action {
    PercentBar: IPercentBar;
}
export interface PercentBarEditAction extends Redux.Action {
    Index: number;
    PercentBar: IPercentBar;
}
export interface PercentBarDeleteAction extends Redux.Action {
    Index: number;
}
export interface PercentBarChangeMinimumValueAction extends Redux.Action {
    PercentBar: IPercentBar;
    MinimumValue: number;
}
export interface PercentBarChangeMaximumValueAction extends Redux.Action {
    PercentBar: IPercentBar;
    MaximumValue: number;
}
export interface PercentBarChangePositiveColorAction extends Redux.Action {
    PercentBar: IPercentBar;
    PositiveColor: string;
}
export interface PercentBarChangeNegativeColorAction extends Redux.Action {
    PercentBar: IPercentBar;
    NegativeColor: string;
}
export declare const PercentBarAdd: (PercentBar: IPercentBar) => PercentBarAddAction;
export declare const PercentBarEdit: (Index: number, PercentBar: IPercentBar) => PercentBarEditAction;
export declare const PercentBarDelete: (Index: number) => PercentBarDeleteAction;
export declare const PercentBarChangeMinimumValue: (PercentBar: IPercentBar, MinimumValue: number) => PercentBarChangeMinimumValueAction;
export declare const PercentBarChangeMaximumValue: (PercentBar: IPercentBar, MaximumValue: number) => PercentBarChangeMaximumValueAction;
export declare const PercentBarChangePositiveColor: (PercentBar: IPercentBar, PositiveColor: string) => PercentBarChangePositiveColorAction;
export declare const PercentBarChangeNegativeColor: (PercentBar: IPercentBar, NegativeColor: string) => PercentBarChangeNegativeColorAction;
export declare const PercentBarReducer: Redux.Reducer<PercentBarState>;
