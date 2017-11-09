import { IColumn } from './IAdaptableBlotter';
import { IConfigEntity } from './IAdaptableBlotter'
import { IStrategy } from './IStrategy';
import { Expression } from '../Expression/Expression';
import { RangeScope, RangeExportDestination } from '../Enums';


export interface IRange extends IConfigEntity {
  Uid: string;
  Name: string;
  RangeScope: RangeScope
  Columns: string[]
  Expression: Expression
}

export interface IRangeStrategy extends IStrategy {
   ExportRange(rangeUid: string, rangeExportDestination: RangeExportDestination): void 
}