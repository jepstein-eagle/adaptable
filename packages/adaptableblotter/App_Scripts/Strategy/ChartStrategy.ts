import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import * as ChartRedux from '../Redux/ActionsReducers/ChartRedux'
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';
import { ChartState, SystemState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';
import * as _ from 'lodash'
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { IDataChangedInfo } from '../Api/Interface/IDataChangedInfo';

export class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {

    private ChartState: ChartState
   
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ChartStrategyId, blotter)

        this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ChartStrategyName, ScreenPopups.ChartPopup, StrategyConstants.ChartGlyph);
    }

    protected InitState() {

        if (this.ChartState != this.blotter.AdaptableBlotterStore.TheStore.getState().Chart) {
            this.ChartState = this.blotter.AdaptableBlotterStore.TheStore.getState().Chart;

            if (this.ChartState.CurrentChartDefinition != null && this.ChartState.IsChartVisible) {
                this.setChartData();
            } else {
                this.clearChartData();
            }

            if (this.ChartState.CurrentChartDefinition == null && this.ChartState.IsChartVisible) {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(ChartRedux.ChartHideChart());
            }

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Chart, this.ChartState)
            }
        }
    }

    debouncedSetChartData = _.debounce(() => this.setChartData(), 500);

    protected handleDataSourceChanged(dataChangedEvent: IDataChangedInfo): void {
        if (this.ChartState.IsChartVisible && this.ChartState.CurrentChartDefinition != null) {
            // need to make sure that this is up to date always - not sure that it currently is
            let columnChangedId: string = dataChangedEvent.ColumnId;
            if (ArrayExtensions.ContainsItem(this.ChartState.CurrentChartDefinition.YAxisColumnIds, columnChangedId) ||
                this.ChartState.CurrentChartDefinition.XAxisColumnId == columnChangedId ||
                this.ChartState.CurrentChartDefinition.AdditionalColumnId == columnChangedId) {
                this.debouncedSetChartData();
            }
        }
    }

    private setChartData() {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let chartData: any = this.blotter.ChartService.BuildChartData(this.GetChartState().CurrentChartDefinition, columns);
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartData(chartData));
    }

    private clearChartData() {
        if (this.GetSystemState().ChartData != null) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartData(null));
        }
    }

    private GetSystemState(): SystemState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().System;
    }

    private GetChartState(): ChartState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Chart;
    }

}