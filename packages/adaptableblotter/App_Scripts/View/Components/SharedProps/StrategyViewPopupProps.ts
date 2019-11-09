import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { BaseProps } from './BaseProps';
import { ColumnSort } from '../../../PredefinedConfig/LayoutState';

//Warning : FilterForm needs to be changed if we add properties since it uses the same interface
export interface StrategyViewPopupProps<View> extends BaseProps<View> {
  PopupParams: StrategyParams;
  onClearPopupParams: () => PopupRedux.PopupClearParamAction;
  TeamSharingActivated: boolean;
  ColumnSorts: ColumnSort[]; // we should get rid of this!
}

// The params object that is, optionally, passed into each popup.  contains useful information
export interface StrategyParams {
  columnId?: string;
  action?: 'New' | 'Edit';
  value?: any;
  primaryKeyValues?: any[];
}
