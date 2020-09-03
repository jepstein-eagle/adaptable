import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';

/// <reference path="../../typings/.d.ts" />

export enum WizardStatus {
  New = 'New',
  Edit = 'Edit',
  None = 'None',
}

export interface EditableConfigEntityState {
  editedAdaptableObject: AdaptableObject;
  wizardStartIndex: number;
  wizardStatus: WizardStatus;
}

export interface EditableExpressionConfigEntityState extends EditableConfigEntityState {
  newSharedQueryName?: string;
  useSharedQuery?: boolean;
}
