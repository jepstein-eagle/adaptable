import * as Redux from 'redux';
import { DashboardState } from './Interface/IState'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import * as StrategyIds from '../../Core/StrategyIds'

const DASHBOARD_CHANGE_VISIBILITY = 'DASHBOARD_CHANGE_VISIBILITY';
const DASHBOARD_MOVE_ITEM = 'DASHBOARD_MOVE_ITEM';
const DASHBOARD_CREATE_DEFAULT_CONFIGURATION_ITEM = 'DASHBOARD_CREATE_DEFAULT_CONFIGURATION_ITEM';
const DASHBOARD_SET_CONFIGURATION_ITEM = 'DASHBOARD_SET_CONFIGURATION_ITEM';
const DASHBOARD_SET_ZOOM = 'DASHBOARD_SET_ZOOM';

export interface DashboardChangeControlVisibilityAction extends Redux.Action {
    StrategyId: string;
    IsVisible: boolean
}

export const ChangeVisibilityDashboardControl = (StrategyId: string, IsVisible: boolean): DashboardChangeControlVisibilityAction => ({
    type: DASHBOARD_CHANGE_VISIBILITY,
    StrategyId,
    IsVisible
})

export interface DashboardSetZoomAction extends Redux.Action {
    Zoom: Number
}

export const DashboardSetZoom = (Zoom: Number): DashboardSetZoomAction => ({
    type: DASHBOARD_SET_ZOOM,
    Zoom
})

export interface DashboardMoveItemAction extends Redux.Action {
    StrategyId: string;
    NewIndex: number
}

export const DashboardMoveItem = (StrategyId: string, NewIndex: number): DashboardMoveItemAction => ({
    type: DASHBOARD_MOVE_ITEM,
    StrategyId,
    NewIndex
})

export interface DashboardCreateDefaultConfigurationItemAction extends Redux.Action {
    StrategyId: string;
}

export const DashboardCreateDefaultConfigurationItem = (StrategyId: string): DashboardCreateDefaultConfigurationItemAction => ({
    type: DASHBOARD_CREATE_DEFAULT_CONFIGURATION_ITEM,
    StrategyId
})

export interface DashboardSetConfigurationItemAction extends Redux.Action {
    StrategyId: string;
    NewConfig : any
}

export const DashboardSetConfigurationItem = (StrategyId: string, NewConfig: any): DashboardSetConfigurationItemAction => ({
    type: DASHBOARD_SET_CONFIGURATION_ITEM,
    StrategyId,
    NewConfig
})

const initialDashboardState: DashboardState = {
    DashboardStrategyControls: [
        { Strategy: StrategyIds.FunctionsStrategyId, IsVisible: true },
        { Strategy: StrategyIds.DashboardShortcutsStrategyId, IsVisible: true, ControlConfiguration: ["Dashboard","Smart Edit", "Plus/Minus", "Conditional Style"] },
        { Strategy: StrategyIds.AdvancedSearchStrategyId, IsVisible: true },
        { Strategy: StrategyIds.QuickSearchStrategyId, IsVisible: true },
        { Strategy: StrategyIds.LayoutStrategyId, IsVisible: true },
        { Strategy: StrategyIds.FilterStrategyId, IsVisible: true },
        { Strategy: StrategyIds.ExportStrategyId, IsVisible: true },
        // taking out until I get the control to work properly   { Name: "SmartEdit", IsVisible: true, IsCollapsed: false },
    ],
    DashboardZoom : 1
}

export const DashboardReducer: Redux.Reducer<DashboardState> = (state: DashboardState = initialDashboardState, action: Redux.Action): DashboardState => {
    let index: number;
    let dashboardControls: IDashboardStrategyControlConfiguration[]
    let dashboardControl: IDashboardStrategyControlConfiguration

    switch (action.type) {
        case DASHBOARD_CHANGE_VISIBILITY: {
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
        case DASHBOARD_SET_ZOOM: {
            let actionTyped = <DashboardSetZoomAction>action;
            return Object.assign({}, state, { DashboardZoom: actionTyped.Zoom });
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
        default:
            return state
    }
}