import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { TeamSharingState } from './Interface/IState';
import * as Redux from 'redux'
import { ISharedEntity } from '../../Strategy/Interface/ITeamSharingStrategy';

export const TEAMSHARING_SHARE = 'TEAMSHARING_SHARE';
export const TEAMSHARING_GET = 'TEAMSHARING_GET';
export const TEAMSHARING_SET = 'TEAMSHARING_SET';
export const TEAMSHARING_IMPORT_ITEM = 'TEAMSHARING_IMPORT_ITEM';

export interface TeamSharingShareAction extends Redux.Action {
    Entity: IConfigEntity
    Strategy: string
}

export const TeamSharingShare = (Entity: IConfigEntity, Strategy: string): TeamSharingShareAction => ({
    type: TEAMSHARING_SHARE,
    Entity,
    Strategy
})

export interface TeamSharingSetAction extends Redux.Action {
    Entities: ISharedEntity[]
}

export const TeamSharingSet = (Entities: ISharedEntity[]): TeamSharingSetAction => ({
    type: TEAMSHARING_SET,
    Entities
})

export interface TeamSharingImportItemAction extends Redux.Action {
    Entity: IConfigEntity,
    Strategy: string
}

export const TeamSharingImportItem = (Entity: IConfigEntity, Strategy: string): TeamSharingImportItemAction => ({
    type: TEAMSHARING_IMPORT_ITEM,
    Entity,
    Strategy
})

export interface TeamSharingGet extends Redux.Action {
}

export const TeamSharingGet = (): TeamSharingGet => ({
    type: TEAMSHARING_GET
})

const initialTeamSharingState: TeamSharingState = {
    Activated: false,
    SharedEntities: []
}

export const TeamSharingReducer: Redux.Reducer<TeamSharingState> = (state: TeamSharingState = initialTeamSharingState, action: Redux.Action): TeamSharingState => {
    switch (action.type) {
        case TEAMSHARING_SET: {
            let actionTyped = <TeamSharingSetAction>action
            return Object.assign({}, state, {
                SharedEntities: actionTyped.Entities
            });
        }
        default:
            return state
    }
}