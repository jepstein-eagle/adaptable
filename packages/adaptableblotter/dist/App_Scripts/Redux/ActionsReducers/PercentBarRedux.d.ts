import * as Redux from 'redux';
import { PercentBarState } from './Interface/IState';
import { IPercentBar } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
export declare const PERCENT_BAR_ADD_UPDATE = "PERCENT_BAR_ADD_UPDATE";
export declare const PERCENT_BAR_DELETE = "PERCENT_BAR_DELETE";
export declare const PERCENT_BAR_CHANGE_POSITIVE_COLOR = "PERCENT_BAR_CHANGE_POSITIVE_COLOR";
export declare const PERCENT_BAR_CHANGE_NEGATIVE_COLOR = "PERCENT_BAR_CHANGE_NEGATIVE_COLOR";
export interface PercentBarAddUpdateAction extends Redux.Action {
    Index: number;
    PercentBar: IPercentBar;
}
export interface PercentBarDeleteAction extends Redux.Action {
    Index: number;
}
export interface PercentBarChangePositiveColorAction extends Redux.Action {
    PercentBar: IPercentBar;
    PositiveColor: string;
}
export interface PercentBarChangeNegativeColorAction extends Redux.Action {
    PercentBar: IPercentBar;
    NegativeColor: string;
}
export declare const PercentBarAddUpdate: (Index: number, PercentBar: IPercentBar) => PercentBarAddUpdateAction;
export declare const PercentBarDelete: (Index: number) => PercentBarDeleteAction;
export declare const PercentBarChangePositiveColor: (PercentBar: IPercentBar, PositiveColor: string) => PercentBarChangePositiveColorAction;
export declare const PercentBarChangeNegativeColor: (PercentBar: IPercentBar, NegativeColor: string) => PercentBarChangeNegativeColorAction;
export declare const PercentBarReducer: Redux.Reducer<PercentBarState>;
