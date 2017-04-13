/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { DashboardState } from './interface/IState'
import { IDashboardStrategyControl } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import * as StrategyIds from '../../Core/StrategyIds'

const DASHBOARD_CHANGE_COLLAPSE_STATE = 'DASHBOARD_CHANGE_COLLAPSE_STATE';
const DASHBOARD_CHANGE_VISIBILITY = 'DASHBOARD_CHANGE_VISIBILITY';
const DASHBOARD_MOVE_ITEM = 'DASHBOARD_MOVE_ITEM';

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

const initialDashboardState: DashboardState = {
    DashboardStrategyControls: [
        //I keep the property Name insttead of Strategy as we are not yet able to migrate reduc state version
        //But the content of the Name needs to be a strategy Id
        { Strategy: StrategyIds.FunctionsStrategyId, IsVisible: true, IsCollapsed: true },
        { Strategy: StrategyIds.AdvancedSearchStrategyId, IsVisible: true, IsCollapsed: true },
        { Strategy: StrategyIds.QuickSearchStrategyId, IsVisible: true, IsCollapsed: true },
        { Strategy: StrategyIds.LayoutStrategyId, IsVisible: true, IsCollapsed: true },
        { Strategy: StrategyIds.DashboardShortcutsStrategyId, IsVisible: true, IsCollapsed: true },
        // taking out until I get the control to work properly   { Name: "SmartEdit", IsVisible: true, IsCollapsed: false },
    ],
    DashboardButtons: []
}

export const DashboardReducer: Redux.Reducer<DashboardState> = (state: DashboardState = initialDashboardState, action: Redux.Action): DashboardState => {
    let index: number;
    let dashboardControls: IDashboardStrategyControl[]
    let dashboardControl: IDashboardStrategyControl

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
        default:
            return state
    }
}