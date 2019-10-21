import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { ExpressionHelper } from './ExpressionHelper';
import { Expression } from '../../PredefinedConfig/Common/Expression/Expression';
import { SelectedCellInfo } from '../Interface/Selection/SelectedCellInfo';
import { AdaptableBlotterColumn } from '../Interface/AdaptableBlotterColumn';
import {
  ReportColumnScope,
  MessageType,
  ReportRowScope,
  ExportDestination,
} from '../../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { createUuid } from '../../PredefinedConfig/Uuid';
import ColumnHelper from './ColumnHelper';
import { Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { SelectedRowInfo } from '../Interface/Selection/SelectedRowInfo';
import { GridRow } from '../Interface/Selection/GridRow';
import OpenfinHelper from './OpenfinHelper';
import iPushPullHelper from './iPushPullHelper';
import Glue42Helper from './Glue42Helper';
import ObjectFactory from '../ObjectFactory';

export const ALL_DATA_REPORT = 'All Data';
export const VISIBLE_DATA_REPORT = 'Visible Data';
export const SELECTED_CELLS_REPORT = 'Selected Cells';
export const SELECTED_ROWS_REPORT = 'Selected Rows';

export function IsSystemReport(Report: Report): boolean {
  return (
    Report == null ||
    Report.Name == ALL_DATA_REPORT ||
    Report.Name == VISIBLE_DATA_REPORT ||
    Report.Name == SELECTED_CELLS_REPORT ||
    Report.Name == SELECTED_ROWS_REPORT
  );
}

export function GetReportColumnsDescription(
  report: Report,
  cols: AdaptableBlotterColumn[]
): string {
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

export function GetReportExpressionDescription(
  Report: Report,
  cols: AdaptableBlotterColumn[]
): string {
  if (IsSystemReport(Report)) {
    if (Report.Name == ALL_DATA_REPORT) {
      return '[All Blotter Data]';
    } else if (Report.Name == VISIBLE_DATA_REPORT) {
      return '[All Visible Data]';
    } else if (Report.Name == SELECTED_CELLS_REPORT) {
      return '[Selected Cells Data]';
    } else if (Report.Name == SELECTED_ROWS_REPORT) {
      return '[Selected Rows Data]';
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

export function IsReportDestinationActive(exportDestination: ExportDestination): boolean {
  switch (exportDestination) {
    case ExportDestination.CSV:
    case ExportDestination.Clipboard:
    case ExportDestination.JSON:
      return true;
    case ExportDestination.OpenfinExcel:
      return OpenfinHelper.isRunningInOpenfin() && OpenfinHelper.isExcelOpenfinLoaded();
    case ExportDestination.iPushPull:
      return iPushPullHelper.isIPushPullLoaded();
    case ExportDestination.Glue42:
      return Glue42Helper.isRunningGlue42();
  }

  return false;
}

export function ConvertReportToArray(
  blotter: IAdaptableBlotter,
  Report: Report
): IStrategyActionReturn<any[]> {
  let ReportColumns: AdaptableBlotterColumn[] = [];
  let gridColumns: AdaptableBlotterColumn[] = blotter.api.gridApi.getColumns();

  // first get the cols depending on the Column Scope
  switch (Report.ReportColumnScope) {
    case ReportColumnScope.AllColumns:
      ReportColumns = gridColumns;
      break;
    case ReportColumnScope.VisibleColumns:
      ReportColumns = gridColumns.filter(c => c.Visible);
      break;
    case ReportColumnScope.SelectedColumns:
      let selectedCellInfo: SelectedCellInfo = blotter.api.gridApi.getSelectedCellInfo();

      if (ArrayExtensions.IsNullOrEmpty(selectedCellInfo.Columns)) {
        // some way of saying we cannot export anything
        return {
          ActionReturn: dataToExport,
          Alert: {
            Header: 'Export Error',
            Msg: 'No cells are selected',
            AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
              MessageType.Error
            ),
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

    case ReportRowScope.SelectedCells:
      const selectedCellInfo: SelectedCellInfo = blotter.api.gridApi.getSelectedCellInfo();

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
    case ReportRowScope.SelectedRows:
      const selectedRowInfo: SelectedRowInfo = blotter.api.gridApi.getSelectedRowInfo();
      if (selectedRowInfo != null && ArrayExtensions.IsNotNullOrEmpty(selectedRowInfo.GridRows)) {
        let columnIds: string[] = ReportColumns.map(rc => rc.ColumnId);
        selectedRowInfo.GridRows.filter(gr => gr.rowInfo.isGroup == false).forEach(
          (gridRow: GridRow) => {
            let rowData: any = gridRow.rowData;
            const newRow: any[] = [];
            columnIds.forEach((colId: string) => {
              let cellValue = rowData[colId];
              newRow.push(cellValue ? String(cellValue) : '');
            });
            dataToExport.push(newRow);
          }
        );
      }
      break;
  }

  return { ActionReturn: dataToExport };
}

function getRowValues(
  row: any,
  ReportColumns: AdaptableBlotterColumn[],
  blotter: IAdaptableBlotter
): any[] {
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
    ReportRowScope: ReportRowScope.SelectedCells,
    ColumnIds: [],
    Expression: ExpressionHelper.CreateEmptyExpression(),
  });

  _systemReports.push({
    Uuid: createUuid(),
    Name: SELECTED_ROWS_REPORT,
    ReportColumnScope: ReportColumnScope.VisibleColumns,
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
  SELECTED_ROWS_REPORT,
  IsSystemReport,
  IsReportDestinationActive,
  GetReportColumnsDescription,
  GetReportExpressionDescription,
  ConvertReportToArray,
  CreateSystemReports,
};
export default ReportHelper;
