import { LayoutState, Layout } from '../PredefinedConfig/LayoutState';

/**
 * Provides full and comprehensive run-time access to the Layout function and associated Layout state (from Predefined Config).
 *
 */
export interface LayoutApi {
  /**
   * Retrieves the Layout section from Adaptable State
   */
  getLayoutState(): LayoutState;

  /**
   * Sets (i.e. selects) the Layout
   * @param layoutName the Layout to set (has to be the name an existing Layout)
   */
  setLayout(layoutName: string): void;

  /**
   * Clears the currently selected Layout
   *
   * This will make the initial 'default' Layout appear.
   */
  clearLayout(): void;

  /**
   * Retrieves the current Layout
   */
  getCurrentLayout(): Layout;

  /**
   * Retrieves the name of the current Layout
   */
  getCurrentLayoutName(): string;

  /**
   * Returns true if the current Layout is the default Layout
   */
  isDefaultLayout(): boolean;

  /**
   * Retrieves the Layout with the inputted name
   */
  getLayoutByName(layoutName: string): Layout;

  /**
   * Retrieves all the Layouts in Adaptable State
   */
  getAllLayout(): Layout[];

  /**
   * Saves the current Layout - using the column order, visibility and grid sort info currently being displayed in the grid
   */
  saveCurrentLayout(): void;

  /**
   * Saves the given Layout into Adaptable State
   * @param layoutToSave the Layout to save (the Layout needs already to exist)
   */
  saveLayout(layoutToSave: Layout): void;

  /**
   * Creates the a new Layout in the state
   * @param layoutToCreate the Layout to create (the Api will create the identiifer automatically)
   */
  createLayout(layoutToCreate: Layout): void;

  /**
   * Creates the given Layout and then loads it into the Grid
   * @param layoutToCreate the Layout to create (the Api will create the identiifer automatically)
   */
  createAndSetLayout(layoutToCreate: Layout): void;

  /**
   * Clones the given Layout by creating a new one with the same properties but with a new name (using the one provided)
   * @param layoutToClone the Layout to clone
   * @param layoutName the name to use the new Layout
   */
  cloneLayout(layoutToClone: Layout, layoutName: string): void;

  /**
   * Clones the given Layout by creating a new one with the same properties but with a new name (using the one provided), and then loads it into the Grid
   * @param layoutToClone the Layout to clone
   * @param layoutName the name to use the new Layout
   */
  cloneAndSetLayout(layoutToClone: Layout, layoutName: string): void;

  /**
   * Checks whether this Layout exists in the Adaptable State (by comparing the Uuid property value)
   * @param layout the Layout to check
   */
  doesLayoutExist(layout: Layout): boolean;

  /**
   * Restores the given layout
   *
   * Reloads it according to initial definition with all vendor grid state removed.
   * @param layoutToRestore the Layout to restore (the Layout needs already to exist)
   */
  restorelayout(layoutToRestore: Layout): void;

  /**
   * Opens the Layout popup screen
   */
  showLayoutPopup(): void;
}
