import { IStrategy } from './IStrategy';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { AdaptableBlotterMenuItem } from '../../Utilities/MenuItem';

export interface IHomeStrategy extends IStrategy {
  addBaseColumnMenuItems(column: IColumn): AdaptableBlotterMenuItem[];
}
