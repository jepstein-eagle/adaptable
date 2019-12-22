import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';

/// <reference path="../../typings/.d.ts" />

export enum WizardStatus {
  New = 'New',
  Edit = 'Edit',
  None = 'None',
}

export interface EditableConfigEntityState {
  EditedAdaptableObject: AdaptableObject;
  WizardStartIndex: number;
  WizardStatus: WizardStatus;
}
