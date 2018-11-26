import * as Redux from 'redux';
import { CellRendererState } from './Interface/IState';
import { IPercentCellRenderer } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
export declare const CELL_RENDERER_ADD_UPDATE = "CELL_RENDERER_ADD_UPDATE";
export declare const CELL_RENDERER_DELETE = "CELL_RENDERER_DELETE";
export declare const CELL_RENDERER_CHANGE_POSITIVE_COLOR = "CELL_RENDERER_CHANGE_POSITIVE_COLOR";
export declare const CELL_RENDERER_CHANGE_NEGATIVE_COLOR = "CELL_RENDERER_CHANGE_NEGATIVE_COLOR";
export interface CellRendererAddUpdateAction extends Redux.Action {
    Index: number;
    CellRenderer: IPercentCellRenderer;
}
export interface CellRendererDeleteAction extends Redux.Action {
    Index: number;
}
export interface CellRendererChangePositiveColorAction extends Redux.Action {
    CellRenderer: IPercentCellRenderer;
    PositiveColor: string;
}
export interface CellRendererChangeNegativeColorAction extends Redux.Action {
    CellRenderer: IPercentCellRenderer;
    NegativeColor: string;
}
export declare const CellRendererAddUpdate: (Index: number, CellRenderer: IPercentCellRenderer) => CellRendererAddUpdateAction;
export declare const CellRendererDelete: (Index: number) => CellRendererDeleteAction;
export declare const CellRendererChangePositiveColor: (CellRenderer: IPercentCellRenderer, PositiveColor: string) => CellRendererChangePositiveColorAction;
export declare const CellRendererChangeNegativeColor: (CellRenderer: IPercentCellRenderer, NegativeColor: string) => CellRendererChangeNegativeColorAction;
export declare const CellRendererReducer: Redux.Reducer<CellRendererState>;
