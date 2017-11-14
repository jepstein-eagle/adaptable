import {IStrategyActionReturn,IStrategy} from './IStrategy';
import { IColumn } from './IAdaptableBlotter';
import { IConfigEntity } from './IAdaptableBlotter'
import { Expression } from '../Expression/Expression';
import { RangeScope, ExportDestination } from '../Enums';



export interface IRange extends IConfigEntity {
    Name: string;
    RangeScope: RangeScope
    Columns: string[]
    Expression: Expression
  }
  
  export interface IExportStrategy extends IStrategy {
     Export(rangeName: string, exportDestination: ExportDestination): void 
  }


