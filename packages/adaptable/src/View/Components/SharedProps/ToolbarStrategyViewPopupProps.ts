import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as Redux from 'redux';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../../Redux/ActionsReducers/DashboardRedux';
import { AdaptableFunctionName } from '../../../PredefinedConfig/Common/Types';
import { CustomToolbar } from '../../../PredefinedConfig/DashboardState';

export interface CustomToolbarStrategyViewPopupProps<View> extends StrategyViewPopupProps<View> {
  customToolbar: CustomToolbar;
}

export interface ToolbarStrategyViewPopupProps<View> extends StrategyViewPopupProps<View> {
  onClick: (action: Redux.Action) => Redux.Action;
  onConfigure: () => PopupRedux.PopupShowScreenAction;
}
