import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';
import * as _ from 'lodash';
import { IDataChangedInfo } from '../Api/Interface/IDataChangedInfo';
export declare class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {
    private ChartState;
    private SystemState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    debouncedSetChartData: (() => void) & _.Cancelable;
    protected handleDataSourceChanged(dataChangedInfo: IDataChangedInfo): void;
    private getRefreshrate;
    private setChartData;
    private clearChartData;
    private GetSystemState;
    private GetChartState;
}
