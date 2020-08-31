import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import * as Redux from 'redux';
import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';
import { IColItem } from '../../UIInterfaces';
import { AccessLevel } from '../../../PredefinedConfig/EntitlementState';
import { AdaptableApi } from '../../../Api/AdaptableApi';

// base props
export interface BaseRowProps<View> extends React.ClassAttributes<View> {
  colItems: IColItem[];
  api: AdaptableApi;
}

export interface BaseEntityRowProps<View> extends BaseRowProps<View> {
  adaptableObject: AdaptableObject;
  onDeleteConfirm: Redux.Action;
  onEdit: (AdaptableObject: AdaptableObject) => void;
}

// shared props
export interface SharedEntityRowProps<View> extends BaseEntityRowProps<View> {
  onShare: (description: string) => void;
  teamSharingActivated: boolean;
  accessLevel: AccessLevel;
}

export interface SharedEntityComponent<View> extends React.ClassAttributes<View> {
  entity: AdaptableObject;
  api: AdaptableApi;
}
