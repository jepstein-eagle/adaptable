import * as Redux from 'redux';
import { PercentBarState } from './Interface/IState'
import { IPercentBar } from '../../Api/Interface/IAdaptableBlotterObjects';

export const PERCENT_BAR_ADD = 'PERCENT_BAR_ADD';
export const PERCENT_BAR_EDIT = 'PERCENT_BAR_EDIT';
export const PERCENT_BAR_DELETE = 'PERCENT_BAR_DELETE';
export const PERCENT_BAR_CHANGE_MINIMUM_VALUE = 'PERCENT_BAR_CHANGE_MINIMUM_VALUE';
export const PERCENT_BAR_CHANGE_MAXIMUM_VALUE = 'PERCENT_BAR_CHANGE_MAXIMUM_VALUE';
export const PERCENT_BAR_CHANGE_POSITIVE_COLOR = 'PERCENT_BAR_CHANGE_POSITIVE_COLOR';
export const PERCENT_BAR_CHANGE_NEGATIVE_COLOR = 'PERCENT_BAR_CHANGE_NEGATIVE_COLOR';

export interface PercentBarAddAction extends Redux.Action {
    PercentBar: IPercentBar
}

export interface PercentBarEditAction extends Redux.Action {
    Index: number,
    PercentBar: IPercentBar
}

export interface PercentBarDeleteAction extends Redux.Action {
    Index: number,
}

export interface PercentBarChangeMinimumValueAction extends Redux.Action {
    PercentBar: IPercentBar,
    MinimumValue: number
}

export interface PercentBarChangeMaximumValueAction extends Redux.Action {
    PercentBar: IPercentBar,
    MaximumValue: number
}


export interface PercentBarChangePositiveColorAction extends Redux.Action {
    PercentBar: IPercentBar,
    PositiveColor: string
}

export interface PercentBarChangeNegativeColorAction extends Redux.Action {
    PercentBar: IPercentBar,
    NegativeColor: string
}

export const PercentBarAdd = (PercentBar: IPercentBar): PercentBarAddAction => ({
    type: PERCENT_BAR_ADD,
    PercentBar
})

export const PercentBarEdit = (Index: number, PercentBar: IPercentBar): PercentBarEditAction => ({
    type: PERCENT_BAR_EDIT,
    Index,
    PercentBar
})

export const PercentBarDelete = (Index: number): PercentBarDeleteAction => ({
    type: PERCENT_BAR_DELETE,
    Index,
})

export const PercentBarChangeMinimumValue = (PercentBar: IPercentBar, MinimumValue: number): PercentBarChangeMinimumValueAction => ({
    type: PERCENT_BAR_CHANGE_MINIMUM_VALUE,
    PercentBar,
    MinimumValue
})

export const PercentBarChangeMaximumValue = (PercentBar: IPercentBar, MaximumValue: number): PercentBarChangeMaximumValueAction => ({
    type: PERCENT_BAR_CHANGE_MAXIMUM_VALUE,
    PercentBar,
    MaximumValue
})

export const PercentBarChangePositiveColor = (PercentBar: IPercentBar, PositiveColor: string): PercentBarChangePositiveColorAction => ({
    type: PERCENT_BAR_CHANGE_POSITIVE_COLOR,
    PercentBar,
    PositiveColor
})

export const PercentBarChangeNegativeColor = (PercentBar: IPercentBar, NegativeColor: string): PercentBarChangeNegativeColorAction => ({
    type: PERCENT_BAR_CHANGE_NEGATIVE_COLOR,
    PercentBar,
    NegativeColor
})

const initialPercentBarState: PercentBarState = {
    PercentBars: []
}

export const PercentBarReducer: Redux.Reducer<PercentBarState> = (state: PercentBarState = initialPercentBarState, action: Redux.Action): PercentBarState => {
    let PercentBars: IPercentBar[]

    switch (action.type) {

        case PERCENT_BAR_ADD: {
            let actionTyped = (<PercentBarAddAction>action)
            PercentBars = [].concat(state.PercentBars)
            PercentBars.push(actionTyped.PercentBar)
            return Object.assign({}, state, { PercentBars: PercentBars })
        }

        case PERCENT_BAR_EDIT: {
            let actionTyped = (<PercentBarEditAction>action)
            PercentBars = [].concat(state.PercentBars)
            PercentBars[actionTyped.Index] = actionTyped.PercentBar
            return Object.assign({}, state, { PercentBars: PercentBars })
        }

        case PERCENT_BAR_DELETE: {
            PercentBars = [].concat(state.PercentBars)
            PercentBars.splice((<PercentBarDeleteAction>action).Index, 1)
            return Object.assign({}, state, { PercentBars: PercentBars })
        }

        case PERCENT_BAR_CHANGE_MINIMUM_VALUE: {
            let actionTyped = <PercentBarChangeMinimumValueAction>action
            let PercentBar = actionTyped.PercentBar
            let items: Array<IPercentBar> = [].concat(state.PercentBars);
            let index = items.findIndex(i => i.ColumnId == PercentBar.ColumnId)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, PercentBar, { MinValue: actionTyped.MinimumValue })
            } else {
                items.push(Object.assign({}, PercentBar, { MinValue: actionTyped.MinimumValue }));
            }
            return Object.assign({}, state, {
                PercentBars: items
            });
        }

        case PERCENT_BAR_CHANGE_MAXIMUM_VALUE: {
            let actionTyped = <PercentBarChangeMaximumValueAction>action
            let PercentBar = actionTyped.PercentBar
            let items: Array<IPercentBar> = [].concat(state.PercentBars);
            let index = items.findIndex(i => i.ColumnId == PercentBar.ColumnId)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, PercentBar, { MaxValue: actionTyped.MaximumValue })
            } else {
                items.push(Object.assign({}, PercentBar, { MaxValue: actionTyped.MaximumValue }));
            }
            return Object.assign({}, state, {
                PercentBars: items
            });
        }

        case PERCENT_BAR_CHANGE_POSITIVE_COLOR: {
            let actionTyped = <PercentBarChangePositiveColorAction>action
            let PercentBar = actionTyped.PercentBar
            let items: Array<IPercentBar> = [].concat(state.PercentBars);
            let index = items.findIndex(i => i == PercentBar)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, PercentBar, { PositiveColor: actionTyped.PositiveColor })
            } else {
                items.push(Object.assign({}, PercentBar, { PositiveColor: actionTyped.PositiveColor }));
            }
            return Object.assign({}, state, {
                PercentBars: items
            });
        }

        case PERCENT_BAR_CHANGE_NEGATIVE_COLOR: {
            let actionTyped = <PercentBarChangeNegativeColorAction>action
            let PercentBar = actionTyped.PercentBar
            let items: Array<IPercentBar> = [].concat(state.PercentBars);
            let index = items.findIndex(i => i == PercentBar)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, PercentBar, { NegativeColor: actionTyped.NegativeColor })
            } else {
                items.push(Object.assign({}, PercentBar, { NegativeColor: actionTyped.NegativeColor }));
            }
            return Object.assign({}, state, {
                PercentBars: items
            });
        }

        default:
            return state
    }
}