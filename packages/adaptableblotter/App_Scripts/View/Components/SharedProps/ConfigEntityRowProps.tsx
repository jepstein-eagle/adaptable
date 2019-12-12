import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import * as Redux from 'redux';
import { AdaptableBlotterColumn } from '../../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { AdaptableBlotterObject } from '../../../PredefinedConfig/Common/AdaptableBlotterObject';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { IColItem } from '../../UIInterfaces';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';

// base props
export interface BaseRowProps<View> extends React.ClassAttributes<View> {
  colItems: IColItem[];
}

export interface BaseEntityRowProps<View> extends BaseRowProps<View> {
  AdaptableBlotterObject: AdaptableBlotterObject;
  onDeleteConfirm: Redux.Action;
  onEdit: (adaptableBlotterObject: AdaptableBlotterObject) => void;
}

// shared props
export interface SharedEntityRowProps<View> extends BaseEntityRowProps<View> {
  onShare: () => void;
  TeamSharingActivated: boolean;
  AccessLevel: AccessLevel;
}

// Expression props
export interface ExpressionEntityRowProps<View> extends BaseEntityRowProps<View> {
  Columns: AdaptableBlotterColumn[];
  UserFilters: UserFilter[];
}

// Shared and Expression Props
export interface SharedEntityExpressionRowProps<View> extends SharedEntityRowProps<View> {
  Columns: AdaptableBlotterColumn[];
  UserFilters: UserFilter[];
}
