import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { Helper } from './Helper';
import { ColumnHelper } from './ColumnHelper';
import { AdaptableBlotterColumn } from '../Interface/AdaptableBlotterColumn';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { DataType, ActionMode } from '../../PredefinedConfig/Common/Enums';
import { ExpressionHelper } from './ExpressionHelper';
import { DataChangedInfo } from '../Interface/DataChangedInfo';
import { CellValidationRule } from '../../PredefinedConfig/RunTimeState/CellValidationState';
import { GridCell } from '../Interface/Selection/GridCell';

declare var Glue4Office: any;

export interface IGlue42ExportError {
  row: number;
  column: number;
  description: string;
  foregroundColor: string;
  backgroundColor: string;
}

export interface IGlue42ColumnInfo {
  header: string;
  fieldName: string;
}

let glue42office: any; // =   Glue4Office();
let excelAPIEntryPoint: any;

export async function init(blotter: IAdaptableBlotter) {
  try {
    glue42office = await Glue4Office();
    excelAPIEntryPoint = glue42office.excel;
    // NOTE by Jonny, 18/9/19:  you will need to set this to true here if you want it to work
    // something like blotter.api.gridApi.setGlue42On();
  } catch (error) {
    console.log(error);
  }
}

export function isRunningGlue42(): boolean {
  /**
   * Checks if the glue4office.js file is referenced and if we are running inside of a Glue42 container.
   * v2 will support browser.
   */

  return false; // typeof window !== "undefined" && "glue42gd" in window && "Glue4Office" in window;
}

export async function exportData(
  data: any[],
  gridColumns: AdaptableBlotterColumn[],
  blotter: IAdaptableBlotter
) {
  let exportColumns: any[] = data[0];
  let exportData: any[] = createData(data, exportColumns);
  let sentRows: any[] = Helper.cloneObject(exportData);

  const sheetData = {
    columnConfig: createColumns(data),
    data: exportData,
    options: {
      workbook: 'Glue42 Excel Integration Demo',
      worksheet: 'Data Sheet',
    },
  };

  try {
    console.log(sheetData);
    const sheet = await excelAPIEntryPoint.openSheet(sheetData);
    sheet.onChanged((data: any[], errorCallback: any, doneCallback: any) => {
      let primaryKeyColumnFriendlyName = ColumnHelper.getFriendlyNameFromColumnId(
        blotter.blotterOptions.primaryKey,
        gridColumns
      );

      let cellInfos: GridCell[] = [];
      const errors: IGlue42ExportError[] = [];
      for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        let returnedRow: any = data[rowIndex];
        let sentRow: any = sentRows[rowIndex];

        for (let columnIndex = 0; columnIndex < exportColumns.length; columnIndex++) {
          let col: any = exportColumns[columnIndex];
          let returnedValue = returnedRow[col];
          let originalValue = sentRow[col];
          if (returnedValue != originalValue) {
            let column: AdaptableBlotterColumn = ColumnHelper.getColumnFromFriendlyName(
              col,
              gridColumns
            );
            let primaryKeyValue: any = returnedRow[primaryKeyColumnFriendlyName];
            if (
              isValidEdit(
                column,
                originalValue,
                returnedValue,
                primaryKeyValue,
                rowIndex,
                columnIndex,
                errors,
                gridColumns,
                blotter
              )
            ) {
              let cellInfo: GridCell = {
                primaryKeyValue: primaryKeyValue,
                columnId: column.ColumnId,
                value: returnedValue,
              };
              cellInfos.push(cellInfo);
            }
            sentRows[rowIndex][col] = returnedValue; // we always set (even if invalid) so dont update after future edits
          }
        }
      }
      blotter.setValueBatch(cellInfos);
      ArrayExtensions.IsNullOrEmpty(errors) ? doneCallback() : errorCallback(errors);
    });
  } catch (error) {
    console.log(error);
  }
}

function isValidEdit(
  column: AdaptableBlotterColumn,
  originalValue: any,
  returnedValue: any,
  primaryKeyValue: any,
  rowIndex: number,
  columnIndex: number,
  errors: IGlue42ExportError[],
  columns: AdaptableBlotterColumn[],
  blotter: IAdaptableBlotter
): boolean {
  if (column.ReadOnly) {
    errors.push(
      addValidationError(rowIndex + 1, columnIndex + 1, column.FriendlyName + ' is read only')
    );
    return false;
  }

  // check for type -- do properly in due course, but for now just check numbers...
  if (column.DataType == DataType.Number) {
    if (isNaN(Number(returnedValue))) {
      errors.push(
        addValidationError(rowIndex + 1, columnIndex + 1, column.FriendlyName + ' is numeric')
      );
      return false;
    }
  }

  let dataChangedInfo: DataChangedInfo = {
    OldValue: originalValue,
    NewValue: returnedValue,
    ColumnId: column.ColumnId,
    IdentifierValue: primaryKeyValue,
    Record: null,
  };

  // check for any validation issues
  let cellValidationRules: CellValidationRule[] = blotter.ValidationService.ValidateCellChanging(
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
        errors.push(addValidationError(rowIndex + 1, columnIndex + 1, failedvalidationMessage));
      } else {
        errors.push(addValidationWarning(rowIndex + 1, columnIndex + 1, failedvalidationMessage));
      }
    });
    return false;
  }
  return true;
}

function addValidationWarning(
  rowIndex: number,
  columnIndex: number,
  errorDescription: string
): IGlue42ExportError {
  return {
    row: rowIndex,
    column: columnIndex,
    description: errorDescription,
    foregroundColor: 'orange',
    backgroundColor: 'white',
  };
}

function addValidationError(
  rowIndex: number,
  columnIndex: number,
  errorDescription: string
): IGlue42ExportError {
  return {
    row: rowIndex,
    column: columnIndex,
    description: errorDescription,
    foregroundColor: 'red',
    backgroundColor: 'white',
  };
}

export function createColumns(data: any[]): IGlue42ColumnInfo[] {
  let firstRow: string[] = data[0];
  let headers: IGlue42ColumnInfo[] = [];
  firstRow.forEach((element: any) => {
    headers.push({
      header: element.replace(' ', ''),
      fieldName: element,
    });
  });
  return headers;
}

export function createData(data: any[], headers: any[]): any {
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
export const Glue42Helper = {
  init,
  isRunningGlue42,
  exportData,
  createColumns,
  createData,
};
export default Glue42Helper;
