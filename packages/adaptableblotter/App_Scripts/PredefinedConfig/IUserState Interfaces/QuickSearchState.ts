import { IStyle } from '../Common Objects/IStyle';
import { IUserState } from '../Interfaces/IUserState';

export interface QuickSearchState extends IUserState {
  QuickSearchText?: string;
  DisplayAction?: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';
  Style?: IStyle;
}
