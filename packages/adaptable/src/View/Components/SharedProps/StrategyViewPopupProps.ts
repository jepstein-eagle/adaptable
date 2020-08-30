import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { BaseProps } from './BaseProps';
// import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';

//Warning : FilterForm needs to be changed if we add properties since it uses the same interface
export interface StrategyViewPopupProps<View> extends BaseProps<View> {
  popupParams: StrategyParams;
  onClearPopupParams: () => PopupRedux.PopupClearParamAction;
  teamSharingActivated: boolean;
  //  ColumnSorts: ColumnSort[]; // we should get rid of this!
  onClosePopup: () => void;
}

// The params object that is, optionally, passed into each popup.  contains useful information
export interface StrategyParams {
  columnId?: string;
  action?: 'New' | 'Edit';
  value?: any;
  primaryKeyValues?: any[];
  source: 'Toolbar' | 'FunctionMenu' | 'ColumnMenu' | 'ContextMenu' | 'FunctionButton' | 'Other'; // api??
}
