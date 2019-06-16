import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
import { ExportDestination } from '../Common/Enums';
import { ISchedule } from '../Common/ISchedule';

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
