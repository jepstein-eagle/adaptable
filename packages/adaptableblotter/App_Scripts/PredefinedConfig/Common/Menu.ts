import * as Redux from 'redux';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';
import { AdaptableColumn } from './AdaptableColumn';
import { AdaptableFunctionName } from './Types';

/*
Note for devs:  The Adaptable provides 3 menus:

1. Main Menu (or Function Menu).
This is the menu that appears when you click the home button in the first toolbar.
It shows every Strategy that doesnt have an Entitlement of Hidden, and when clicked each menu item opens a popup for that Strategy.
It is created at Start-up and - because it doesnt change within the session - the menu is then stored in the MainMenuItems property of GridState.(note we no longer have menu state).

2. Column Header Menu
The menu that appears when you click the Column Header icon (3 vertical lines).
Each strategy decides whether or not to provide a Menu Item - through overriding the addColumnMenuItem function.
If so, then it provides the menu item, together with any params that are required - via the popupParams property.
This is created EACH TIME that a column header menu is opened and nothing is persisted in State.  The reason being that it is context dependent and so the contents might be different to the previous time it was opened.

3.  Context Menu
The menu that appears when the user right clicks in a cell in Adaptable
Currently we ONLY react to non-grouped cells.
We create a MenuInfo object which contains deatils of the cell and column clicked
It also stipulates whethere the cell clicked is one which is part of the current cell selection, and whether the column is the only column with selected cells (both required info for some strategies)
Like with the Column Menu,the Context menu is created EACH TIME that it is opened and nothing is persisted in State.

*/

/**
 * The main menu item used by the Adaptable.
 *
 * It is used in 3 places:
 *
 * - **Function Menu**: the menu at the left of the Home Toolbar (with a home icon) and at the top of the Adaptable Tool Panel that shows all the available functions.  Clicking a menu item will open the popup for that Function.
 *
 * - **Column Header Menu**: the menu that appears in the Column Header.  We add our menu items after those provided by the vendor grid.
 *
 * - **Context Menu**: when you right-click any cell in the grid.
 */
export interface AdaptableMenuItem {
  /**
   * The name that appears in the menu
   */
  Label: string;

  /**
   * The name of the function.
   */
  FunctionName: AdaptableFunctionName;

  ReduxAction?: Redux.Action;
  ClickFunction?: () => void;
  IsVisible: boolean;
  Icon: string;
}

/**
 * Provides details about the context for the current Menu
 *
 * Used for both Column and Context Menus though for the former only the `column' property is populated.
 */
export interface MenuInfo {
  /**
   *  The cell that has been clicked.  Contains the current value of the cell
   */
  gridCell: GridCell;
  /**
   * The current Column
   */
  column: AdaptableColumn;
  /**
   * Whether or not the cell clicked is one that is currently selected.
   *
   * If it is not, then some options are not available.
   */
  isSelectedCell: boolean;

  /**
   * Whether or not the column that has been clicked is the ONLY column with selected cells.
   *
   * If it is not, then some options are not available.
   */
  isSingleSelectedColumn: boolean;

  /**
   * The current row node
   */
  rowNode: any;

  /**
   * The value of the primary key column in the current row
   */
  primaryKeyValue: any;
}
