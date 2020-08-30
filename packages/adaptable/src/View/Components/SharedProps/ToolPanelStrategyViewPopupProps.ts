import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as Redux from 'redux';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../../Redux/ActionsReducers/ToolPanelRedux';

import { AdaptableApi, IAdaptable } from '../../../types';
import { AdaptableToolPanel } from '../../../PredefinedConfig/Common/Types';
import { AccessLevel } from '../../../PredefinedConfig/EntitlementState';

export interface ToolPanelStrategyViewPopupProps<View> extends StrategyViewPopupProps<View> {
  onClick: (action: Redux.Action) => Redux.Action;
  onClose: (toolPanel: AdaptableToolPanel) => ToolPanelRedux.ToolPanelHideToolPanelAction;
  onConfigure: () => PopupRedux.PopupShowScreenAction;
}
