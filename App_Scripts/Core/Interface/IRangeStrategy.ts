import { IColumn } from './IAdaptableBlotter';
import { IConfigEntity } from './IAdaptableBlotter'
import { IStrategy } from './IStrategy';
import { Expression } from '../Expression/Expression';
import { RangeScope } from '../Enums';


export interface IRange extends IConfigEntity {
  Uid: string;
  Name: string;
  RangeScope: RangeScope
  Columns: string[];
  Expression: Expression
}

export interface IRangeStrategy extends IStrategy {
  ExportRangeToCsv(rangeUid: string): void
  ConvertRangetoCsv(rangeUid: string): string 
   ConvertRangetoArray(rangeUid: string): any[]
}