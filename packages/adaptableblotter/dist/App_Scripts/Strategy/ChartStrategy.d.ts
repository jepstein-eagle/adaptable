import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';
import * as _ from 'lodash';
import { IDataChangedInfo } from '../Api/Interface/IDataChangedInfo';
export declare class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {
    private ChartState;
    private ChartInternalState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    debouncedSetChartData: (() => void) & _.Cancelable;
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedInfo): void;
    private setChartData;
    private clearChartData;
}
