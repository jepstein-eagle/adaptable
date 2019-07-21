import { Action } from 'redux';

export interface AdaptableBlotterMenuItem {
  Label: string;
  StrategyId: string;
  Action: Action;
  IsVisible: boolean;
  GlyphIcon: string;
}

export interface AdaptableBlotterMenu {
  ColumnId: string;
  MenuItems: AdaptableBlotterMenuItem[];
}
