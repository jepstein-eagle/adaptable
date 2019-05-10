import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface IFreeTextColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  DefaultValue: any;
  FreeTextStoredValues: IFreeTextStoredValue[];
}

export interface IFreeTextStoredValue {
  PrimaryKey: any,
  FreeText: any
}
