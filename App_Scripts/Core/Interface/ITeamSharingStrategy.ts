import {IStrategy} from './IStrategy';
import { IConfigEntity } from './IAdaptableBlotter';

export interface ITeamSharingStrategy extends IStrategy{
    
}

export interface ISharedEntity{
    entity: IConfigEntity,
    strategy: string,
    timestamp: Date
    user: string,
    blotter_id: string
}