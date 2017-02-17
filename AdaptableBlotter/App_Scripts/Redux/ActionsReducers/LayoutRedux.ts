/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { LayoutState } from './interface/IState'
import { ILayout } from '../../Core/interface/ILayoutStrategy';

const LOAD_LAYOUT = 'LOAD_LAYOUT';
const SAVE_LAYOUT = 'SAVE_LAYOUT';

export interface LoadLayoutAction extends Redux.Action {
    LayoutName: string;
}

export const LoadLayout = (LayoutName: string): LoadLayoutAction => ({
    type: LOAD_LAYOUT,
    LayoutName
})

export interface SaveLayoutAction extends Redux.Action {
    Layout: ILayout;
}

export const SaveLayout = (Layout: ILayout): SaveLayoutAction => ({
    type: SAVE_LAYOUT,
    Layout
})

const initialLayoutState: LayoutState = {
    CurrentLayout: "",
    AvailableLayouts: [],
}

export const LayoutReducer: Redux.Reducer<LayoutState> = (state: LayoutState = initialLayoutState, action: Redux.Action): LayoutState => {
    switch (action.type) {
        case LOAD_LAYOUT:
            return Object.assign({}, state, { CurrentLayout: (<LoadLayoutAction>action).LayoutName })
        case SAVE_LAYOUT:
            let newLayout = (<SaveLayoutAction>action).Layout
            var items: Array<ILayout> = [].concat(state.AvailableLayouts);
            items.push(newLayout);
            return Object.assign({}, state, { CurrentLayout: newLayout.Name, AvailableLayouts: items });
        default:
            return state
    }
}