import { ICalculatedColumnExpressionService } from './Interface/ICalculatedColumnExpressionService';
import * as math from 'mathjs';
import { LoggingHelper } from '../Helpers/LoggingHelper';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import ColumnHelper from '../Helpers/ColumnHelper';

export class CalculatedColumnExpressionService implements ICalculatedColumnExpressionService {
  constructor(
    private blotter: IAdaptableBlotter,
    private colFunctionValue: (columnId: string, record: any) => any
  ) {
    this.blotter = blotter;
    this.colFunctionValue = colFunctionValue;
  }

  public GetCalculatedColumnDataType(expression: string): DataType {
    try {
      let firstRecord = this.blotter.getFirstRowNode();
      let firstRowValue: any = math.eval(expression, {
        Col: (columnId: string) => {
          try {
            return this.colFunctionValue(columnId, firstRecord);
          } catch (e) {
            throw Error('Unknown column ' + columnId);
          }
        },
      });
      return !isNaN(Number(firstRowValue)) ? DataType.Number : DataType.String;
    } catch (e) {
      LoggingHelper.LogAdaptableBlotterWarning(e);
      return DataType.Number;
    }
  }

  public IsExpressionValid(expression: string): { IsValid: Boolean; ErrorMsg?: string } {
    try {
      let columns: AdaptableColumn[] = this.blotter.api.gridApi.getColumns();
      let cleanedExpression: string = this.CleanExpressionColumnNames(expression, columns);
      let firstRecord = this.blotter.getFirstRowNode();
      math.eval(cleanedExpression, {
        Col: (columnId: string) => {
          try {
            return this.colFunctionValue(columnId, firstRecord);
          } catch (e) {
            throw Error('Unknown column ' + columnId);
          }
        },
      });
      return { IsValid: true };
    } catch (e) {
      LoggingHelper.LogAdaptableBlotterWarning(e);
      return { IsValid: false, ErrorMsg: e.message };
    }
  }

  public ComputeExpressionValue(expression: string, record: any): any {
    try {
      if (this.blotter.isGroupRowNode(record)) {
        return undefined;
      }
      return math.eval(expression, {
        node: record,
        Col: (columnId: string) => {
          try {
            return this.colFunctionValue(columnId, record);
          } catch (e) {
            throw Error('Unknown column ' + columnId);
          }
        },
      });
    } catch (e) {
      LoggingHelper.LogAdaptableBlotterError(e);
      return null;
    }
  }

  public GetColumnListFromExpression(expression: string): string[] {
    let columnList: string[] = [];
    let regEx: RegExp = /\b(?:Col\(")([a-zA-Z0-9 ]+)(?:"\))/g;
    let match = regEx.exec(expression);
    while (match !== null) {
      columnList.push(match[1]);
      match = regEx.exec(expression);
    }
    return columnList;
  }

  public CleanExpressionColumnNames(expression: string, columns: AdaptableColumn[]): string {
    let newExpression: string = expression;
    let columnNameList: string[] = [];
    let regEx: RegExp = /\b(?:Col\(")([a-zA-Z0-9 ]+)(?:"\))/g;
    let match = regEx.exec(expression);
    while (match !== null) {
      let columnId: any = match[1];

      // check if its a column name
      let col: AdaptableColumn = ColumnHelper.getColumnFromId(columnId, columns, false);
      if (!col) {
        // no column so lets see if they are using FriendlyName
        col = ColumnHelper.getColumnFromFriendlyName(columnId, columns, false);
        if (col) {
          columnNameList.push(columnId);
        }
      }
      match = regEx.exec(expression);
    }

    columnNameList.forEach(c => {
      let stringToReplace: string = 'Col("' + c + '")';
      let columnId = ColumnHelper.getColumnIdFromFriendlyName(c, columns);
      let newString: string = 'Col("' + columnId + '")';
      newExpression = newExpression.replace(stringToReplace, newString);
    });
    return newExpression;
  }

  public GetExpressionString(expression: string, columns: AdaptableColumn[]): string {
    let cleanExpression: string = this.CleanExpressionColumnNames(expression, columns);
    let columnIds: string[] = this.GetColumnListFromExpression(cleanExpression);
    columnIds.forEach(c => {
      let stringToReplace: string = 'Col("' + c + '")';
      let columnFriendName = ColumnHelper.getFriendlyNameFromColumnId(c, columns);
      let newString: string = '[' + columnFriendName + ']';
      cleanExpression = cleanExpression.replace(stringToReplace, newString);
    });
    return cleanExpression;
  }
}
