import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from './AdaptableBlotterObject';

/*
A collection of Free Text Column objects. Each IFreeTextColumn contains a ColumnId, a default value and FreeTextStoredValues (which will typically be added by users at run time).
*/
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
