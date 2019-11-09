import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from './AdaptableBlotterObject';
import { Expression } from './Common/Expression/Expression';
import { ExportDestination } from './Common/Enums';
import { Schedule } from './Common/Schedule';

export interface ExportState extends RunTimeState {
  /**
   * The report that is currently selected in the Export dropdown.
   */
  CurrentReport?: string;
  Reports?: Report[];
}

export interface Report extends AdaptableBlotterObject {
  Name: string;
  ReportColumnScope: 'AllColumns' | 'VisibleColumns' | 'SelectedColumns' | 'BespokeColumns';
  ReportRowScope: 'AllRows' | 'VisibleRows' | 'SelectedCells' | 'SelectedRows' | 'ExpressionRows';
  ColumnIds?: string[];
  Expression?: Expression;
  AutoExport?: AutoExport;
}

export interface AutoExport extends AdaptableBlotterObject {
  Schedule: Schedule;
  ExportDestination: ExportDestination;
}

/*
A collection of Reports

An IReport consists of 5 properties: (see section below for more information).

Name: The name of the report

ReportColumnScope: Which columns to be included when the report runs.

Possible values are 'AllColumns' (default), 'VisibleColumns', 'SelectedColumns' (any columns which have cells currently selected) and 'BespokeColumns'.

ReportRowScope: Which rows to be included when the report runs.

Possible values are 'AllRows' (default), 'VisibleRows', 'SelectedRows' (any rows which have cells currently selected) and 'ExpressionRows'.

ColumnIds: Which columns to include in the report - only required if the ReportColumnScope is 'BespokeColumns'

Expression:  The Expression to use to select the rows when the report is run - only required if the ReportRowScope is 'ExpressionRows'

*/
