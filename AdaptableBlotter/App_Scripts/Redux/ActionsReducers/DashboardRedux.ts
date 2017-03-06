/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { DashboardState } from './interface/IState'
import { IDashboardControl } from '../../Core/Interface/IDashboardStrategy';

const DASHBOARD_CHANGE_COLLAPSE_STATE = 'DASHBOARD_CHANGE_COLLAPSE_STATE';
const DASHBOARD_CHANGE_VISIBILITY = 'DASHBOARD_CHANGE_VISIBILITY';

export interface DashboardChangeControlCollapseStateAction extends Redux.Action {
    ControlName: string;
    IsCollapsed: boolean
}

export const ChangeCollapsedStateDashboardControl = (ControlName: string, IsCollapsed: boolean): DashboardChangeControlCollapseStateAction => ({
    type: DASHBOARD_CHANGE_COLLAPSE_STATE,
    ControlName,
    IsCollapsed
})

export interface DashboardChangeControlVisibilityAction extends Redux.Action {
    ControlName: string;
    IsVisible: boolean
}

export const ChangeVisibilityDashboardControl = (ControlName: string, IsVisible: boolean): DashboardChangeControlVisibilityAction => ({
    type: DASHBOARD_CHANGE_VISIBILITY,
    ControlName,
    IsVisible
})


const initialDashboardState: DashboardState = {
    DashboardControls: [
        { Name: "Advanced Search", IsVisible: true, IsCollapsed: true },
        { Name: "Quick Search", IsVisible: true, IsCollapsed: true },
        { Name: "Layout", IsVisible: true, IsCollapsed: true },
     // taking out until I get the control to work properly   { Name: "SmartEdit", IsVisible: true, IsCollapsed: false },
    ],
    DashboardButtons: []
}

export const DashboardReducer: Redux.Reducer<DashboardState> = (state: DashboardState = initialDashboardState, action: Redux.Action): DashboardState => {
    let index: number;
    let dashboardControls: IDashboardControl[]
    let dashboardControl: IDashboardControl

    switch (action.type) {
        case DASHBOARD_CHANGE_COLLAPSE_STATE:
            let actionTypedCollapsed = <DashboardChangeControlCollapseStateAction>action;
            dashboardControls = [].concat(state.DashboardControls);
            index = dashboardControls.findIndex(a => a.Name == actionTypedCollapsed.ControlName)
            dashboardControl = dashboardControls[index]
            dashboardControls[index] = Object.assign({}, dashboardControl, { IsCollapsed: actionTypedCollapsed.IsCollapsed })
            return Object.assign({}, state, { DashboardControls: dashboardControls });
        case DASHBOARD_CHANGE_VISIBILITY:
            let actionTypedVisibility = <DashboardChangeControlVisibilityAction>action;
            dashboardControls = [].concat(state.DashboardControls);
            index = dashboardControls.findIndex(a => a.Name == actionTypedVisibility.ControlName)
            dashboardControl = dashboardControls[index]
            dashboardControls[index] = Object.assign({}, dashboardControl, { IsVisible: actionTypedVisibility.IsVisible })
            return Object.assign({}, state, { DashboardControls: dashboardControls });
        default:
            return state
    }
}