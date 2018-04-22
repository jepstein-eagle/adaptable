import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { IColumn  } from '../../../Core/Interface/IColumn';
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import { IColItem } from "../../UIInterfaces";
import { IAdaptableBlotterObject } from "../../../Core/Interface/Interfaces";


// base props
export interface BaseEntityRowProps<View> extends React.ClassAttributes<View> {
    AdaptableBlotterObject: IAdaptableBlotterObject
    onDeleteConfirm: Redux.Action;
    Index: number
    onEdit: (index: number, adaptableBlotterObject: IAdaptableBlotterObject) => void;
    colItems: IColItem[]
    cssClassName: string
}

// shared props
export interface SharedEntityRowProps<View> extends BaseEntityRowProps<View> {
    onShare: () => void;
    TeamSharingActivated: boolean
}

// Expression props
export interface ExpressionEntityRowProps<View> extends BaseEntityRowProps<View> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}

// Shared and Expression Props
export interface SharedEntityExpressionRowProps<View> extends SharedEntityRowProps<View> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}
