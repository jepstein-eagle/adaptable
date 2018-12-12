import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';
import { IDataChangedEvent } from '../Utilities/Services/Interface/IAuditService';
import * as _ from 'lodash';
export declare class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {
    private ChartState;
    private ChartInternalState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    debouncedSetChartData: (() => void) & _.Cancelable;
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void;
    private setChartData;
    private clearChartData;
}
