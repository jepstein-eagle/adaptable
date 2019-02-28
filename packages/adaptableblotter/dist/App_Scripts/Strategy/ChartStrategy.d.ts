import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';
import { IDataChangedInfo } from '../Api/Interface/IDataChangedInfo';
export declare class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {
    private ChartState;
    private SystemState;
    private throttleSetChartData;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    private doChartDefinitionChangesRequireDataUpdate;
    protected handleDataSourceChanged(dataChangedInfo: IDataChangedInfo): void;
    private setChartData;
    private clearChartData;
    private GetSystemState;
    private GetChartState;
    private GetColumnState;
}
