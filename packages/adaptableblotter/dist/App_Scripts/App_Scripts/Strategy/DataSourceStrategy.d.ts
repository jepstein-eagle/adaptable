import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IDataSourceStrategy } from './Interface/IDataSourceStrategy';
export declare class DataSourceStrategy extends AdaptableStrategyBase implements IDataSourceStrategy {
    private DataSourceState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    private GetDataSourceState;
}
