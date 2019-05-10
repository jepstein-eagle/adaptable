import { IShortcut } from '../../Utilities/Interface/BlotterObjects/IShortcut';
import { ShortcutState } from '../../Redux/ActionsReducers/Interface/IState';
export interface IShortcutApi {
  getShortcutState(): ShortcutState;
  getAllShortcut(): IShortcut[];
  addShortcut(shortcut: IShortcut): void;
  deleteShortcut(shortcut: IShortcut): void;
  deleteAllShortcut(): void;
}
