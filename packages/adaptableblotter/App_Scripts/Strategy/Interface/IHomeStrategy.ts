import { IStrategy } from './IStrategy';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import { AdaptableBlotterMenuItem } from '../../Utilities/MenuItem';

export interface IHomeStrategy extends IStrategy {
  addBaseColumnMenuItems(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem[];
}
