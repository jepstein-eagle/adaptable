import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as Redux from "redux";
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../../Redux/ActionsReducers/DashboardRedux'


export interface ToolbarStrategyViewPopupProps<View> extends StrategyViewPopupProps<View> {
    IsReadOnly: boolean,
    onClick: (action: Redux.Action) => Redux.Action,
    onClose: (dashboardControl: string) => DashboardRedux.DashboardChangeControlVisibilityAction
    onConfigure: (isReadonly: boolean) => PopupRedux.PopupShowAction;
   //DashboardControl: string
}