import { EntitlementsState } from './Interface/IState';
import * as Redux from 'redux'
import { IEntitlement } from '../../Api/Interface/Interfaces';

export const ENTITLEMENT_ADD = 'ENTITLEMENT_ADD';
export const ENTITLEMENT_UPDATE = 'ENTITLEMENT_UPDATE';
export const ENTITLEMENT_DELETE = 'ENTITLEMENT_DELETE';


export interface EntitlementAddAction extends Redux.Action {
    Entitlement: IEntitlement
}

export interface EntitlementUpdateAction extends Redux.Action {
    Entitlement: IEntitlement
}

export interface EntitlementDeleteAction extends Redux.Action {
    FunctionName: string
}

export const EntitlementAdd = (Entitlement: IEntitlement): EntitlementAddAction => ({
    type: ENTITLEMENT_ADD,
    Entitlement
})

export const EntitlementUpdate = (Entitlement: IEntitlement): EntitlementUpdateAction => ({
    type: ENTITLEMENT_UPDATE,
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
        case ENTITLEMENT_ADD:
            let actionTypedAdd = (<EntitlementAddAction>action)
            functionEntitlements = [].concat(state.FunctionEntitlements)
            functionEntitlements.push(actionTypedAdd.Entitlement);
            return Object.assign({}, state, { FunctionEntitlements: functionEntitlements })
        case ENTITLEMENT_UPDATE:
            let actionTypedUpdate = (<EntitlementUpdateAction>action)
            functionEntitlements = [].concat(state.FunctionEntitlements)
            index = functionEntitlements.findIndex(fe => fe.FunctionName == actionTypedUpdate.Entitlement.FunctionName)
            functionEntitlements[index] = actionTypedUpdate.Entitlement;
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