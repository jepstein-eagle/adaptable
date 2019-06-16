import { TeamSharingState } from '../../PredefinedConfig/ISystemState/TeamSharingState';
import * as Redux from 'redux';
import { ISharedEntity } from '../../Utilities/Interface/ISharedEntity';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { IAdaptableBlotterObject } from '../../PredefinedConfig/IAdaptableBlotterObject';

export const TEAMSHARING_SHARE = 'TEAMSHARING_SHARE';
export const TEAMSHARING_SET = 'TEAMSHARING_SET';
export const TEAMSHARING_IMPORT_ITEM = 'TEAMSHARING_IMPORT_ITEM';
export const TEAMSHARING_GET = 'TEAMSHARING_GET';

export interface TeamSharingShareAction extends Redux.Action {
  Entity: IAdaptableBlotterObject;
  Strategy: string;
}

export interface TeamSharingSetAction extends Redux.Action {
  Entities: ISharedEntity[];
}

export interface TeamSharingImportItemAction extends Redux.Action {
  Entity: IAdaptableBlotterObject;
  Strategy: string;
}

export interface TeamSharingGetAction extends Redux.Action {}

export const TeamSharingShare = (
  Entity: IAdaptableBlotterObject,
  Strategy: string
): TeamSharingShareAction => ({
  type: TEAMSHARING_SHARE,
  Entity,
  Strategy,
});

export const TeamSharingSet = (Entities: ISharedEntity[]): TeamSharingSetAction => ({
  type: TEAMSHARING_SET,
  Entities,
});

export const TeamSharingImportItem = (
  Entity: IAdaptableBlotterObject,
  Strategy: string
): TeamSharingImportItemAction => ({
  type: TEAMSHARING_IMPORT_ITEM,
  Entity,
  Strategy,
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
      let actionTyped = <TeamSharingSetAction>action;
      return Object.assign({}, state, {
        SharedEntities: actionTyped.Entities,
      });
    }
    default:
      return state;
  }
};
