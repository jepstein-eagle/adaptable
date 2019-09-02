import { Action } from 'redux';
import { GridCell } from './Selection/GridCell';
import { IColumn } from './IColumn';

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

export interface ContextMenuInfo {
  currentCell: GridCell;
  isSelectedCell: boolean;
  column: IColumn;
  isSelectedColumn: boolean;
}
