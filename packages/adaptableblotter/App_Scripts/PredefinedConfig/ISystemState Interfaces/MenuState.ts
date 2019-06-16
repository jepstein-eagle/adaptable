import { IMenuItem, IContextMenu } from '../../Utilities/Interface/IMenu';
import { ISystemState } from '../Interfaces/ISystemState';
export interface MenuState extends ISystemState {
  MenuItems: IMenuItem[];
  ContextMenu: IContextMenu;
}
