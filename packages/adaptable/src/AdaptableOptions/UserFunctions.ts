import { AdaptableComparerFunction } from '../PredefinedConfig/Common/AdaptableComparerFunction';

export interface UserFunctions {
  customSortFunctions: { [key: string]: AdaptableComparerFunction };
}
