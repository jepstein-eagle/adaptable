import { IDataManagementStrategy } from './Interface/IDataManagementStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
export declare class DataManagementStrategy extends AdaptableStrategyBase implements IDataManagementStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
}
