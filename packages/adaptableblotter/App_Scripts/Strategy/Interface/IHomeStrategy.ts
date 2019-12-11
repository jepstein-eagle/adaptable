import { IStrategy } from './IStrategy';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import { AdaptableBlotterMenuItem } from '../../PredefinedConfig/Common/AdaptableBlotterMenuItem';

export interface IHomeStrategy extends IStrategy {
  addBaseColumnMenuItems(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem[];
}
