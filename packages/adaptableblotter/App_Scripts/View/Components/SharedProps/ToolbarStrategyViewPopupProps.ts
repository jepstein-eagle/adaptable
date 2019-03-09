import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as Redux from "redux";
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../../Redux/ActionsReducers/DashboardRedux'
import { DashboardSize } from '../../../Utilities/Enums';


export interface ToolbarStrategyViewPopupProps<View> extends StrategyViewPopupProps<View> {
    onClick: (action: Redux.Action) => Redux.Action,
    onClose: (dashboardControl: string) => DashboardRedux.DashboardHideToolbarAction
    onConfigure: () => PopupRedux.PopupShowScreenAction;
    UseSingleColourForButtons: boolean;
    DashboardSize: DashboardSize;
  }