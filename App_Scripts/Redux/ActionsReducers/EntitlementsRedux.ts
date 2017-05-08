import {EntitlementsState} from './Interface/IState';
import * as Redux from 'redux'

const initialEntitlementsState: EntitlementsState = {
    FunctionEntitlements: []
}

export const EntitlementsReducer: Redux.Reducer<EntitlementsState> = (state: EntitlementsState = initialEntitlementsState, action: Redux.Action): EntitlementsState => {
    switch (action.type) {
        default:
            return state
    }
}