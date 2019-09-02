import { IStrategy } from './IStrategy';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { AdaptableBlotterMenuItem } from '../../Utilities/Interface/AdaptableBlotterMenu';

export interface IHomeStrategy extends IStrategy {
  addBaseColumnMenuItems(column: IColumn): AdaptableBlotterMenuItem[];
}
