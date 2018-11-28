import { TeamSharingState } from './Interface/IState';
import * as Redux from 'redux';
import { ISharedEntity } from '../../Strategy/Interface/ITeamSharingStrategy';
import { IAdaptableBlotterObject } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
export declare const TEAMSHARING_SHARE = "TEAMSHARING_SHARE";
export declare const TEAMSHARING_SET = "TEAMSHARING_SET";
export declare const TEAMSHARING_IMPORT_ITEM = "TEAMSHARING_IMPORT_ITEM";
export declare const TEAMSHARING_GET = "TEAMSHARING_GET";
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
export interface TeamSharingGetAction extends Redux.Action {
}
export declare const TeamSharingShare: (Entity: IAdaptableBlotterObject, Strategy: string) => TeamSharingShareAction;
export declare const TeamSharingSet: (Entities: ISharedEntity[]) => TeamSharingSetAction;
export declare const TeamSharingImportItem: (Entity: IAdaptableBlotterObject, Strategy: string) => TeamSharingImportItemAction;
export declare const TeamSharingGet: () => TeamSharingGetAction;
export declare const TeamSharingReducer: Redux.Reducer<TeamSharingState>;
