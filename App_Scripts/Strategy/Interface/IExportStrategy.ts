import {IStrategy} from './IStrategy';
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter'
import { Expression } from '../../Core/Expression';
import { RangeColumnScope, RangeRowScope, ExportDestination } from '../../Core/Enums';



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

export interface IPPStyle {
  Header: {
      headerColor: string,
      headerBackColor: string,
      headerFontFamily: string,
      headerFontStyle: string,
      headerFontSize: string,
      headerFontWeight: string,
      height: number,
      Columns: { columnFriendlyName: string, width: number, textAlign: string }[]
  },
  Row: {
      color: string,
      backColor: string,
      altBackColor: string,
      fontFamily: string,
      fontStyle: string,
      fontSize: string,
      fontWeight: string,
      height: number
      Columns: { columnFriendlyName: string, width: number, textAlign: string }[]
  }
}

export interface IPPDomain {
  Name: string
  Pages: string[]
}
  
  export interface IExportStrategy extends IStrategy {
     Export(rangeName: string, exportDestination: ExportDestination, folder?:string, page?:string): void 
  }
