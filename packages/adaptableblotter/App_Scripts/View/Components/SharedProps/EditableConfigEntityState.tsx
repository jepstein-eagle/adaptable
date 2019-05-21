import { IAdaptableBlotterObject } from '../../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject';

/// <reference path="../../typings/.d.ts" />

export interface EditableConfigEntityState {
  EditedAdaptableBlotterObject: IAdaptableBlotterObject;
  WizardStartIndex: number;
  EditedAdaptableBlotterObjectIndex: number;
  EditIsNew?: boolean;
}
