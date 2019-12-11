import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { Expression } from '../../PredefinedConfig/Common/Expression';
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
import { Report } from '../../PredefinedConfig/ExportState';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { SelectedRowInfo } from '../Interface/Selection/SelectedRowInfo';
import { GridRow } from '../Interface/Selection/GridRow';
import ObjectFactory from '../ObjectFactory';
import { IReportService } from './Interface/IReportService';
import ColumnHelper from '../Helpers/ColumnHelper';
import ExpressionHelper from '../Helpers/ExpressionHelper';
import OpenfinHelper from '../Helpers/OpenfinHelper';

export const ALL_DATA_REPORT = 'All Data';
export const VISIBLE_DATA_REPORT = 'Visible Data';
export const SELECTED_CELLS_REPORT = 'Selected Cells';
export const SELECTED_ROWS_REPORT = 'Selected Rows';

export class ReportService implements IReportService {
  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
  }

  public IsSystemReport(Report: Report): boolean {
    return (
      Report == null ||
      Report.Name == ALL_DATA_REPORT ||
      Report.Name == VISIBLE_DATA_REPORT ||
      Report.Name == SELECTED_CELLS_REPORT ||
      Report.Name == SELECTED_ROWS_REPORT
    );
  }

  public GetReportColumnsDescription(report: Report, cols: AdaptableBlotterColumn[]): string {
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

  public GetReportExpressionDescription(Report: Report, cols: AdaptableBlotterColumn[]): string {
    if (this.IsSystemReport(Report)) {
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

  public IsReportDestinationActive(exportDestination: ExportDestination): boolean {
    switch (exportDestination) {
      case ExportDestination.CSV:
      case ExportDestination.Clipboard:
      case ExportDestination.JSON:
        return true;
      case ExportDestination.OpenfinExcel:
        return OpenfinHelper.isRunningInOpenfin() && OpenfinHelper.isExcelOpenfinLoaded();
      case ExportDestination.iPushPull:
        return this.blotter.api.internalApi.isIPushPullRunning();
      case ExportDestination.Glue42:
        return this.blotter.api.internalApi.isGlue42Runing();
    }

    return false;
  }

  private getReportColumnsForReport(report: Report): any {
    let reportColumns: AdaptableBlotterColumn[] = [];
    let gridColumns: AdaptableBlotterColumn[] = this.blotter.api.gridApi.getColumns();

    // first get the cols depending on the Column Scope
    switch (report.ReportColumnScope) {
      case ReportColumnScope.AllColumns:
        reportColumns = gridColumns;
        break;
      case ReportColumnScope.VisibleColumns:
        reportColumns = gridColumns.filter(c => c.Visible);
        break;
      case ReportColumnScope.SelectedColumns:
        let selectedCellInfo: SelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();

        // otherwise get columns
        reportColumns = selectedCellInfo.Columns;
        break;
      case ReportColumnScope.BespokeColumns:
        reportColumns = report.ColumnIds.map(c => gridColumns.find(col => col.ColumnId == c));
        break;
    }
    return reportColumns;
  }

  public ConvertReportToArray(report: Report): IStrategyActionReturn<any[]> {
    //let ReportColumns: AdaptableBlotterColumn[] = [];
    //  let gridColumns: AdaptableBlotterColumn[] = this.blotter.api.gridApi.getColumns();

    let reportColumns: AdaptableBlotterColumn[] = this.getReportColumnsForReport(report);
    if (ArrayExtensions.IsNullOrEmpty(reportColumns)) {
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

    // populate the first row
    var dataToExport: any[] = [];
    dataToExport[0] = reportColumns.map(c => c.FriendlyName);

    // now populate the rest of the rows
    switch (report.ReportRowScope) {
      case ReportRowScope.AllRows:
        this.blotter.forAllRowNodesDo(row => {
          let newRow = this.getRowValues(row, reportColumns);
          dataToExport.push(newRow);
        });
        break;

      case ReportRowScope.VisibleRows:
        this.blotter.forAllVisibleRowNodesDo(row => {
          let newRow = this.getRowValues(row, reportColumns);
          dataToExport.push(newRow);
        });
        break;

      case ReportRowScope.ExpressionRows:
        let expressionToCheck: Expression = report.Expression;

        this.blotter.forAllRowNodesDo(row => {
          if (
            ExpressionHelper.checkForExpressionFromRowNode(
              expressionToCheck,
              row,
              reportColumns,
              this.blotter
            )
          ) {
            let newRow = this.getRowValues(row, reportColumns);
            dataToExport.push(newRow);
          }
        });
        break;

      case ReportRowScope.SelectedCells:
        const selectedCellInfo: SelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();

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
        const selectedRowInfo: SelectedRowInfo = this.blotter.api.gridApi.getSelectedRowInfo();
        if (selectedRowInfo != null && ArrayExtensions.IsNotNullOrEmpty(selectedRowInfo.GridRows)) {
          let columnIds: string[] = reportColumns.map(rc => rc.ColumnId);
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

  public GetPrimaryKeysForReport(report: Report): any[] {
    let pkValues: any[] = [];
    let reportColumns: AdaptableBlotterColumn[] = this.getReportColumnsForReport(report);

    switch (report.ReportRowScope) {
      case ReportRowScope.AllRows:
        this.blotter.forAllRowNodesDo(row => {
          let pkValue: any = this.blotter.getPrimaryKeyValueFromRowNode(row);
          pkValues.push(pkValue);
        });
        break;

      case ReportRowScope.VisibleRows:
        this.blotter.forAllVisibleRowNodesDo(row => {
          let pkValue: any = this.blotter.getPrimaryKeyValueFromRowNode(row);
          pkValues.push(pkValue);
        });
        break;

      case ReportRowScope.ExpressionRows:
        let expressionToCheck: Expression = report.Expression;

        this.blotter.forAllRowNodesDo(row => {
          if (
            ExpressionHelper.checkForExpressionFromRowNode(
              expressionToCheck,
              row,
              reportColumns,
              this.blotter
            )
          ) {
            let pkValue: any = this.blotter.getPrimaryKeyValueFromRowNode(row);
            pkValues.push(pkValue);
          }
        });
        break;

      case ReportRowScope.SelectedCells:
        const selectedCellInfo: SelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();

        const { Columns, GridCells } = selectedCellInfo;
        const colCount = Columns.length;
        const rowCount = GridCells.length / colCount;

        for (let i = 0; i < rowCount; i++) {
          for (let j = 0; j < colCount; j++) {
            const index = i + j * rowCount;
            let pkValue: any = GridCells[index].primaryKeyValue;
            ArrayExtensions.AddItem(pkValues, pkValue);
          }
        }

        break;
      case ReportRowScope.SelectedRows:
        const selectedRowInfo: SelectedRowInfo = this.blotter.api.gridApi.getSelectedRowInfo();
        if (selectedRowInfo != null && ArrayExtensions.IsNotNullOrEmpty(selectedRowInfo.GridRows)) {
          let columnIds: string[] = reportColumns.map(rc => rc.ColumnId);
          selectedRowInfo.GridRows.filter(gr => gr.rowInfo.isGroup == false).forEach(
            (gridRow: GridRow) => {
              pkValues.push(gridRow.primaryKeyValue);
            }
          );
        }
        break;
    }

    return pkValues;
  }

  private getRowValues(rowNode: any, reportColumns: AdaptableBlotterColumn[]): any[] {
    let newRow: any[] = [];
    reportColumns.forEach(col => {
      let columnValue: any = this.blotter.getDisplayValueFromRowNode(rowNode, col.ColumnId);
      newRow.push(columnValue);
    });
    return newRow;
  }
}
