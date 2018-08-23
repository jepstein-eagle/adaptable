import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as Redux from "redux";
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../../Redux/ActionsReducers/DashboardRedux'
import { IAdaptableBlotter } from '../../../Core/Interface/IAdaptableBlotter';


export interface ToolbarStrategyViewPopupProps<View> extends StrategyViewPopupProps<View> {
    IsReadOnly: boolean,
    AdaptableBlotter: IAdaptableBlotter
    onClick: (action: Redux.Action) => Redux.Action,
    onClose: (dashboardControl: string) => DashboardRedux.DashboardHideToolbarAction
    onConfigure: (isReadonly: boolean) => PopupRedux.PopupShowScreenAction;
  }