import {
  ShortcutState,
  IShortcut,
} from '../../PredefinedConfig/IUserState Interfaces/ShortcutState';
export interface IShortcutApi {
  getShortcutState(): ShortcutState;
  getAllShortcut(): IShortcut[];
  addShortcut(shortcut: IShortcut): void;
  deleteShortcut(shortcut: IShortcut): void;
  deleteAllShortcut(): void;
}
