import * as Redux from 'redux';
import { LayoutState } from './Interface/IState';
import { ILayout } from '../../api/Interface/IAdaptableBlotterObjects';
export declare const LAYOUT_SELECT = "LAYOUT_SELECT";
export declare const LAYOUT_ADD_UPDATE = "LAYOUT_ADD_UPDATE";
export declare const LAYOUT_SAVE = "LAYOUT_SAVE";
export declare const LAYOUT_DELETE = "DELETE_LAYOUT";
export declare const LAYOUT_PRESAVE = "LAYOUT_PRESAVE";
export interface LayoutPreSaveAction extends Redux.Action {
    Index: number;
    Layout: ILayout;
}
export interface LayoutAddUpdateAction extends Redux.Action {
    Index: number;
    Layout: ILayout;
}
export interface LayoutSelectAction extends Redux.Action {
    LayoutName: string;
}
export interface LayoutDeleteAction extends Redux.Action {
    LayoutName: string;
}
export interface LayoutIncludeVendorStateAction extends Redux.Action {
}
export interface LayoutExcludeVendorStateAction extends Redux.Action {
}
export declare const LayoutPreSave: (Index: number, Layout: ILayout) => LayoutPreSaveAction;
export declare const LayoutAddUpdate: (Index: number, Layout: ILayout) => LayoutAddUpdateAction;
export declare const LayoutSelect: (LayoutName: string) => LayoutSelectAction;
export declare const LayoutDelete: (LayoutName: string) => LayoutDeleteAction;
export declare const LayoutReducer: Redux.Reducer<LayoutState>;
