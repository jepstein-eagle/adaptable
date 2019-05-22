import { IAdaptableBlotterObject } from '../../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject';

/// <reference path="../../typings/.d.ts" />

export enum WizardStatus {
  New = 'New',
  Edit = 'Edit',
  None = 'None',
}

export interface EditableConfigEntityState {
  EditedAdaptableBlotterObject: IAdaptableBlotterObject;
  WizardStartIndex: number;
  EditedAdaptableBlotterObjectIndex: number;
  WizardStatus?: WizardStatus;
}
