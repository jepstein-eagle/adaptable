import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
import { ExportDestination } from '../Common/Enums';
import { Schedule } from '../Common/Schedule';

export interface ExportState extends RunTimeState {
  CurrentReport?: string;
  Reports?: Report[];
}

export interface Report extends AdaptableBlotterObject {
  Name: string;
  ReportColumnScope: 'AllColumns' | 'VisibleColumns' | 'SelectedColumns' | 'BespokeColumns';
  ReportRowScope: 'AllRows' | 'VisibleRows' | 'SelectedRows' | 'ExpressionRows';
  ColumnIds?: string[];
  Expression?: Expression;
  AutoExport?: AutoExport;
}

export interface AutoExport extends AdaptableBlotterObject {
  Schedule: Schedule;
  ExportDestination: ExportDestination;
}
