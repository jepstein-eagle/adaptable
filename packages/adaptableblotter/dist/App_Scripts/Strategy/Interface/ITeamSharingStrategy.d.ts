import { IStrategy } from './IStrategy';
import { IAdaptableBlotterObject } from '../../Core/Api/Interface/AdaptableBlotterObjects';
export interface ITeamSharingStrategy extends IStrategy {
}
export interface ISharedEntity {
    entity: IAdaptableBlotterObject;
    strategy: string;
    timestamp: Date;
    user: string;
    blotter_id: string;
}
