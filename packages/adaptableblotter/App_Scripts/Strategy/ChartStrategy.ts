import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import * as ChartInternalRedux from '../Redux/ActionsReducers/ChartInternalRedux'
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';
import { ChartState, ChartInternalState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';
import * as _ from 'lodash'
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { IDataChangedEvent } from '../Api/Interface/IDataChanges';

export class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {

    private ChartState: ChartState
    private ChartInternalState: ChartInternalState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ChartStrategyId, blotter)
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ChartStrategyName, ScreenPopups.ChartPopup, StrategyConstants.ChartGlyph);
    }

    protected InitState() {
        if (this.ChartState != this.blotter.AdaptableBlotterStore.TheStore.getState().Chart) {
            this.ChartState = this.blotter.AdaptableBlotterStore.TheStore.getState().Chart;

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Chart, this.ChartState)
            }
        }

        // need to ensure that we catch the current chart being changed...

        if (this.ChartInternalState != this.blotter.AdaptableBlotterStore.TheStore.getState().ChartInternal) {
            if (this.ChartInternalState == null) { // first time so just set - no need to get data
                this.ChartInternalState = this.blotter.AdaptableBlotterStore.TheStore.getState().ChartInternal;
            } else {  // want to make sure we dont get into internal loop updating chart data...
                let isChartStateChanged: boolean = (this.ChartInternalState.ChartData != this.blotter.AdaptableBlotterStore.TheStore.getState().ChartInternal.ChartData)

                this.ChartInternalState = this.blotter.AdaptableBlotterStore.TheStore.getState().ChartInternal;

                if (!isChartStateChanged) {
                    if (this.ChartInternalState.CurrentChartDefinition != null && this.ChartInternalState.ChartVisible) {
                        this.setChartData();
                    } else {
                        this.clearChartData();
                    }

                    if (this.ChartInternalState.CurrentChartDefinition == null && this.ChartInternalState.ChartVisible) {
                        this.blotter.AdaptableBlotterStore.TheStore.dispatch(ChartInternalRedux.ChartInternalHideChart());
                    }
                }
            }
        }
    }

    debouncedSetChartData = _.debounce(() => this.setChartData(), 500);

    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        if (this.ChartInternalState != null && this.ChartInternalState.ChartVisible && this.ChartInternalState.CurrentChartDefinition != null) {
            // need to make sure that this is up to date always - not sure that it currently is
            let columnChangedId: string = dataChangedEvent.ColumnId;
            if (ArrayExtensions.ContainsItem(this.ChartInternalState.CurrentChartDefinition.YAxisColumnIds, columnChangedId) ||
                this.ChartInternalState.CurrentChartDefinition.XAxisColumnId == columnChangedId ||
                this.ChartInternalState.CurrentChartDefinition.AdditionalColumnId == columnChangedId) {
                this.debouncedSetChartData();
            }
        }
    }

    private setChartData() {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let chartData: any = this.blotter.ChartService.BuildChartData(this.ChartInternalState.CurrentChartDefinition, columns);
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(ChartInternalRedux.ChartInternalSetChartData(chartData));
    }

    private clearChartData() {
        if (this.ChartInternalState.ChartData != null) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(ChartInternalRedux.ChartInternalSetChartData(null));
        }
    }


}