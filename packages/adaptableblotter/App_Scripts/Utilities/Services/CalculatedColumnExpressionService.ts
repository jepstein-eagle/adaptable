import { ICalculatedColumnExpressionService } from './Interface/ICalculatedColumnExpressionService';
import * as math from 'mathjs';
import { LoggingHelper } from '../Helpers/LoggingHelper';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { CalculatedColumnHelper } from '../Helpers/CalculatedColumnHelper';
import { IColumn } from '../Interface/IColumn';

export class CalculatedColumnExpressionService implements ICalculatedColumnExpressionService {
  constructor(
    private blotter: IAdaptableBlotter,
    private colFunctionValue: (columnId: string, record: any) => any
  ) {
    this.blotter = blotter;
    this.colFunctionValue = colFunctionValue;
  }

  IsExpressionValid(expression: string): { IsValid: Boolean; ErrorMsg?: string } {
    try {
      let columns: IColumn[] = this.blotter.api.gridApi.getColumns();
      let cleanedExpression: string = CalculatedColumnHelper.cleanExpressionColumnNames(
        expression,
        columns
      );
      let firstRecord = this.blotter.getFirstRecord();
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

  ComputeExpressionValue(expression: string, record: any): any {
    try {
      if (this.blotter.isGroupRecord(record)) {
        return null;
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
}
