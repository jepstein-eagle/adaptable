import { IStrategy } from './IStrategy';
import { CustomSort, CustomSortComparerFunction } from '../../PredefinedConfig/CustomSortState';

export interface ICustomSortStrategy extends IStrategy {
  getComparerFunction(customSort: CustomSort): CustomSortComparerFunction;
}
