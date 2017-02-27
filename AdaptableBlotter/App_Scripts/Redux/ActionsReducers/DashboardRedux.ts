/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { DashboardState } from './interface/IState'
import { IDashboardControl } from '../../Core/Interface/IDashboardStrategy';

const CHANGE_DASHBOARD_CONTROL = 'CHANGE_DASHBOARD_CONTROL';

export interface ChangeDashboardControlAction extends Redux.Action {
    DashboardControl: IDashboardControl;
}

export const EditDashboardControl = (DashboardControl: IDashboardControl): ChangeDashboardControlAction => ({
    type: CHANGE_DASHBOARD_CONTROL,
    DashboardControl
})


const initialDashboardState: DashboardState = {
    DashboardControls: [
        { Name: "Advanced Search", IsVisible: true, IsCollapsed: false },
        { Name: "Quick Search", IsVisible: true, IsCollapsed: false },
        { Name: "Layout", IsVisible: true, IsCollapsed: false },
    ],
    DashboardButtons: []
}

export const DashboardReducer: Redux.Reducer<DashboardState> = (state: DashboardState = initialDashboardState, action: Redux.Action): DashboardState => {
    let index: number;
    let dashboardControls: IDashboardControl[]
    switch (action.type) {
        case CHANGE_DASHBOARD_CONTROL:
                let actionTypedChangeDashboardControl = <ChangeDashboardControlAction>action;
            dashboardControls = [].concat(state.DashboardControls);
            index = dashboardControls.findIndex(a => a.Name == actionTypedChangeDashboardControl.DashboardControl.Name)
            dashboardControls[index] = actionTypedChangeDashboardControl.DashboardControl;
            return Object.assign({}, state, { DashboardControls: dashboardControls });
        default:
            return state
    }
}