import { InternalState } from './InternalState';
import {
  AdaptableBlotterMenuItem,
  AdaptableBlotterMenu,
} from '../../Utilities/Interface/AdaptableBlotterMenu';

export interface MenuState extends InternalState {
  MainMenuItems: AdaptableBlotterMenuItem[];
  ColumnMenu: AdaptableBlotterMenu;
}
