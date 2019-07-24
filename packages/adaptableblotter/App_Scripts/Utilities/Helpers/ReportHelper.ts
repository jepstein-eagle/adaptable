import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { ExpressionHelper } from './ExpressionHelper';
import { Expression } from '../../PredefinedConfig/Common/Expression/Expression';
import { ISelectedCellInfo } from '../Interface/SelectedCell/ISelectedCellInfo';
import { IColumn } from '../Interface/IColumn';
import {
  ReportColumnScope,
  MessageType,
  ReportRowScope,
} from '../../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { createUuid } from '../../PredefinedConfig/Uuid';
import ColumnHelper from './ColumnHelper';
import { Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { GridCell } from '../Interface/SelectedCell/GridCell';

export const ALL_DATA_REPORT = 'All Data';
export const VISIBLE_DATA_REPORT = 'Visible Data';
export const SELECTED_CELLS_REPORT = 'Selected Cells';

export function IsSystemReport(Report: Report): boolean {
  return (
    Report == null ||
    Report.Name == ALL_DATA_REPORT ||
    Report.Name == VISIBLE_DATA_REPORT ||
    Report.Name == SELECTED_CELLS_REPORT
  );
}

export function GetReportColumnsDescription(report: Report, cols: IColumn[]): string {
  switch (report.ReportColumnScope) {
    case ReportColumnScope.AllColumns:
      return '[All Columns]';
    case ReportColumnScope.VisibleColumns:
      return '[Visible Columns]';
    case ReportColumnScope.SelectedColumns:
      return '[Selected Columns]';
    case ReportColumnScope.BespokeColumns:
      return ColumnHelper.getFriendlyNamesFromColumnIds(report.ColumnIds, cols).join(', ');
  }
}

export function GetReportExpressionDescription(Report: Report, cols: IColumn[]): string {
  if (IsSystemReport(Report)) {
    if (Report.Name == ALL_DATA_REPORT) {
      return '[All Blotter Data]';
    } else if (Report.Name == VISIBLE_DATA_REPORT) {
      return '[All Visible Data]';
    } else if (Report.Name == SELECTED_CELLS_REPORT) {
      return '[Selected Cells Data]';
    }
  } else {
    switch (Report.ReportRowScope) {
      case ReportRowScope.AllRows:
        return '[All Rows]';
      case ReportRowScope.VisibleRows:
        return '[Visible Rows]';
      case ReportRowScope.SelectedRows:
        return '[Selected Rows]';
      case ReportRowScope.ExpressionRows:
        return ExpressionHelper.ConvertExpressionToString(Report.Expression, cols);
    }
  }
}

export function ConvertReportToArray(
  blotter: IAdaptableBlotter,
  Report: Report
): IStrategyActionReturn<any[]> {
  let ReportColumns: IColumn[] = [];
  let gridColumns: IColumn[] = blotter.api.gridApi.getColumns();

  // first get the cols depending on the Column Scope
  switch (Report.ReportColumnScope) {
    case ReportColumnScope.AllColumns:
      ReportColumns = gridColumns;
      break;
    case ReportColumnScope.VisibleColumns:
      ReportColumns = gridColumns.filter(c => c.Visible);
      break;
    case ReportColumnScope.SelectedColumns:
      let selectedCellInfo: ISelectedCellInfo = blotter.api.gridApi.getSelectedCellInfo();

      if (ArrayExtensions.IsNullOrEmpty(selectedCellInfo.Columns)) {
        // some way of saying we cannot export anything
        return {
          ActionReturn: dataToExport,
          Alert: {
            Header: 'Export Error',
            Msg: 'No cells are selected',
            MessageType: MessageType.Error,
            ShowAsPopup: true,
          },
        };
      }

      // otherwise get columns
      ReportColumns = selectedCellInfo.Columns;
      break;
    case ReportColumnScope.BespokeColumns:
      ReportColumns = Report.ColumnIds.map(c => gridColumns.find(col => col.ColumnId == c));
      break;
  }

  // populate the first row
  var dataToExport: any[] = [];
  dataToExport[0] = ReportColumns.map(c => c.FriendlyName);

  // now populate the rest of the rows
  switch (Report.ReportRowScope) {
    case ReportRowScope.AllRows:
      blotter.forAllRecordsDo(row => {
        let newRow = getRowValues(row, ReportColumns, blotter);
        dataToExport.push(newRow);
      });
      break;

    case ReportRowScope.VisibleRows:
      blotter.forAllVisibleRecordsDo(row => {
        let newRow = getRowValues(row, ReportColumns, blotter);
        dataToExport.push(newRow);
      });
      break;

    case ReportRowScope.ExpressionRows:
      let expressionToCheck: Expression = Report.Expression;

      blotter.forAllRecordsDo(row => {
        if (
          ExpressionHelper.checkForExpressionFromRecord(
            expressionToCheck,
            row,
            ReportColumns,
            blotter
          )
        ) {
          let newRow = getRowValues(row, ReportColumns, blotter);
          dataToExport.push(newRow);
        }
      });
      break;

    case ReportRowScope.SelectedRows:
      const selectedCellInfo: ISelectedCellInfo = blotter.api.gridApi.getSelectedCellInfo();

      const { Columns, GridCells } = selectedCellInfo;
      const colCount = Columns.length;
      const rowCount = GridCells.length / colCount;

      for (let i = 0; i < rowCount; i++) {
        const newRow: any[] = [];
        for (let j = 0; j < colCount; j++) {
          const index = i + j * rowCount;
          newRow.push(String(GridCells[index].value));
        }
        dataToExport.push(newRow);
      }

      break;
  }

  return { ActionReturn: dataToExport };
}

function getRowValues(row: any, ReportColumns: IColumn[], blotter: IAdaptableBlotter): any[] {
  let newRow: any[] = [];
  ReportColumns.forEach(col => {
    let columnValue: any = blotter.getDisplayValueFromRecord(row, col.ColumnId);
    newRow.push(columnValue);
  });
  return newRow;
}

export function CreateSystemReports(): Array<Report> {
  let _systemReports: Report[] = [];

  _systemReports.push({
    Uuid: createUuid(),
    Name: ALL_DATA_REPORT,
    ReportColumnScope: ReportColumnScope.AllColumns,
    ReportRowScope: ReportRowScope.AllRows,
    ColumnIds: [],
    Expression: ExpressionHelper.CreateEmptyExpression(),
  });

  _systemReports.push({
    Uuid: createUuid(),
    Name: VISIBLE_DATA_REPORT,
    ReportColumnScope: ReportColumnScope.VisibleColumns,
    ReportRowScope: ReportRowScope.VisibleRows,
    ColumnIds: [],
    Expression: ExpressionHelper.CreateEmptyExpression(),
  });

  _systemReports.push({
    Uuid: createUuid(),
    Name: SELECTED_CELLS_REPORT,
    ReportColumnScope: ReportColumnScope.SelectedColumns,
    ReportRowScope: ReportRowScope.SelectedRows,
    ColumnIds: [],
    Expression: ExpressionHelper.CreateEmptyExpression(),
  });
  return _systemReports;
}

export const ReportHelper = {
  ALL_DATA_REPORT,
  VISIBLE_DATA_REPORT,
  SELECTED_CELLS_REPORT,
  IsSystemReport,
  GetReportColumnsDescription,
  GetReportExpressionDescription,
  ConvertReportToArray,
  CreateSystemReports,
};
export default ReportHelper;
