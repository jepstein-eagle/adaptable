import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as Redux from "redux";
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../../Redux/ActionsReducers/DashboardRedux'
import { IDashboardStrategyControlConfiguration } from '../../../Strategy/Interface/IDashboardStrategy';


export interface ToolbarStrategyViewPopupProps<View> extends StrategyViewPopupProps<View> {
    IsReadOnly: boolean,
    onClick: (action: Redux.Action) => Redux.Action,
    onClose: (dashboardControl: IDashboardStrategyControlConfiguration) => DashboardRedux.DashboardChangeControlVisibilityAction
    onConfigure: (isReadonly: boolean) => PopupRedux.PopupShowAction;
    DashboardControl: IDashboardStrategyControlConfiguration
}