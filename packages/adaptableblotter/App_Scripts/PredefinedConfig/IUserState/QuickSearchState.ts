import { IStyle } from '../Common/IStyle';
import { IUserState } from './IUserState';

export interface QuickSearchState extends IUserState {
  QuickSearchText?: string;
  DisplayAction?: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';
  Style?: IStyle;
}
