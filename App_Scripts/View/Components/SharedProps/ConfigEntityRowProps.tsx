import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { IColumn , IConfigEntity , IEntityRowInfo} from '../../../Core/Interface/IAdaptableBlotter';
import { IUserFilter } from '../../../Core/Interface/IExpression';


// base props
export interface BaseEntityRowProps<View> extends React.ClassAttributes<View> {
    ConfigEntity: IConfigEntity
    onDeleteConfirm: Redux.Action;
    Index: number
    onEdit: (index: number, configEntity: IConfigEntity) => void;
    EntityRowInfo: IEntityRowInfo[]
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
