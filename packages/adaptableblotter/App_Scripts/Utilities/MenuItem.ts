import * as Redux from 'redux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { GridCell } from './Interface/Selection/GridCell';
import { IColumn } from './Interface/IColumn';

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
  column: IColumn;
  // whether or not the cell clicked is one that is currently selected.
  // important for strategies like Smart Edit where we act on more than one cell
  // our assumption is that we will only do things if the cell clicked is also selected
  isSelectedCell: boolean;
  // whether or not the column that has been clicked is the ONLY column with selected cells
  // important as some strategies will only do stuff if there is just one selected column (e.g. Pie chart) but others dont mind (e.g. cell summary)
  isSingleSelectedColumn: boolean;
}

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
