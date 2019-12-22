import { IStrategy } from './IStrategy';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';

export interface ICustomSortStrategy extends IStrategy {
  getComparerFunction(customSort: CustomSort): Function;
}
