import { FreeTextStoredValue } from '../../../View/UIInterfaces';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface IFreeTextColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  DefaultValue: any;
  FreeTextStoredValues: FreeTextStoredValue[];
}
