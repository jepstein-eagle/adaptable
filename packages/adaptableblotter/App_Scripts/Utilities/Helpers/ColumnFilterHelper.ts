import { ExpressionHelper } from './ExpressionHelper';
import { IColumn } from '../Interface/IColumn';
import { IKeyValuePair } from '../Interface/IKeyValuePair';
import { ColumnHelper } from './ColumnHelper';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { IColumnFilter } from '../../PredefinedConfig/IUserState Interfaces/ColumnFilterState';

export function convertColumnFiltersToKVPArray(
  columnFilters: IColumnFilter[],
  columns: IColumn[]
): IKeyValuePair[] {
  let infoBody: IKeyValuePair[] = [];
  columnFilters.forEach(x => {
    let column: IColumn = ColumnHelper.getColumnFromId(x.ColumnId, columns);
    if (column) {
      let expression: string = ExpressionHelper.ConvertExpressionToString(x.Filter, columns, false);
      infoBody.push({
        Key: ColumnHelper.getFriendlyNameFromColumnId(x.ColumnId, columns),
        Value: expression,
      });
    }
  });
  return infoBody;
}

export function getColumnFiltersDescription(
  columnFilters: IColumnFilter[],
  columns: IColumn[],
  blotter: IAdaptableBlotter
): string {
  if (ArrayExtensions.IsNullOrEmpty(columnFilters)) {
    return 'No Column Filter Active';
  }
  let stringarr: string[] = ColumnFilterHelper.convertColumnFiltersToKVPArray(
    columnFilters,
    columns
  ).map(kvp => {
    return kvp.Key + ': ' + kvp.Value;
  });
  return stringarr.join('; ');
}

export const ColumnFilterHelper = {
  convertColumnFiltersToKVPArray,
  getColumnFiltersDescription,
};
export default ColumnFilterHelper;
