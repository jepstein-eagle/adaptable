import * as Redux from 'redux';
import { DashboardState } from './Interface/IState'
import { Helper } from '../../Core/Helpers/Helper';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'

const DASHBOARD_CHANGE_CONTROL_VISIBILITY = 'DASHBOARD_CHANGE_CONTROL_VISIBILITY';
const DASHBOARD_MOVE_ITEM = 'DASHBOARD_MOVE_ITEM';
const DASHBOARD_SET_FUNCTION_BUTTONS_ITEM = 'DASHBOARD_SET_FUNCTION_BUTTONS_ITEM';
const DASHBOARD_SET_ZOOM = 'DASHBOARD_SET_ZOOM';
const DASHBOARD_SET_IS_MINIMISED = 'DASHBOARD_SET_IS_MINIMISED';

export interface DashboardChangeControlVisibilityAction extends Redux.Action {
    StrategyId: string;
}

export interface DashboardMoveItemAction extends Redux.Action {
    StrategyId: string;
    NewIndex: number
}

export interface DashboardCreateDefaultConfigurationItemAction extends Redux.Action {
    StrategyId: string;
}

export interface DashboardSetFunctionButtonsAction extends Redux.Action {
    StrategyIds: string[];
}

export interface DashboardSetZoomAction extends Redux.Action {
    Zoom: Number
}

export interface DashboardSetIsMinimisedAction extends Redux.Action {
    IsMinimised: boolean
}

export const ChangeVisibilityDashboardControl = (StrategyId: string): DashboardChangeControlVisibilityAction => ({
    type: DASHBOARD_CHANGE_CONTROL_VISIBILITY,
    StrategyId
})

export const DashboardMoveItem = (StrategyId: string, NewIndex: number): DashboardMoveItemAction => ({
    type: DASHBOARD_MOVE_ITEM,
    StrategyId,
    NewIndex
})

export const DashboardSetFunctionButtons = (StrategyIds: string[]): DashboardSetFunctionButtonsAction => ({
    type: DASHBOARD_SET_FUNCTION_BUTTONS_ITEM,
    StrategyIds,

})

export const DashboardSetZoom = (Zoom: Number): DashboardSetZoomAction => ({
    type: DASHBOARD_SET_ZOOM,
    Zoom
})

export const DashboardSetIsMinimised = (IsMinimised: boolean): DashboardSetIsMinimisedAction => ({
    type: DASHBOARD_SET_IS_MINIMISED,
    IsMinimised
})

const initialDashboardState: DashboardState = {
    FunctionToolbars: [StrategyIds.AdvancedSearchStrategyId, StrategyIds.QuickSearchStrategyId, StrategyIds.LayoutStrategyId, StrategyIds.ExportStrategyId, StrategyIds.ColumnFilterStrategyId],
    FunctionButtons: [StrategyNames.AboutStrategyName, StrategyNames.DashboardStrategyName, StrategyNames.SmartEditStrategyName, StrategyNames.ColumnChooserStrategyName, StrategyNames.ConditionalStyleStrategyName, StrategyNames.TeamSharingStrategyName],
    Zoom: 1,
    IsMinimised: false
}

export const DashboardReducer: Redux.Reducer<DashboardState> = (state: DashboardState = initialDashboardState, action: Redux.Action): DashboardState => {
    let index: number;
    let dashboardControls: string[]
    let dashboardControl: string

    switch (action.type) {
        case DASHBOARD_CHANGE_CONTROL_VISIBILITY: {
            let actionTypedVisibility = <DashboardChangeControlVisibilityAction>action;
            dashboardControls = [].concat(state.FunctionToolbars);
            index = dashboardControls.findIndex(a => a == actionTypedVisibility.StrategyId)

            if (index < 0) {  // doesnt exist so add it
                dashboardControls.push(actionTypedVisibility.StrategyId)
            } else {  // exists so delete it
                dashboardControls.splice(index, 1)
            }
            return Object.assign({}, state, { FunctionToolbars: dashboardControls });
        }
        case DASHBOARD_MOVE_ITEM: {
            let actionTyped = <DashboardMoveItemAction>action;
            dashboardControls = [].concat(state.FunctionToolbars);
            index = dashboardControls.findIndex(a => a == actionTyped.StrategyId)
            Helper.moveArray(dashboardControls, index, actionTyped.NewIndex)
            return Object.assign({}, state, { FunctionToolbars: dashboardControls });
        }
        case DASHBOARD_SET_FUNCTION_BUTTONS_ITEM: {
            let actionTyped = <DashboardSetFunctionButtonsAction>action;
            let dashboardFunctionButtons = actionTyped.StrategyIds
              return Object.assign({}, state, { FunctionButtons: dashboardFunctionButtons });
        }
        case DASHBOARD_SET_ZOOM: {
            let actionTyped = <DashboardSetZoomAction>action;
            return Object.assign({}, state, { Zoom: actionTyped.Zoom });
        }
        case DASHBOARD_SET_IS_MINIMISED: {
            let actionTyped = <DashboardSetIsMinimisedAction>action;
            return Object.assign({}, state, { IsMinimised: actionTyped.IsMinimised });
        }
        default:
            return state
    }
}