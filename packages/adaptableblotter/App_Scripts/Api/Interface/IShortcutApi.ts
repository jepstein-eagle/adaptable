import { ShortcutState, Shortcut } from '../../PredefinedConfig/RunTimeState/ShortcutState';
export interface IShortcutApi {
  getShortcutState(): ShortcutState;
  getAllShortcut(): Shortcut[];
  addShortcut(shortcut: Shortcut): void;
  deleteShortcut(shortcut: Shortcut): void;
  deleteAllShortcut(): void;

  /**
   * Opens the Shortcut popup screen
   */
  showShortcutPopup(): void;
}
