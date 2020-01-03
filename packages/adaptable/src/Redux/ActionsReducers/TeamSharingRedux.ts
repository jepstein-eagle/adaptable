import { TeamSharingState } from '../../PredefinedConfig/TeamSharingState';
import * as Redux from 'redux';
import { ISharedEntity } from '../../Utilities/Interface/ISharedEntity';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export const TEAMSHARING_SHARE = 'TEAMSHARING_SHARE';
export const TEAMSHARING_SET = 'TEAMSHARING_SET';
export const TEAMSHARING_IMPORT_ITEM = 'TEAMSHARING_IMPORT_ITEM';
export const TEAMSHARING_GET = 'TEAMSHARING_GET';

export interface TeamSharingShareAction extends Redux.Action {
  Entity: AdaptableObject;
  FunctionName: AdaptableFunctionName;
}

export interface TeamSharingSetAction extends Redux.Action {
  Entities: ISharedEntity[];
}

export interface TeamSharingImportItemAction extends Redux.Action {
  Entity: AdaptableObject;
  FunctionName: AdaptableFunctionName;
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

export const TeamSharingSet = (Entities: ISharedEntity[]): TeamSharingSetAction => ({
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

export const TeamSharingGet = (): TeamSharingGetAction => ({
  type: TEAMSHARING_GET,
});

const initialTeamSharingState: TeamSharingState = {
  Activated: false,
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
