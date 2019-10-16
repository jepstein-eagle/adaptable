import { ExpressionHelper } from './ExpressionHelper';
import { AdaptableBlotterColumn } from '../Interface/AdaptableBlotterColumn';
import { IKeyValuePair } from '../Interface/IKeyValuePair';
import { ColumnHelper } from './ColumnHelper';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { ColumnFilter } from '../../PredefinedConfig/RunTimeState/ColumnFilterState';

export function convertColumnFiltersToKVPArray(
  columnFilters: ColumnFilter[],
  columns: AdaptableBlotterColumn[]
): IKeyValuePair[] {
  let infoBody: IKeyValuePair[] = [];
  columnFilters.forEach(x => {
    let column: AdaptableBlotterColumn = ColumnHelper.getColumnFromId(x.ColumnId, columns);
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
  columnFilters: ColumnFilter[],
  columns: AdaptableBlotterColumn[],
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
