import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { BaseProps } from './BaseProps';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';

//Warning : FilterForm needs to be changed if we add properties since it uses the same interface
export interface StrategyViewPopupProps<View> extends BaseProps<View> {
  popupParams: StrategyParams;
  onClearPopupParams: () => PopupRedux.PopupClearParamAction;
  teamSharingActivated: boolean;
  onClosePopup: () => void;
}

// The params object that is, optionally, passed into each popup.  contains useful information
export interface StrategyParams {
  column?: AdaptableColumn;
  action?: 'New' | 'Edit';
  value?: any;
  primaryKeyValues?: any[];
  source: 'Toolbar' | 'FunctionMenu' | 'ColumnMenu' | 'ContextMenu' | 'FunctionButton' | 'Other'; // api??
}
