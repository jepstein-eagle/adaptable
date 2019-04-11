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
    private doCategoryChartDefinitionChangesRequireDataUpdate;
    private doPieChartDefinitionChangesRequireDataUpdate;
    protected handleSearchChanged(): void;
    protected handleDataSourceChanged(dataChangedInfo: IDataChangedInfo): void;
    private isCurrentChartVisibiilityMaximised;
    private isChartDataChanged;
    private setChartData;
    private clearChartData;
    private GetSystemState;
    private GetChartState;
    private GetColumnState;
    private GetCurrentChartDefinition;
}
