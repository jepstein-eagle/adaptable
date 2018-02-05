import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView';
import * as Redux from "redux";
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';


export interface IToolbarStrategyViewPopupProps<View> extends IStrategyViewPopupProps<View> {
    IsReadOnly: boolean,
    onClick: (action: Redux.Action) => Redux.Action,
    onClose: (dashboardControl: IDashboardStrategyControlConfiguration) => DashboardRedux.DashboardChangeControlVisibilityAction
    onConfigure: () => PopupRedux.PopupShowAction;
    DashboardControl: IDashboardStrategyControlConfiguration
}
