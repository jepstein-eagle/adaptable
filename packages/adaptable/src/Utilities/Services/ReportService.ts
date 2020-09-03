import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { SelectedCellInfo } from '../../PredefinedConfig/Selection/SelectedCellInfo';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import {
  ReportColumnScope,
  MessageType,
  ReportRowScope,
  ExportDestination,
  CellValueType,
} from '../../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { Report } from '../../PredefinedConfig/ExportState';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { SelectedRowInfo } from '../../PredefinedConfig/Selection/SelectedRowInfo';
import { GridRow } from '../../PredefinedConfig/Selection/GridRow';
import ObjectFactory from '../ObjectFactory';
import { IReportService } from './Interface/IReportService';
import { GridCell } from '../../PredefinedConfig/Selection/GridCell';
import AdaptableHelper from '../Helpers/AdaptableHelper';
import { LiveDataChangedInfo } from '../../Api/Events/LiveDataChanged';
import { LiveDataChangedEventArgs } from '../../types';
import {
  ALL_DATA_REPORT,
  VISIBLE_DATA_REPORT,
  SELECTED_CELLS_REPORT,
  SELECTED_ROWS_REPORT,
} from '../Constants/GeneralConstants';
import StringExtensions from '../Extensions/StringExtensions';
import * as parser from '../../parser/src';

export class ReportService implements IReportService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  public IsSystemReport(report: Report): boolean {
    return (
      report == null ||
      report.Name == ALL_DATA_REPORT ||
      report.Name == VISIBLE_DATA_REPORT ||
      report.Name == SELECTED_CELLS_REPORT ||
      report.Name == SELECTED_ROWS_REPORT
    );
  }

  public IsSystemReportActive(report: Report): boolean {
    if (report.Name == SELECTED_CELLS_REPORT || report.Name == SELECTED_ROWS_REPORT) {
      return this.adaptable.isSelectable();
    }
    return true;
  }

  public GetReportColumnScopeShortDescription(report: Report): string {
    switch (report.ReportColumnScope) {
      case ReportColumnScope.AllColumns:
        return '[All Columns]';
      case ReportColumnScope.VisibleColumns:
        return '[Visible Columns]';
      case ReportColumnScope.SelectedColumns:
        return '[Selected Columns]';
      case ReportColumnScope.ScopeColumns:
        return '[Bespoke Columns]';
      case ReportColumnScope.CustomColumns:
        return '[Custom Columns]';
    }
  }
  public GetReportColumnScopeLongDescription(report: Report): string {
    switch (report.ReportColumnScope) {
      case ReportColumnScope.AllColumns:
        return '[All Columns]';
      case ReportColumnScope.VisibleColumns:
        return '[Visible Columns]';
      case ReportColumnScope.SelectedColumns:
        return '[Selected Columns]';
      case ReportColumnScope.ScopeColumns:
        return this.adaptable.api.scopeApi.getScopeDescription(report.Scope);
      case ReportColumnScope.CustomColumns:
        return '[Custom Columns]';
    }
  }

  public GetReportExpressionDescription(report: Report, cols: AdaptableColumn[]): string {
    if (this.IsSystemReport(report)) {
      if (report.Name == ALL_DATA_REPORT) {
        return '[All Data]';
      } else if (report.Name == VISIBLE_DATA_REPORT) {
        return '[All Visible Data]';
      } else if (report.Name == SELECTED_CELLS_REPORT) {
        return '[Selected Cells Data]';
      } else if (report.Name == SELECTED_ROWS_REPORT) {
        return '[Selected Rows Data]';
      }
    } else {
      switch (report.ReportRowScope) {
        case ReportRowScope.AllRows:
          return '[All Rows]';
        case ReportRowScope.VisibleRows:
          return '[Visible Rows]';
        case ReportRowScope.SelectedRows:
          return '[Selected Rows]';
        case ReportRowScope.ExpressionRows:
          return this.adaptable.api.queryApi.QueryObjectToString(report);
        case ReportRowScope.CustomRows:
          return '[Custom Rows]';
      }
    }
  }

  public IsReportDestinationActive(exportDestination: ExportDestination): boolean {
    switch (exportDestination) {
      case ExportDestination.Excel:
      case ExportDestination.CSV:
      case ExportDestination.Clipboard:
      case ExportDestination.JSON:
        return true;
    }

    return false;
  }

  private getReportColumnsForReport(report: Report): AdaptableColumn[] {
    let reportColumns: AdaptableColumn[] = [];
    let gridColumns: AdaptableColumn[] = this.adaptable.api.columnApi.getColumns();

    // first get the cols depending on the Column Scope
    switch (report.ReportColumnScope) {
      case ReportColumnScope.AllColumns:
        reportColumns = gridColumns;
        break;
      case ReportColumnScope.VisibleColumns:
        reportColumns = gridColumns.filter(c => c.Visible);
        break;
      case ReportColumnScope.SelectedColumns:
        reportColumns = this.adaptable.api.gridApi.getSelectedCellInfo().Columns;
        break;
      case ReportColumnScope.ScopeColumns:
        reportColumns = this.adaptable.api.scopeApi.getColumnsForScope(report.Scope);
        break;
      case ReportColumnScope.CustomColumns:
        reportColumns = this.adaptable.api.scopeApi.getColumnsForScope(report.Scope);
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
          let newRow: any[] = this.getRowValues(row, reportColumns, report);
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
        let expressionToCheck: string = this.adaptable.api.queryApi.QueryObjectToString(report);

        this.adaptable.forAllRowNodesDo(node => {
          if (
            parser.evaluate(expressionToCheck, {
              node: node,
              api: this.adaptable.api,
            })
          ) {
            let newRow = this.getRowValues(node, reportColumns, report);
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

      case ReportRowScope.CustomRows:
        let customReportFunction = this.adaptable.getUserFunctionHandler(
          'CustomReportFunction',
          report.CustomReportFunction
        );
        let reportData = customReportFunction(report.Name);

        dataToExport.push(...reportData);
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
        let expressionToCheck: string = this.adaptable.api.queryApi.QueryObjectToString(report);

        this.adaptable.forAllRowNodesDo(node => {
          if (
            parser.evaluate(expressionToCheck, {
              node: node,
              api: this.adaptable.api,
            })
          ) {
            let pkValue: any = this.adaptable.getPrimaryKeyValueFromRowNode(node);
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

      //  useRawValue = true;
      if (useRawValue) {
        columnValue = this.adaptable.getRawValueFromRowNode(rowNode, col.ColumnId);
      } else {
        columnValue = this.adaptable.getValueFromRowNode(
          rowNode,
          col.ColumnId,
          CellValueType.DisplayValue
        );
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

  public PublishLiveLiveDataChangedEvent(
    reportDestination: 'ipushpull' | 'Glue42',
    liveDataTrigger:
      | 'Connected'
      | 'Disconnected'
      | 'LiveDataStarted'
      | 'LiveDataStopped'
      | 'LiveDataUpdated',
    liveReport?: any
  ): void {
    let liveDataChangedInfo: LiveDataChangedInfo = {
      ReportDestination: reportDestination,
      LiveDataTrigger: liveDataTrigger,
      LiveReport: liveReport,
      adaptableApi: this.adaptable.api,
    };
    const liveDataChangedEventArgs: LiveDataChangedEventArgs = AdaptableHelper.createFDC3Message(
      'Live Data Changed Args',
      liveDataChangedInfo
    );
    this.adaptable.api.eventApi.emit('LiveDataChanged', liveDataChangedEventArgs);
  }
}
