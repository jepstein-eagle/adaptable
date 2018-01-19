import { IAdaptableBlotter } from './IAdaptableBlotter';
import * as React from "react";
import { DistinctCriteriaPairValue } from '../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../Core/Interface/IAdaptableBlotter';
import { IStrategy } from '../../Core/Interface/IStrategy';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView';
import * as Redux from "redux";
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';


export interface IToolbarStrategyViewPopupProps<View> extends IStrategyViewPopupProps<View> {
    IsReadOnly: boolean,
    onClick: (action: Redux.Action) => Redux.Action,
    onClose: (dashboardControl: IDashboardStrategyControlConfiguration) => DashboardRedux.DashboardChangeControlVisibilityAction
    onConfigure: () => PopupRedux.PopupShowAction;
    DashboardControl: IDashboardStrategyControlConfiguration
}
