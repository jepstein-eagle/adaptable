import {IStrategy} from './IStrategy';
import { IAdaptableBlotterObject } from '../../Utilities/Interface/IAdaptableBlotterObjects';

export interface ITeamSharingStrategy extends IStrategy{
    
}

export interface ISharedEntity{
    entity: IAdaptableBlotterObject,
    strategy: string,
    timestamp: Date
    user: string,
    blotter_id: string
}