import * as Redux from 'redux';
import { DashboardState } from './Interface/IState'
import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helpers/Helper';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'

const DASHBOARD_CHANGE_CONTROL_VISIBILITY = 'DASHBOARD_CHANGE_CONTROL_VISIBILITY';
const DASHBOARD_MOVE_ITEM = 'DASHBOARD_MOVE_ITEM';
const DASHBOARD_CREATE_DEFAULT_CONFIGURATION_ITEM = 'DASHBOARD_CREATE_DEFAULT_CONFIGURATION_ITEM';
const DASHBOARD_SET_CONFIGURATION_ITEM = 'DASHBOARD_SET_CONFIGURATION_ITEM';
const DASHBOARD_SET_ZOOM = 'DASHBOARD_SET_ZOOM';

export interface DashboardChangeControlVisibilityAction extends Redux.Action {
    StrategyId: string;
    IsVisible: boolean
}

export interface DashboardMoveItemAction extends Redux.Action {
    StrategyId: string;
    NewIndex: number
}

export interface DashboardCreateDefaultConfigurationItemAction extends Redux.Action {
    StrategyId: string;
}

export interface DashboardSetConfigurationItemAction extends Redux.Action {
    StrategyId: string;
    NewConfig : any
}

export interface DashboardSetZoomAction extends Redux.Action {
    Zoom: Number
}

export const ChangeVisibilityDashboardControl = (StrategyId: string, IsVisible: boolean): DashboardChangeControlVisibilityAction => ({
    type: DASHBOARD_CHANGE_CONTROL_VISIBILITY,
    StrategyId,
    IsVisible
})

export const DashboardMoveItem = (StrategyId: string, NewIndex: number): DashboardMoveItemAction => ({
    type: DASHBOARD_MOVE_ITEM,
    StrategyId,
    NewIndex
})

export const DashboardCreateDefaultConfigurationItem = (StrategyId: string): DashboardCreateDefaultConfigurationItemAction => ({
    type: DASHBOARD_CREATE_DEFAULT_CONFIGURATION_ITEM,
    StrategyId
})

export const DashboardSetConfigurationItem = (StrategyId: string, NewConfig: any): DashboardSetConfigurationItemAction => ({
    type: DASHBOARD_SET_CONFIGURATION_ITEM,
    StrategyId,
    NewConfig
})

export const DashboardSetZoom = (Zoom: Number): DashboardSetZoomAction => ({
    type: DASHBOARD_SET_ZOOM,
    Zoom
})

const initialDashboardState: DashboardState = {
    DashboardStrategyControls: [
        { Strategy: StrategyIds.HomeStrategyId, IsVisible: true, 
            ControlConfiguration: [StrategyNames.DashboardStrategyName,StrategyNames.SmartEditStrategyName, StrategyNames.PlusMinusStrategyName, StrategyNames.ConditionalStyleStrategyName] },
        { Strategy: StrategyIds.AdvancedSearchStrategyId, IsVisible: true },
        { Strategy: StrategyIds.QuickSearchStrategyId, IsVisible: true },
        { Strategy: StrategyIds.LayoutStrategyId, IsVisible: true },
        { Strategy: StrategyIds.ExportStrategyId, IsVisible: true },
        { Strategy: StrategyIds.ColumnFilterStrategyId, IsVisible: true },
      ],
    DashboardZoom : 1
}

export const DashboardReducer: Redux.Reducer<DashboardState> = (state: DashboardState = initialDashboardState, action: Redux.Action): DashboardState => {
    let index: number;
    let dashboardControls: IDashboardStrategyControlConfiguration[]
    let dashboardControl: IDashboardStrategyControlConfiguration

    switch (action.type) {
        case DASHBOARD_CHANGE_CONTROL_VISIBILITY: {
            let actionTypedVisibility = <DashboardChangeControlVisibilityAction>action;
            dashboardControls = [].concat(state.DashboardStrategyControls);
            index = dashboardControls.findIndex(a => a.Strategy == actionTypedVisibility.StrategyId)
            dashboardControl = dashboardControls[index]
            dashboardControls[index] = Object.assign({}, dashboardControl, { IsVisible: actionTypedVisibility.IsVisible })
            return Object.assign({}, state, { DashboardStrategyControls: dashboardControls });
        }
        case DASHBOARD_MOVE_ITEM: {
            let actionTyped = <DashboardMoveItemAction>action;
            dashboardControls = [].concat(state.DashboardStrategyControls);
            index = dashboardControls.findIndex(a => a.Strategy == actionTyped.StrategyId)
            Helper.moveArray(dashboardControls, index, actionTyped.NewIndex)
            return Object.assign({}, state, { DashboardStrategyControls: dashboardControls });
        }
         case DASHBOARD_CREATE_DEFAULT_CONFIGURATION_ITEM: {
            let actionTyped = <DashboardCreateDefaultConfigurationItemAction>action;
            dashboardControls = [].concat(state.DashboardStrategyControls);
            dashboardControls.push({
                Strategy : actionTyped.StrategyId,
                IsVisible: false 
            })
            return Object.assign({}, state, { DashboardStrategyControls: dashboardControls });
        }
        case DASHBOARD_SET_CONFIGURATION_ITEM: {
            let actionTyped = <DashboardSetConfigurationItemAction>action;
            dashboardControls = [].concat(state.DashboardStrategyControls);
            index = dashboardControls.findIndex(a => a.Strategy == actionTyped.StrategyId)
            dashboardControl = dashboardControls[index]
            dashboardControls[index] = Object.assign({}, dashboardControl, { ControlConfiguration: actionTyped.NewConfig })
            return Object.assign({}, state, { DashboardStrategyControls: dashboardControls });
        }
        case DASHBOARD_SET_ZOOM: {
            let actionTyped = <DashboardSetZoomAction>action;
            return Object.assign({}, state, { DashboardZoom: actionTyped.Zoom });
        }
        default:
            return state
    }
}