import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface FreeTextColumnState extends IUserState {
  FreeTextColumns?: IFreeTextColumn[];
}

export interface IFreeTextColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  DefaultValue: any;
  FreeTextStoredValues: IFreeTextStoredValue[];
}

export interface IFreeTextStoredValue {
  PrimaryKey: any;
  FreeText: any;
}
