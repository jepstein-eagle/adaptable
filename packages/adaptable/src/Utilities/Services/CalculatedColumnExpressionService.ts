import { ICalculatedColumnExpressionService } from './Interface/ICalculatedColumnExpressionService';
import { evaluate } from '../../parser/src';
import { LoggingHelper } from '../Helpers/LoggingHelper';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { DataType } from '../../PredefinedConfig/Common/Enums';

export class CalculatedColumnExpressionService implements ICalculatedColumnExpressionService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  public GetCalculatedColumnDataType(expression: string): 'String' | 'Number' | 'Boolean' | 'Date' {
    try {
      let firstRecord = this.adaptable.api.gridApi.getFirstRowNode();
      let firstRowValue: any = evaluate(expression, {
        data: firstRecord.data,
      });
      if (firstRowValue instanceof Date) {
        return DataType.Date;
      }
      if (typeof firstRowValue === 'boolean') {
        return DataType.Boolean;
      }
      if (typeof firstRowValue === 'string') {
        return DataType.String;
      }
      if (typeof firstRowValue === 'number') {
        return DataType.Number;
      }
    } catch (e) {
      LoggingHelper.LogAdaptableWarning(e);
      return DataType.Number;
    }
  }

  public IsExpressionValid(expression: string): { IsValid: Boolean; ErrorMsg?: string } {
    try {
      let columns: AdaptableColumn[] = this.adaptable.api.columnApi.getColumns();
      let cleanedExpression: string = this.CleanExpressionColumnNames(expression, columns);
      let firstRecord = this.adaptable.getFirstRowNode();
      evaluate(cleanedExpression, {
        data: firstRecord.data,
      });
      return { IsValid: true };
    } catch (e) {
      LoggingHelper.LogAdaptableWarning(e);
      return { IsValid: false, ErrorMsg: e.message };
    }
  }

  public ComputeExpressionValue(expression: string, record: any): any {
    try {
      if (this.adaptable.isGroupRowNode(record)) {
        return undefined;
      }
      return evaluate(expression, {
        data: record.data,
      });
    } catch (e) {
      LoggingHelper.LogAdaptableError(e);
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
      let col: AdaptableColumn = this.adaptable.api.columnApi.getColumnFromId(columnId);
      if (!col) {
        // no column so lets see if they are using FriendlyName
        col = this.adaptable.api.columnApi.getColumnFromFriendlyName(columnId);
        if (col) {
          columnNameList.push(columnId);
        }
      }
      match = regEx.exec(expression);
    }

    columnNameList.forEach(c => {
      let stringToReplace: string = 'Col("' + c + '")';
      let columnId = this.adaptable.api.columnApi.getColumnIdFromFriendlyName(c);
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
      let columnFriendName = this.adaptable.api.columnApi.getFriendlyNameFromColumnId(c);
      let newString: string = '[' + columnFriendName + ']';
      cleanExpression = cleanExpression.replace(stringToReplace, newString);
    });
    return cleanExpression;
  }
}
