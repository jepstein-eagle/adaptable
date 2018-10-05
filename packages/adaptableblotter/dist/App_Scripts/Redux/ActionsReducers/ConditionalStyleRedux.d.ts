import { ConditionalStyleState } from './Interface/IState';
import * as Redux from 'redux';
import { IConditionalStyle } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
export declare const CONDITIONAL_STYLE_ADD_UPDATE = "CONDITIONAL_STYLE_ADD_UPDATE";
export declare const CONDITIONAL_STYLE_DELETE = "CONDITIONAL_STYLE_DELETE";
export interface ConditionalStyleAddUpdateAction extends Redux.Action {
    Index: number;
    conditionalStyle: IConditionalStyle;
}
export declare const ConditionalStyleAddUpdate: (Index: number, conditionalStyle: IConditionalStyle) => ConditionalStyleAddUpdateAction;
export interface ConditionalStyleDeleteAction extends Redux.Action {
    Index: number;
    conditionalStyle: IConditionalStyle;
}
export declare const ConditionalStyleDelete: (Index: number, conditionalStyle: IConditionalStyle) => ConditionalStyleDeleteAction;
export declare const ConditionalStyleReducer: Redux.Reducer<ConditionalStyleState>;
