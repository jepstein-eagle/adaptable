import { AdaptableBlotterObject } from '../../../PredefinedConfig/AdaptableBlotterObject';

/// <reference path="../../typings/.d.ts" />

export enum WizardStatus {
  New = 'New',
  Edit = 'Edit',
  None = 'None',
}

export interface EditableConfigEntityState {
  EditedAdaptableBlotterObject: AdaptableBlotterObject;
  WizardStartIndex: number;
  WizardStatus: WizardStatus;
}
