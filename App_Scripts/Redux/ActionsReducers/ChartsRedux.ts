import * as Redux from 'redux';
import { ChartsState } from './Interface/IState'

export const CHARTS_SHOW = 'CHARTS_SHOW';

export interface ChartsShowAction extends Redux.Action {
    Index: number,
   
}

export const ChartsShow = (Index: number): ChartsShowAction => ({
    type: CHARTS_SHOW,
    Index
})

const initialChartsState: ChartsState = {
    Charts: []
}

export const ChartsReducer: Redux.Reducer<ChartsState> = (state: ChartsState = initialChartsState, action: Redux.Action): ChartsState => {
   
    switch (action.type) {

        case CHARTS_SHOW: {
            let actionTyped = (<ChartsShowAction>action)
       //     Chartss = [].concat(state.Chartss)
       //     if (actionTyped.Index == -1) {
       //         Chartss.push(actionTyped.ChartsRule)
       //     } else {
        //        Chartss[actionTyped.Index] = actionTyped.ChartsRule
        //    }
            return Object.assign({}, state, { Charts: [] })
        }

           default:
            return state
    }
}