import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface FreeTextColumnState extends RunTimeState {
  FreeTextColumns?: FreeTextColumn[];
}

export interface FreeTextColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  DefaultValue: any;
  FreeTextStoredValues: FreeTextStoredValue[];
}

export interface FreeTextStoredValue {
  PrimaryKey: any;
  FreeText: any;
}
