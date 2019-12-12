import { IStrategy } from './IStrategy';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { AdaptableBlotterMenuItem } from '../../PredefinedConfig/Common/Menu';

export interface IHomeStrategy extends IStrategy {
  addBaseColumnMenuItems(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem[];
}
