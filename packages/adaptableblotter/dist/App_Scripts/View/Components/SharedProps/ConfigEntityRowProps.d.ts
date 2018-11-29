import * as React from "react";
import * as Redux from "redux";
import { IColumn } from '../../../api/Interface/IColumn';
import { IUserFilter, IAdaptableBlotterObject } from '../../../Api/Interface/IAdaptableBlotterObjects';
import { IColItem } from "../../UIInterfaces";
export interface BaseRowProps<View> extends React.ClassAttributes<View> {
    colItems: IColItem[];
    cssClassName: string;
}
export interface BaseEntityRowProps<View> extends BaseRowProps<View> {
    AdaptableBlotterObject: IAdaptableBlotterObject;
    onDeleteConfirm: Redux.Action;
    Index: number;
    onEdit: (index: number, adaptableBlotterObject: IAdaptableBlotterObject) => void;
}
export interface SharedEntityRowProps<View> extends BaseEntityRowProps<View> {
    onShare: () => void;
    TeamSharingActivated: boolean;
}
export interface ExpressionEntityRowProps<View> extends BaseEntityRowProps<View> {
    Columns: IColumn[];
    UserFilters: IUserFilter[];
}
export interface SharedEntityExpressionRowProps<View> extends SharedEntityRowProps<View> {
    Columns: IColumn[];
    UserFilters: IUserFilter[];
}
