import { IColumn } from '../../Core/Interface/IColumn';
import * as Redux from 'redux';
export declare const SET_NEW_COLUMN_LIST_ORDER = "SET_NEW_COLUMN_LIST_ORDER";
export interface SetNewColumnListOrderAction extends Redux.Action {
    VisibleColumnList: Array<IColumn>;
}
export declare const SetNewColumnListOrder: (VisibleColumnList: IColumn[]) => SetNewColumnListOrderAction;
