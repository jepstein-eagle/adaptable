import { Action } from 'redux';

export interface IMenuItem {
  Label: string;
  StrategyId: string;
  Action: Action;
  IsVisible: boolean;
  GlyphIcon: string;
}

export interface IContextMenu {
  ColumnId: string;
  Items: IMenuItem[];
}
