import * as Redux from 'redux';
import { DashboardState } from './interface/IState'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import * as StrategyIds from '../../Core/StrategyIds'

const DASHBOARD_CHANGE_COLLAPSE_STATE = 'DASHBOARD_CHANGE_COLLAPSE_STATE';
const DASHBOARD_CHANGE_VISIBILITY = 'DASHBOARD_CHANGE_VISIBILITY';
const DASHBOARD_MOVE_ITEM = 'DASHBOARD_MOVE_ITEM';
const DASHBOARD_CREATE_DEFAULT_CONFIGURATION_ITEM = 'DASHBOARD_CREATE_DEFAULT_CONFIGURATION_ITEM';
const DASHBOARD_SET_CONFIGURATION_ITEM = 'DASHBOARD_SET_CONFIGURATION_ITEM';

export interface DashboardChangeControlCollapseStateAction extends Redux.Action {
    StrategyId: string;
    IsCollapsed: boolean
}

export const ChangeCollapsedStateDashboardControl = (StrategyId: string, IsCollapsed: boolean): DashboardChangeControlCollapseStateAction => ({
    type: DASHBOARD_CHANGE_COLLAPSE_STATE,
    StrategyId,
    IsCollapsed
})

export interface DashboardChangeControlVisibilityAction extends Redux.Action {
    StrategyId: string;
    IsVisible: boolean
}

export const ChangeVisibilityDashboardControl = (StrategyId: string, IsVisible: boolean): DashboardChangeControlVisibilityAction => ({
    type: DASHBOARD_CHANGE_VISIBILITY,
    StrategyId,
    IsVisible
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
        //WARNING: 12/04/17 Currently if you add a new dashboard control, you need to add it at the end otherwise you'll need
        //to do Clean user data. That's because we currently Merge Arrays when loading state. so if you add the new item
        // in the middle you end up with it missing and a duplicate. Need WI 1764 and 1765 to be done
        //we need to use the Dashboard config from the loaded state only and as well get all the controls 
        //from the view factory in order to complete the list of items missing
        { Strategy: StrategyIds.FunctionsStrategyId, IsVisible: true, IsCollapsed: true },
        { Strategy: StrategyIds.DashboardShortcutsStrategyId, IsVisible: true, IsCollapsed: true, ControlConfiguration: ["Dashboard","Smart Edit", "Plus/Minus", "Conditional Style"] },
        { Strategy: StrategyIds.AdvancedSearchStrategyId, IsVisible: true, IsCollapsed: true },
        { Strategy: StrategyIds.QuickSearchStrategyId, IsVisible: true, IsCollapsed: true },
        { Strategy: StrategyIds.LayoutStrategyId, IsVisible: true, IsCollapsed: true },
        { Strategy: StrategyIds.FilterStrategyId, IsVisible: true, IsCollapsed: true },
        // taking out until I get the control to work properly   { Name: "SmartEdit", IsVisible: true, IsCollapsed: false },
    ]
}

export const DashboardReducer: Redux.Reducer<DashboardState> = (state: DashboardState = initialDashboardState, action: Redux.Action): DashboardState => {
    let index: number;
    let dashboardControls: IDashboardStrategyControlConfiguration[]
    let dashboardControl: IDashboardStrategyControlConfiguration

    switch (action.type) {
        case DASHBOARD_CHANGE_COLLAPSE_STATE: {
            let actionTypedCollapsed = <DashboardChangeControlCollapseStateAction>action;
            dashboardControls = [].concat(state.DashboardStrategyControls);
            index = dashboardControls.findIndex(a => a.Strategy == actionTypedCollapsed.StrategyId)
            dashboardControl = dashboardControls[index]
            dashboardControls[index] = Object.assign({}, dashboardControl, { IsCollapsed: actionTypedCollapsed.IsCollapsed })
            return Object.assign({}, state, { DashboardStrategyControls: dashboardControls });
        }
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
        case DASHBOARD_CREATE_DEFAULT_CONFIGURATION_ITEM: {
            let actionTyped = <DashboardCreateDefaultConfigurationItemAction>action;
            dashboardControls = [].concat(state.DashboardStrategyControls);
            dashboardControls.push({
                Strategy : actionTyped.StrategyId,
                IsCollapsed: true,
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