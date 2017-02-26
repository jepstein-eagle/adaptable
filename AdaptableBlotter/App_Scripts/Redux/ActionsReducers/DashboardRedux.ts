/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { DashboardState } from './interface/IState'
import { IDashboardControl } from '../../Core/Interface/IDashboardStrategy';

const CHANGE_CONTROL_VISIBILITY = 'CHANGE_CONTROL_VISIBILITY';

export interface ChangeControlVisibilityAction extends Redux.Action {
    DashboardControl: IDashboardControl;
}

export const ChangeControlVisibility = (DashboardControl: IDashboardControl): ChangeControlVisibilityAction => ({
    type: CHANGE_CONTROL_VISIBILITY,
    DashboardControl
})

const initialDashboardState: DashboardState = {
    DashboardControls: [
        { Name: "Advanced Search", IsVisible: true },
        { Name: "Quick Search", IsVisible: true },
        { Name: "Layout", IsVisible: true },
    ],
    DashboardButtons: []
}

export const DashboardReducer: Redux.Reducer<DashboardState> = (state: DashboardState = initialDashboardState, action: Redux.Action): DashboardState => {
    let index: number;
    let dashboardControls: IDashboardControl[]
    switch (action.type) {
        case CHANGE_CONTROL_VISIBILITY:
            let actionTypedChangeControlVisibility = <ChangeControlVisibilityAction>action;
            dashboardControls = [].concat(state.DashboardControls);
            index = dashboardControls.findIndex(a => a.Name == actionTypedChangeControlVisibility.DashboardControl.Name)
            dashboardControls[index] = actionTypedChangeControlVisibility.DashboardControl;
            return Object.assign({}, state, { DashboardControls: dashboardControls });
        default:
            return state
    }
}