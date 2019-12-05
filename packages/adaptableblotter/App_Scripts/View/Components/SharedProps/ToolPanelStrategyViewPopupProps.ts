import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as Redux from 'redux';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../../Redux/ActionsReducers/ToolPanelRedux';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
import { BlotterApi, IAdaptableBlotter } from '../../../types';

export interface ToolPanelStrategyViewPopupProps<View> extends StrategyViewPopupProps<View> {
  onClick: (action: Redux.Action) => Redux.Action;
  onClose: (toolPanel: string) => ToolPanelRedux.ToolPanelHideToolPanelAction;
  onConfigure: () => PopupRedux.PopupShowScreenAction;
  AccessLevel: AccessLevel;
  BlotterApi: BlotterApi;
  Blotter: IAdaptableBlotter;
}
