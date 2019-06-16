import { ShortcutState, Shortcut } from '../../PredefinedConfig/IUserState/ShortcutState';
export interface IShortcutApi {
  getShortcutState(): ShortcutState;
  getAllShortcut(): Shortcut[];
  addShortcut(shortcut: Shortcut): void;
  deleteShortcut(shortcut: Shortcut): void;
  deleteAllShortcut(): void;
}
