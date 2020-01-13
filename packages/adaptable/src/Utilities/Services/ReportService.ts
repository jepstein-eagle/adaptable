import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { Expression } from '../../PredefinedConfig/Common/Expression';
import { SelectedCellInfo } from '../Interface/Selection/SelectedCellInfo';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import {
  ReportColumnScope,
  MessageType,
  ReportRowScope,
  ExportDestination,
  LiveReportTrigger,
} from '../../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { Report } from '../../PredefinedConfig/ExportState';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { SelectedRowInfo } from '../Interface/Selection/SelectedRowInfo';
import { GridRow } from '../Interface/Selection/GridRow';
import ObjectFactory from '../ObjectFactory';
import { IReportService } from './Interface/IReportService';
import ColumnHelper from '../Helpers/ColumnHelper';
import ExpressionHelper from '../Helpers/ExpressionHelper';
import OpenfinHelper from '../Helpers/OpenfinHelper';
import { GridCell } from '../Interface/Selection/GridCell';
import AdaptableHelper from '../Helpers/AdaptableHelper';
import {
  LiveReportUpdatedEventArgs,
  LiveReportUpdatedInfo,
} from '../../Api/Events/LiveReportUpdated';

export const ALL_DATA_REPORT = 'All Data';
export const VISIBLE_DATA_REPORT = 'Visible Data';
export const SELECTED_CELLS_REPORT = 'Selected Cells';
export const SELECTED_ROWS_REPORT = 'Selected Rows';

export class ReportService implements IReportService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
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

  public GetReportColumnsDescription(report: Report, cols: AdaptableColumn[]): string {
    switch (report.ReportColumnScope) {
      case ReportColumnScope.AllColumns:
        return '[All Columns]';
      case ReportColumnScope.VisibleColumns:
        return '[Visible Columns]';
      case ReportColumnScope.SelectedCellColumns:
        return '[Selected Columns]';
      case ReportColumnScope.BespokeColumns:
        return ColumnHelper.getFriendlyNamesFromColumnIds(report.ColumnIds, cols).join(', ');
    }
  }

  public GetReportExpressionDescription(Report: Report, cols: AdaptableColumn[]): string {
    if (this.IsSystemReport(Report)) {
      if (Report.Name == ALL_DATA_REPORT) {
        return '[All Data]';
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
      case ExportDestination.Glue42:
        return this.adaptable.api.glue42Api.isGlue42Available();
    }

    return false;
  }

  private getReportColumnsForReport(report: Report): any {
    let reportColumns: AdaptableColumn[] = [];
    let gridColumns: AdaptableColumn[] = this.adaptable.api.gridApi.getColumns();

    // first get the cols depending on the Column Scope
    switch (report.ReportColumnScope) {
      case ReportColumnScope.AllColumns:
        reportColumns = gridColumns;
        break;
      case ReportColumnScope.VisibleColumns:
        reportColumns = gridColumns.filter(c => c.Visible);
        break;
      case ReportColumnScope.SelectedCellColumns:
        let selectedCellInfo: SelectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();

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
    let reportColumns: AdaptableColumn[] = this.getReportColumnsForReport(report);
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
        this.adaptable.forAllRowNodesDo(row => {
          let newRow = this.getRowValues(row, reportColumns, report);
          dataToExport.push(newRow);
        });
        break;

      case ReportRowScope.VisibleRows:
        this.adaptable.forAllVisibleRowNodesDo(row => {
          let newRow = this.getRowValues(row, reportColumns, report);
          dataToExport.push(newRow);
        });
        break;

      case ReportRowScope.ExpressionRows:
        let expressionToCheck: Expression = report.Expression;
        this.adaptable.forAllRowNodesDo(row => {
          if (
            ExpressionHelper.checkForExpressionFromRowNode(
              expressionToCheck,
              row,
              reportColumns,
              this.adaptable
            )
          ) {
            let newRow = this.getRowValues(row, reportColumns, report);
            dataToExport.push(newRow);
          }
        });
        break;

      case ReportRowScope.SelectedCellRows:
        const selectedCellInfo: SelectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();

        const { GridCells } = selectedCellInfo;

        // Im sure this can be done better... but this is how I do it

        // 1.  Get - and sort - all the distinct primary key values
        let distinctPKValues = [
          ...new Set(
            GridCells.map(gc => gc.primaryKeyValue).sort(function(a, b) {
              return a < b ? -1 : 1;
            })
          ),
        ];

        // 2.  Loop through eaach of the primary key values to get all the Grid Cells that contain that pk value
        distinctPKValues.forEach((pkValue: any) => {
          const newRow: any[] = [];
          let matchingGridCells: GridCell[] = GridCells.filter(
            gc => gc.primaryKeyValue === pkValue
          );

          // 3.  Loop through each column to see if we have a GridCell in our group for the current PK
          // If we do then we add the value; otherwise we add null
          reportColumns.forEach(rc => {
            let matchingGridCell: GridCell = matchingGridCells.find(
              gc => gc.columnId === rc.ColumnId
            );
            // for now always adding raw value - but this might change...
            let cellValue: any = matchingGridCell
              ? this.getCellValueFromGridCell(matchingGridCell, rc, report)
              : null;
            newRow.push(cellValue);
          });
          dataToExport.push(newRow);
        });
        break;

      case ReportRowScope.SelectedRows:
        const selectedRowInfo: SelectedRowInfo = this.adaptable.api.gridApi.getSelectedRowInfo();
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
    let reportColumns: AdaptableColumn[] = this.getReportColumnsForReport(report);

    switch (report.ReportRowScope) {
      case ReportRowScope.AllRows:
        this.adaptable.forAllRowNodesDo(row => {
          let pkValue: any = this.adaptable.getPrimaryKeyValueFromRowNode(row);
          pkValues.push(pkValue);
        });
        break;

      case ReportRowScope.VisibleRows:
        this.adaptable.forAllVisibleRowNodesDo(row => {
          let pkValue: any = this.adaptable.getPrimaryKeyValueFromRowNode(row);
          pkValues.push(pkValue);
        });
        break;

      case ReportRowScope.ExpressionRows:
        let expressionToCheck: Expression = report.Expression;

        this.adaptable.forAllRowNodesDo(row => {
          if (
            ExpressionHelper.checkForExpressionFromRowNode(
              expressionToCheck,
              row,
              reportColumns,
              this.adaptable
            )
          ) {
            let pkValue: any = this.adaptable.getPrimaryKeyValueFromRowNode(row);
            pkValues.push(pkValue);
          }
        });
        break;

      case ReportRowScope.SelectedCellRows:
        const selectedCellInfo: SelectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();

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
        const selectedRowInfo: SelectedRowInfo = this.adaptable.api.gridApi.getSelectedRowInfo();
        if (selectedRowInfo != null && ArrayExtensions.IsNotNullOrEmpty(selectedRowInfo.GridRows)) {
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

  private getRowValues(rowNode: any, reportColumns: AdaptableColumn[], report: Report): any[] {
    let newRow: any[] = [];
    reportColumns.forEach(col => {
      let columnValue: any;
      let useRawValue: boolean = false;
      let exportColumnRawValue = this.adaptable.adaptableOptions.exportOptions!
        .exportColumnRawValue;
      if (exportColumnRawValue) {
        useRawValue = exportColumnRawValue(col, report);
      }
      if (useRawValue) {
        columnValue = this.adaptable.getRawValueFromRowNode(rowNode, col.ColumnId);
      } else {
        columnValue = this.adaptable.getDisplayValueFromRowNode(rowNode, col.ColumnId);
      }
      newRow.push(columnValue);
    });
    return newRow;
  }

  private getCellValueFromGridCell(
    gridCell: GridCell,
    reportColumn: AdaptableColumn,
    report: Report
  ): any {
    let useRawValue: boolean = false;
    let exportColumnRawValue = this.adaptable.adaptableOptions.exportOptions!.exportColumnRawValue;
    if (exportColumnRawValue) {
      useRawValue = exportColumnRawValue(reportColumn, report);
    }
    return useRawValue ? gridCell.rawValue : gridCell.displayValue;
  }

  public PublishLiveReportUpdatedEvent(
    reportDestination: 'iPushPull' | 'Glue42',
    liveReportTrigger: LiveReportTrigger
  ): void {
    let liveReportUpdatedInfo: LiveReportUpdatedInfo = {
      ReportDestination: reportDestination,
      LiveReportTrigger: liveReportTrigger,
      CurrentLiveReports: this.adaptable.api.internalApi.getCurrentLiveReports(),
    };
    const liveReportUpdatedEventArgs: LiveReportUpdatedEventArgs = AdaptableHelper.createFDC3Message(
      'Live Report Updated Args',
      liveReportUpdatedInfo
    );
    this.adaptable.api.eventApi.emit('LiveReportUpdated', liveReportUpdatedEventArgs);
  }

  public IsReportLiveReport(report: Report, exportDestination: ExportDestination): boolean {
    if (!report) {
      return false;
    }
    switch (exportDestination) {
      case ExportDestination.CSV:
      case ExportDestination.Clipboard:
      case ExportDestination.JSON:
        return false;
      case ExportDestination.OpenfinExcel:
        return true;
      case ExportDestination.Glue42:
        return this.adaptable.api.glue42Api.isGlue42RunLiveData();
    }
  }
}
