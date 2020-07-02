import * as Redux from 'redux';
import { GridCell } from '../Selection/GridCell';
import { AdaptableColumn } from './AdaptableColumn';
import { AdaptableFunctionName } from './Types';
import { AdaptableApi } from '../../Api/AdaptableApi';
import { SelectedCellInfo } from '../Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../Selection/SelectedRowInfo';

/*
Note for devs:  Adaptable provides 3 menus:

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
 * The main menu item used by Adaptable.
 *
 * It is used in 3 places:
 *
 * - **Function Menu**: the menu at the left of the Dashboard Header (with a home icon) and at the top of Adaptable Tool Panel that shows all the available functions.  Clicking a menu item will open the popup for that Function.
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
  FunctionName?: AdaptableFunctionName;

  ReduxAction?: Redux.Action;
  ClickFunction?: () => void;
  IsVisible: boolean;
  Icon?: string;
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
  GridCell: GridCell;
  /**
   * The current Column
   */
  Column: AdaptableColumn;
  /**
   * Whether or not the cell clicked is one that is currently selected.
   *
   * If it is not, then some options are not available.
   */
  IsSelectedCell: boolean;

  /**
   * Whether or not the column that has been clicked is the ONLY column with selected cells.
   *
   * If it is not, then some options are not available.
   */
  IsSingleSelectedColumn: boolean;

  /**
   * The current row node
   */
  RowNode: any;

  /**
   * Whether the current row node is grouped
   */
  IsGroupedNode: boolean;

  /**
   * The value of the primary key column in the current row
   */
  PrimaryKeyValue: any;

  /**
   * The main Adaptable Api object - included here as a convenience to make any api calls
   */
  AdaptableApi: AdaptableApi;

  /**
   * The currently selected cells in the grid
   */
  SelectedCellInfo: SelectedCellInfo;

  /**
   * The currently selected rows in the grid
   */
  SelectedRowInfo: SelectedRowInfo;
}
