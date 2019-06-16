import { IAdaptableBlotterObject } from '../../../PredefinedConfig/IAdaptableBlotterObject';

/// <reference path="../../typings/.d.ts" />

export enum WizardStatus {
  New = 'New',
  Edit = 'Edit',
  None = 'None',
}

export interface EditableConfigEntityState {
  EditedAdaptableBlotterObject: IAdaptableBlotterObject;
  WizardStartIndex: number;
  WizardStatus: WizardStatus;
}
