import { ILayout } from '../../Utilities/Interface/BlotterObjects/ILayout';
import { LayoutState } from '../../Redux/ActionsReducers/Interface/IState';
export interface ILayoutApi {
  getLayoutState(): LayoutState;
  /**
   * Selects the layout
   * @param layoutName has to be an existing layout
   */
  setLayout(layoutName: string): void;
  /**
   * Clears the currently selected layout
   */
  clearLayout(): void;
  /**
   * Retrieves current Layout
   */
  getCurrentLayout(): ILayout;
  /**
   * Retrieves current Layout name
   */
  getCurrentLayoutName(): string;
  /**
   * Retrieves the layout with the inputted name
   */
  getLayoutByName(layoutName: string): ILayout;
  /**
   * Retrieves all Layouts in State
   */
  getAllLayout(): ILayout[];
  /**
   * Saves the current layout - using the column order and grid sort info currently in the grid
   */
  saveLayout(): void;
}
