import {IStrategyActionReturn,IStrategy} from './IStrategy';
import { IColumn } from './IAdaptableBlotter';
import { IConfigEntity } from './IAdaptableBlotter'
import { Expression } from '../Expression/Expression';
import { RangeColumnScope, RangeRowScope, ExportDestination } from '../Enums';



export interface IRange extends IConfigEntity {
  Name: string;
  RangeColumnScope: RangeColumnScope
  RangeRowScope: RangeRowScope
  Columns: string[]
  Expression: Expression
}

export interface ILiveRange {
  WorkbookName: string,
  Range: string,
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
}


export interface IPPDomain {
  Name: string
  Pages: string[]
}
  
  export interface IExportStrategy extends IStrategy {
     Export(rangeName: string, exportDestination: ExportDestination, folder?:string, page?:string): void 
  }
