import { ShortcutState, Shortcut } from '../../PredefinedConfig/RunTimeState/ShortcutState';
export interface IShortcutApi {
  /**
   * Retrieves the Format Column State
   */
  getShortcutState(): ShortcutState;

  /**
   * Gets all Shortcuts in the State
   */
  getAllShortcut(): Shortcut[];

  /**
   * Adds a new shortcut to the state
   * @param shortcut the shortcut to add
   */
  addShortcut(shortcut: Shortcut): void;

  /**
   * Deletes a shortcut from the state
   * @param shortcut the shortcut to delete
   */
  deleteShortcut(shortcut: Shortcut): void;

  /**
   * Deletes all shortcuts in the state
   */
  deleteAllShortcut(): void;

  /**
   * Opens the Shortcut popup screen
   */
  showShortcutPopup(): void;
}
