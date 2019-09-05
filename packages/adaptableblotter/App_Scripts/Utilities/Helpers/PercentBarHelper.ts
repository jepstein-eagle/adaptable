import { DistinctCriteriaPairValue } from '../../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';

export function getDistinctColumnValues(blotter: IAdaptableBlotter, columnId: string): number[] {
  let distinctColumnsValues: number[] = blotter
    .getColumnValueDisplayValuePairDistinctList(columnId, DistinctCriteriaPairValue.RawValue, false)
    .map(pair => {
      return pair.RawValue;
    });

  // filter out any undefined or nulls
  distinctColumnsValues = distinctColumnsValues.filter(i => i);
  return distinctColumnsValues;
}

export const PercentBarHelper = {
  getDistinctColumnValues,
};
export default PercentBarHelper;
