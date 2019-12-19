import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import LoggingHelper, { LogAdaptableBlotterError } from '../Helpers/LoggingHelper';
import { cloneDeep } from 'lodash';
import Helper from '../Helpers/Helper';
import ColumnHelper from '../Helpers/ColumnHelper';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { DataType, ActionMode } from '../../PredefinedConfig/Common/Enums';
import { DataChangedInfo } from '../../BlotterOptions/CommonObjects/DataChangedInfo';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import ExpressionHelper from '../Helpers/ExpressionHelper';
import { Glue42State } from '../../PredefinedConfig/PartnerState';
import { IGlue42Service } from './Interface/IGlue42Service';

export interface Glue42ExportError {
  row: number;
  column: number;
  description: string;
  foregroundColor: string;
  backgroundColor: string;
}

export interface Glue42ColumnInfo {
  header: string;
  fieldName: string;
}

export interface ExcelStatus {
  msg: string;
  isResolved: boolean;
}

type SheetChangeCallback = (
  data: object[],
  errorCallback: (errors: any) => void,
  doneCallback: () => void,
  delta: any
) => void;

export class Glue42Service implements IGlue42Service {
  private glue4ExcelInstance!: any;
  private glueInstance!: any;
  private excelSyncTimeout?: number;
  private sheet?: any; // think this is wrong but lets give it a go
  private isExcelStatus: ExcelStatus = {
    msg: '[Excel] Not checked, changed the addin status 0 times!',
    isResolved: false,
  };

  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;

    this.blotter.api.eventApi.on('BlotterReady', () => {
      if (!this.glueInstance) {
        let glue42State: Glue42State | undefined = this.blotter.api.partnerApi.getGlue42State();
        if (glue42State) {
          this.init(glue42State);
        } else {
          this.blotter.api.internalApi.setGlue42Off();
        }
      }
    });
  }

  async init(glue42State: Glue42State): Promise<void> {
    try {
      const glue42Config = glue42State.Glue42Config;
      const glue = glue42State.Glue;
      const glue4Office = glue42State.Glue4Office;
      if (glue42Config.excelExport && glue42Config.excelExport.timeoutMs) {
        this.excelSyncTimeout = glue42Config.excelExport.timeoutMs;
      }

      this.glueInstance = await glue(glue42Config.initialization);
      // Avoid a circular assignment:
      const glue4OfficeConfig: any = cloneDeep(glue42Config.initialization);
      glue4OfficeConfig.glue = this.glueInstance;
      const glue4OfficeInstance = await glue4Office(glue4OfficeConfig);
      this.glue4ExcelInstance = glue4OfficeInstance.excel; // as Glue42Office.Excel.API;
      this.subscribeToAddinStatusChanges();
      this.blotter.api.internalApi.setGlue42On();
    } catch (error) {
      LogAdaptableBlotterError(error);
      this.blotter.api.internalApi.setGlue42Off();
    }
  }

  async exportData(data: any[], gridColumns: AdaptableBlotterColumn[], primaryKeys: any[]) {
    if (!this.glueInstance) {
      return;
    }

    try {
      if (!this.isExcelStatus.isResolved) {
        try {
          if (this.glueInstance.appManager) {
            await this.glueInstance.appManager.application('excel').start();
          }
        } catch (error) {}
      }

      let exportColumns: any[] = data[0];
      let exportData: any[] = this.createData(data, exportColumns);
      let sentRows: any[] = Helper.cloneObject(exportData);

      //Work around a mistaken definition
      const rowTrigger = 'row' as any;
      const updateTrigger = [rowTrigger];
      const syncOptions: any = {
        workbook: 'Glue42 Excel Integration Demo',
        worksheet: 'Data Sheet',
        updateTrigger,
      };
      if (this.excelSyncTimeout) {
        syncOptions.timeoutMs = this.excelSyncTimeout;
      }

      const sheetData: any = {
        columnConfig: this.createColumns(data),
        data: exportData,
        options: syncOptions,
      };

      const sheet = await this.glue4ExcelInstance.openSheet(sheetData);
      sheet.onChanged(
        this.getSheetChangeHandler(gridColumns, sentRows, exportColumns, primaryKeys)
      );
    } catch (error) {
      console.error(error);
    }
  }

  async openSheet(data: any[]): Promise<any> {
    if (!this.glueInstance) {
      return;
    }

    try {
      if (!this.isExcelStatus.isResolved) {
        try {
          if (this.glueInstance.appManager) {
            await this.glueInstance.appManager.application('excel').start();
          }
        } catch (error) {}
      }

      //Work around a mistaken definition
      const rowTrigger = 'row' as any;
      const updateTrigger = [rowTrigger];
      const syncOptions: any = {
        workbook: 'Glue42 Excel Integration Demo',
        worksheet: 'Data Sheet',
        updateTrigger,
      };
      if (this.excelSyncTimeout) {
        syncOptions.timeoutMs = this.excelSyncTimeout;
      }

      const openSheetConfig: any = {
        columnConfig: this.createColumns(data),
        data: [],
        options: syncOptions,
      };

      return new Promise<any>((resolve: any, reject: any) => {
        const page: any = this.glue4ExcelInstance.openSheet(openSheetConfig);
        this.sheet = page;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateData(data: any[], gridColumns: AdaptableBlotterColumn[], primaryKeys: any[]) {
    if (!this.glueInstance) {
      return;
    }

    try {
      let exportColumns: any[] = data[0];
      let exportData: any[] = this.createData(data, exportColumns);
      let sentRows: any[] = Helper.cloneObject(exportData);
      this.sheet.update(exportData);

      // should this be here? or in the openSheet function?
      this.sheet.onChanged(
        this.getSheetChangeHandler(gridColumns, sentRows, exportColumns, primaryKeys)
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Returns a callback, handling the Sheet Changed event.
   * Walks through the delta.
   */
  private getSheetChangeHandler(
    gridColumns: AdaptableBlotterColumn[],
    sentRows: any[],
    exportColumns: any[],
    primaryKeys?: any[]
  ): SheetChangeCallback {
    return (
      allData: any[],
      errorCallback: (errors: any[]) => void,
      doneCallback: () => void,
      delta: any[]
    ) => {
      let primaryKeyColumnFriendlyName = ColumnHelper.getFriendlyNameFromColumnId(
        this.blotter.blotterOptions.primaryKey,
        gridColumns
      );

      let dataChangedInfos: DataChangedInfo[] = [];
      const errors: Glue42ExportError[] = [];

      delta.forEach(deltaItem => {
        if (deltaItem.action === 'modified') {
          deltaItem.row.forEach((change: any, changeIndex: number) => {
            if (change !== null) {
              const column = ColumnHelper.getColumnFromFriendlyName(
                exportColumns[changeIndex],
                gridColumns
              );

              const originalRow = sentRows[deltaItem.rowBeforeIndex - 1];
              const originalValue = originalRow[exportColumns[changeIndex]];

              let primaryKeyValue: any;
              if (primaryKeys) {
                primaryKeyValue = primaryKeys[deltaItem.rowBeforeIndex - 1];
              } else {
                primaryKeyValue = originalRow[primaryKeyColumnFriendlyName];
              }

              var isValidEdit = this.isValidEdit(
                column,
                originalValue,
                change,
                primaryKeyValue,
                deltaItem.rowBeforeIndex - 1,
                changeIndex,
                errors,
                gridColumns
              );
              if (isValidEdit) {
                let dataChangedInfo: DataChangedInfo = {
                  OldValue: originalValue,
                  NewValue: change,
                  ColumnId: column.ColumnId,
                  PrimaryKeyValue: primaryKeyValue,
                };
                dataChangedInfos.push(dataChangedInfo);
              }
            }
          });
        } else {
          let msg = '';
          if (deltaItem.action === 'deleted') {
            msg = 'Deletion from Excel is not supported in this demo';
          }
          if (deltaItem.action === 'inserted') {
            msg = 'Insertion of new data to Excel is not supported in this demo';
          }
          errors.push({
            row: deltaItem.rowBeforeIndex - 1,
            column: 0,
            description: msg,
            foregroundColor: 'white',
            backgroundColor: 'red',
          } as Glue42ExportError);
        }
      });
      dataChangedInfos.forEach(dc => {
        this.blotter.setValue(dc);
      });

      if (ArrayExtensions.IsNullOrEmpty(errors)) {
        doneCallback();
      } else {
        errorCallback(errors);
      }
    };
  }

  /**
   * Checks if Excel is running, if not starts it
   */
  private subscribeToAddinStatusChanges(): void {
    //check if Excel is running
    try {
      this.glue4ExcelInstance.onAddinStatusChanged((connected: any) => {
        if (connected) {
          this.isExcelStatus = {
            msg: 'Excel is running',
            isResolved: true,
          };

          return;
        }

        this.isExcelStatus = {
          msg: 'Excel is not running',
          isResolved: false,
        };

        LoggingHelper.LogAdaptableBlotterWarning("[Excel] Application isn't running!");
      });
    } catch (error) {
      this.isExcelStatus = {
        msg: 'Error in isExcelRunning',
        isResolved: false,
      };
    }
  }

  private isValidEdit(
    column: AdaptableBlotterColumn,
    originalValue: any,
    returnedValue: any,
    primaryKeyValue: any,
    rowIndex: number,
    columnIndex: number,
    errors: Glue42ExportError[],
    columns: AdaptableBlotterColumn[]
  ): boolean {
    if (column.ReadOnly) {
      errors.push(
        this.addValidationError(
          rowIndex + 1,
          columnIndex + 1,
          column.FriendlyName + ' is read only'
        )
      );
      return false;
    }

    // check for type -- do properly in due course, but for now just check numbers...
    if (column.DataType == DataType.Number) {
      if (isNaN(Number(returnedValue))) {
        errors.push(
          this.addValidationError(
            rowIndex + 1,
            columnIndex + 1,
            column.FriendlyName + ' is numeric'
          )
        );
        return false;
      }
    }

    let dataChangedInfo: DataChangedInfo = {
      OldValue: originalValue,
      NewValue: returnedValue,
      ColumnId: column.ColumnId,
      PrimaryKeyValue: primaryKeyValue,
    };

    // check for any validation issues
    let cellValidationRules: CellValidationRule[] = this.blotter.ValidationService.GetValidationRulesForDataChange(
      dataChangedInfo
    );
    if (ArrayExtensions.IsNotNullOrEmpty(cellValidationRules)) {
      cellValidationRules.forEach((cv: CellValidationRule) => {
        let failedvalidationMessage: string =
          'Validation failed for ' +
          column.FriendlyName +
          ': ' +
          ExpressionHelper.ConvertRangeToString(cv.Range, columns);
        if (cv.ActionMode == ActionMode.StopEdit) {
          errors.push(
            this.addValidationError(rowIndex + 1, columnIndex + 1, failedvalidationMessage)
          );
        } else {
          errors.push(
            this.addValidationWarning(rowIndex + 1, columnIndex + 1, failedvalidationMessage)
          );
        }
      });
      return false;
    }
    return true;
  }

  private addValidationWarning(
    rowIndex: number,
    columnIndex: number,
    errorDescription: string
  ): Glue42ExportError {
    return {
      row: rowIndex,
      column: columnIndex,
      description: errorDescription,
      foregroundColor: 'orange',
      backgroundColor: 'white',
    };
  }

  private addValidationError(
    rowIndex: number,
    columnIndex: number,
    errorDescription: string
  ): Glue42ExportError {
    return {
      row: rowIndex,
      column: columnIndex,
      description: errorDescription,
      foregroundColor: 'red',
      backgroundColor: 'white',
    };
  }

  createColumns(data: any[]): Glue42ColumnInfo[] {
    let firstRow: string[] = data[0];
    let headers: Glue42ColumnInfo[] = [];
    firstRow.forEach((element: any) => {
      headers.push({
        header: element.replace(' ', ''),
        fieldName: element,
      });
    });
    return headers;
  }

  createData(data: any[], headers: any[]): any {
    let returnArray: any[] = [];

    for (let i = 1; i < data.length; i++) {
      let row: any[] = data[i];
      let returnItem: any = {};
      for (let j = 0; j < headers.length; j++) {
        returnItem[headers[j]] = row[j];
      }
      returnArray.push(returnItem);
    }
    return returnArray;
  }
}
