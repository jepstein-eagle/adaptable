import { IStyle } from '../Common/IStyle';
import { RunTimeState } from './RunTimeState';

export interface QuickSearchState extends RunTimeState {
  QuickSearchText?: string;
  DisplayAction?: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';
  Style?: IStyle;
}
