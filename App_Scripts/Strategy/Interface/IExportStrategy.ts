import {IStrategy} from './IStrategy';
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter'
import { Expression } from '../../Core/Expression';
import { ReportColumnScope, ReportRowScope, ExportDestination } from '../../Core/Enums';



export interface IReport extends IConfigEntity {
  Name: string;
  ReportColumnScope: ReportColumnScope
  ReportRowScope: ReportRowScope
  Columns: string[]
  Expression: Expression
}

export interface ILiveReport {
  WorkbookName: string,
  Report: string,
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
