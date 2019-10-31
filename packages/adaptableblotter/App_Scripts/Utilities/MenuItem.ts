import * as Redux from 'redux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { GridCell } from './Interface/Selection/GridCell';
import { AdaptableBlotterColumn } from './Interface/AdaptableBlotterColumn';

/*
The Adaptable Blotter provides 3 menus:

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
The menu that appears when the user right clicks in a cell in the Blotter
Currently we ONLY react to non-grouped cells.
We create a ContextMenu object which contains deatils of the cell and column clicked
It also stipulates whethere the cell clicked is one which is part of the current cell selection, and whether the column is the only column with selected cells (both required info for some strategies)
Like with the Column Menu,the Context menu is created EACH TIME that it is opened and nothing is persisted in State.

*/

// A menu item - used in all 3 menus
export interface AdaptableBlotterMenuItem {
  Label: string;
  StrategyId: string;
  Action: Redux.Action;
  IsVisible: boolean;
  GlyphIcon: string;
}

export interface ContextMenuInfo {
  // the cell that has been clicked
  gridCell: GridCell;
  // the column in which the cell was clicked
  column: AdaptableBlotterColumn;
  // whether or not the cell clicked is one that is currently selected.
  // important for strategies like Smart Edit where we act on more than one cell
  // our assumption is that we will only do things if the cell clicked is also selected
  isSelectedCell: boolean;
  // whether or not the column that has been clicked is the ONLY column with selected cells
  // important as some strategies will only do stuff if there is just one selected column (e.g. Pie chart) but others dont mind (e.g. cell summary)
  isSingleSelectedColumn: boolean;
  // this will be the node
  rowNode: any;

  primaryKeyValue: any;
}

// A menu item which performs a Redux Action when it is clicke
export class MenuItemDoReduxAction implements AdaptableBlotterMenuItem {
  constructor(
    label: string,
    strategyId: string,
    action: Redux.Action,
    glyphIcon: string,
    isVisible: boolean
  ) {
    this.Label = label;
    this.StrategyId = strategyId;
    this.IsVisible = isVisible;
    this.GlyphIcon = glyphIcon;
    this.Action = action;
  }

  public Action: Redux.Action;
  public Label: string;
  public StrategyId: string;
  public IsVisible: boolean;
  public GlyphIcon: string;
}

// A menu item which shows a popup screen when it is clieked
export class MenuItemShowPopup implements AdaptableBlotterMenuItem {
  constructor(
    label: string,
    strategyId: string,
    componentName: string,
    glyphIcon: string,
    isVisible: boolean,
    popupParams?: StrategyParams
  ) {
    this.Label = label;
    this.StrategyId = strategyId;
    this.IsVisible = isVisible;
    this.GlyphIcon = glyphIcon;
    this.Action = PopupRedux.PopupShowScreen(strategyId, componentName, popupParams);
  }
  public Action: Redux.Action;
  public Label: string;
  public StrategyId: string;
  public IsVisible: boolean;
  public GlyphIcon: string;
}
