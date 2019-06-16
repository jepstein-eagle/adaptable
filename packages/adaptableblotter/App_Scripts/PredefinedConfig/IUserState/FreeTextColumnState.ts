import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface FreeTextColumnState extends IUserState {
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
