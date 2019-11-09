import { EntitlementsState, Entitlement } from '../../PredefinedConfig/EntitlementsState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const ENTITLEMENT_ADD = 'ENTITLEMENT_ADD';
export const ENTITLEMENT_UPDATE = 'ENTITLEMENT_UPDATE';
export const ENTITLEMENT_DELETE = 'ENTITLEMENT_DELETE';

export interface EntitlementAddAction extends Redux.Action {
  Entitlement: Entitlement;
}

export interface EntitlementUpdateAction extends Redux.Action {
  Entitlement: Entitlement;
}

export interface EntitlementDeleteAction extends Redux.Action {
  FunctionName: string;
}

export const EntitlementAdd = (Entitlement: Entitlement): EntitlementAddAction => ({
  type: ENTITLEMENT_ADD,
  Entitlement,
});

export const EntitlementUpdate = (Entitlement: Entitlement): EntitlementUpdateAction => ({
  type: ENTITLEMENT_UPDATE,
  Entitlement,
});

export const EntitlementDelete = (FunctionName: string): EntitlementDeleteAction => ({
  type: ENTITLEMENT_DELETE,
  FunctionName,
});

const initialEntitlementsState: EntitlementsState = {
  FunctionEntitlements: EMPTY_ARRAY,
};

export const EntitlementsReducer: Redux.Reducer<EntitlementsState> = (
  state: EntitlementsState = initialEntitlementsState,
  action: Redux.Action
): EntitlementsState => {
  let index: number;
  let functionEntitlements: Entitlement[];

  switch (action.type) {
    case ENTITLEMENT_ADD:
      const actionTypedAdd = action as EntitlementAddAction;
      functionEntitlements = [].concat(state.FunctionEntitlements);
      functionEntitlements.push(actionTypedAdd.Entitlement);
      return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
    case ENTITLEMENT_UPDATE:
      const actionTypedUpdate = action as EntitlementUpdateAction;
      functionEntitlements = [].concat(state.FunctionEntitlements);
      index = functionEntitlements.findIndex(
        fe => fe.FunctionName == actionTypedUpdate.Entitlement.FunctionName
      );
      functionEntitlements[index] = actionTypedUpdate.Entitlement;
      return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
    case ENTITLEMENT_DELETE:
      const actionTypedDelete = action as EntitlementDeleteAction;
      functionEntitlements = [].concat(state.FunctionEntitlements);
      index = functionEntitlements.findIndex(a => a.FunctionName == actionTypedDelete.FunctionName);
      functionEntitlements.splice(index, 1);
      return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
    default:
      return state;
  }
};
