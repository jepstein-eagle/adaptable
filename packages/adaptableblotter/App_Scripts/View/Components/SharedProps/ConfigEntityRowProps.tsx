import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import * as Redux from 'redux';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { IAdaptableBlotterObject } from '../../../PredefinedConfig/IAdaptableBlotterObject';
import { UserFilter } from '../../../PredefinedConfig/RunTimeState/UserFilterState';
import { IColItem } from '../../UIInterfaces';

// base props
export interface BaseRowProps<View> extends React.ClassAttributes<View> {
  colItems: IColItem[];
  cssClassName: string;
}

export interface BaseEntityRowProps<View> extends BaseRowProps<View> {
  AdaptableBlotterObject: IAdaptableBlotterObject;
  onDeleteConfirm: Redux.Action;
  onEdit: (adaptableBlotterObject: IAdaptableBlotterObject) => void;
}

// shared props
export interface SharedEntityRowProps<View> extends BaseEntityRowProps<View> {
  onShare: () => void;
  TeamSharingActivated: boolean;
}

// Expression props
export interface ExpressionEntityRowProps<View> extends BaseEntityRowProps<View> {
  Columns: IColumn[];
  UserFilters: UserFilter[];
}

// Shared and Expression Props
export interface SharedEntityExpressionRowProps<View> extends SharedEntityRowProps<View> {
  Columns: IColumn[];
  UserFilters: UserFilter[];
}
