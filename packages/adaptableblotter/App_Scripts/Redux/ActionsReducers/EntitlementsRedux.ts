import { EntitlementsState } from './Interface/IState';
import * as Redux from 'redux'
import { IEntitlement } from '../../api/Interface/Interfaces';

export const ENTITLEMENT_ADD_UPDATE = 'ENTITLEMENT_ADD_UPDATE';
export const ENTITLEMENT_DELETE = 'ENTITLEMENT_DELETE';


export interface EntitlementAddUpdateAction extends Redux.Action {
    Index: number
    Entitlement: IEntitlement
}

export interface EntitlementDeleteAction extends Redux.Action {
    FunctionName: string
}

export const EntitlementAddUpdate = (Index: number, Entitlement: IEntitlement): EntitlementAddUpdateAction => ({
    type: ENTITLEMENT_ADD_UPDATE,
    Index,
    Entitlement
})

export const EntitlementDelete = (FunctionName: string): EntitlementDeleteAction => ({
    type: ENTITLEMENT_DELETE,
    FunctionName
})

const initialEntitlementsState: EntitlementsState = {
    FunctionEntitlements: []
}

export const EntitlementsReducer: Redux.Reducer<EntitlementsState> = (state: EntitlementsState = initialEntitlementsState, action: Redux.Action): EntitlementsState => {
    let index: number;
    let functionEntitlements: IEntitlement[]

    switch (action.type) {
        case ENTITLEMENT_ADD_UPDATE:
            let actionTypedAddUpdate = (<EntitlementAddUpdateAction>action)
            functionEntitlements = [].concat(state.FunctionEntitlements)
            if (actionTypedAddUpdate.Index != -1) {  // it exists
                functionEntitlements[actionTypedAddUpdate.Index] = actionTypedAddUpdate.Entitlement
            } else {
                functionEntitlements.push(actionTypedAddUpdate.Entitlement)
            }
            return Object.assign({}, state, { FunctionEntitlements: functionEntitlements })
        case ENTITLEMENT_DELETE:
            let actionTypedDelete = (<EntitlementDeleteAction>action)
            functionEntitlements = [].concat(state.FunctionEntitlements)
            index = functionEntitlements.findIndex(a => a.FunctionName == actionTypedDelete.FunctionName)
            functionEntitlements.splice(index, 1);
            return Object.assign({}, state, { FunctionEntitlements: functionEntitlements })


        default:
            return state
    }
}