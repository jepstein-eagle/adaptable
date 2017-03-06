/// <reference path="../../../typings/index.d.ts" />
import {EntitlementsState} from './Interface/IState';

const initialEntitlementsState: EntitlementsState = {
    FunctionEntitlements: []
}

export const EntitlementsReducer: Redux.Reducer<EntitlementsState> = (state: EntitlementsState = initialEntitlementsState, action: Redux.Action): EntitlementsState => {
    switch (action.type) {
        default:
            return state
    }
}