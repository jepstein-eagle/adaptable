import { TeamSharingState, SharedEntity } from '../../PredefinedConfig/TeamSharingState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const TEAMSHARING_FETCH = 'TEAMSHARING_FETCH';
export const TEAMSHARING_SET = 'TEAMSHARING_SET';
export const TEAMSHARING_SHARE = 'TEAMSHARING_SHARE';
export const TEAMSHARING_IMPORT_ITEM = 'TEAMSHARING_IMPORT_ITEM';
export const TEAMSHARING_REMOVE_ITEM = 'TEAMSHARING_REMOVE_ITEM';

export interface TeamSharingShareAction extends Redux.Action {
  Entity: AdaptableObject;
  FunctionName: AdaptableFunctionName;
}

export interface TeamSharingSetAction extends Redux.Action {
  Entities: SharedEntity[];
}

export interface TeamSharingImportItemAction extends Redux.Action {
  Entity: AdaptableObject;
  FunctionName: AdaptableFunctionName;
}

export interface TeamSharingRemoveItemAction extends Redux.Action {
  Uuid: string;
}

export interface TeamSharingGetAction extends Redux.Action {}

export const TeamSharingShare = (
  Entity: AdaptableObject,
  FunctionName: AdaptableFunctionName
): TeamSharingShareAction => ({
  type: TEAMSHARING_SHARE,
  Entity,
  FunctionName,
});

export const TeamSharingSet = (Entities: SharedEntity[]): TeamSharingSetAction => ({
  type: TEAMSHARING_SET,
  Entities,
});

export const TeamSharingImportItem = (
  Entity: AdaptableObject,
  FunctionName: AdaptableFunctionName
): TeamSharingImportItemAction => ({
  type: TEAMSHARING_IMPORT_ITEM,
  Entity,
  FunctionName,
});

export const TeamSharingRemoveItem = (Uuid: string): TeamSharingRemoveItemAction => ({
  type: TEAMSHARING_REMOVE_ITEM,
  Uuid,
});

export const TeamSharingFetch = (): TeamSharingGetAction => ({
  type: TEAMSHARING_FETCH,
});

const initialTeamSharingState: TeamSharingState = {
  SharedEntities: EMPTY_ARRAY,
};

export const TeamSharingReducer: Redux.Reducer<TeamSharingState> = (
  state: TeamSharingState = initialTeamSharingState,
  action: Redux.Action
): TeamSharingState => {
  switch (action.type) {
    case TEAMSHARING_SET: {
      const actionTyped = action as TeamSharingSetAction;
      return Object.assign({}, state, {
        SharedEntities: actionTyped.Entities,
      });
    }
    default:
      return state;
  }
};
