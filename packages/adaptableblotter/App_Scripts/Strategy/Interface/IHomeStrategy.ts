import { IStrategy } from './IStrategy';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../../PredefinedConfig/Common/Menu';

export interface IHomeStrategy extends IStrategy {
  addBaseColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[];
}
