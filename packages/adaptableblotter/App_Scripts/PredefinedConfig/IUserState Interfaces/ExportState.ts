import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { Expression } from '../Common Objects/Expression/Expression';
import { ExportDestination } from '../Common Objects/Enums';
import { ISchedule } from '../Common Objects/ISchedule';

export interface ExportState extends IUserState {
  CurrentReport?: string;
  Reports?: IReport[];
}

export interface IReport extends IAdaptableBlotterObject {
  Name: string;
  ReportColumnScope: 'AllColumns' | 'VisibleColumns' | 'SelectedColumns' | 'BespokeColumns';
  ReportRowScope: 'AllRows' | 'VisibleRows' | 'SelectedRows' | 'ExpressionRows';
  ColumnIds?: string[];
  Expression?: Expression;
  AutoExport?: IAutoExport;
}

export interface IAutoExport extends IAdaptableBlotterObject {
  Schedule: ISchedule;
  ExportDestination: ExportDestination;
}
