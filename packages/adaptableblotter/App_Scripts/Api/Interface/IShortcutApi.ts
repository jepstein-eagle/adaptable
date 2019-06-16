import { ShortcutState, IShortcut } from '../../PredefinedConfig/IUserState/ShortcutState';
export interface IShortcutApi {
  getShortcutState(): ShortcutState;
  getAllShortcut(): IShortcut[];
  addShortcut(shortcut: IShortcut): void;
  deleteShortcut(shortcut: IShortcut): void;
  deleteAllShortcut(): void;
}
