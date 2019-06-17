import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface FreeTextColumnState extends RunTimeState {
  FreeTextColumns?: FreeTextColumn[];
}

export interface FreeTextColumn extends AdaptableBlotterObject {
  ColumnId: string;
  DefaultValue: any;
  FreeTextStoredValues: FreeTextStoredValue[];
}

export interface FreeTextStoredValue {
  PrimaryKey: any;
  FreeText: any;
}
