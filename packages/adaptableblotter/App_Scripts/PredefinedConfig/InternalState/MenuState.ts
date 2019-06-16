import { IMenuItem, IContextMenu } from '../../Utilities/Interface/IMenu';
import { InternalState } from './InternalState';
export interface MenuState extends InternalState {
  MenuItems: IMenuItem[];
  ContextMenu: IContextMenu;
}
