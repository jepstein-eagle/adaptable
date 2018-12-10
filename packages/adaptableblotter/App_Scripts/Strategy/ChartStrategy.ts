import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import * as ChartInternalRedux from '../Redux/ActionsReducers/ChartInternalRedux'
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';
import { ChartState, ChartInternalState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';
import { IDataChangedEvent } from '../Utilities/Services/Interface/IAuditService';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';


export class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {

    private ChartState: ChartState
    private ChartVisible: boolean


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

            // whatever we do with the chart state (either change definition or current chart) 
            // regardless we should make the chart window invisible (based on current workflow) if its visible
            // and also clear the chart data
            if (this.ChartVisible) {
                if (StringExtensions.IsEmpty(this.ChartState.CurrentChart)) {
                    this.chlearChartData();
                    this.blotter.AdaptableBlotterStore.TheStore.dispatch(ChartInternalRedux.ChartInternalHideChart());
                } else {
                    this.setChartData();
                }
            }

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Chart, this.ChartState)
            }
        }

        if (this.ChartVisible != this.blotter.AdaptableBlotterStore.TheStore.getState().ChartInternal.ChartVisible) {
            this.ChartVisible = this.blotter.AdaptableBlotterStore.TheStore.getState().ChartInternal.ChartVisible;

            if (StringExtensions.IsNotEmpty(this.ChartState.CurrentChart) && this.ChartVisible) {
                this.setChartData();
            } else {
                this.chlearChartData();
            }
        }
    }

    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        if (StringExtensions.IsNotEmpty(this.ChartState.CurrentChart)) {
            if (this.ChartVisible) {
                // need to make sure that this is up to date always - not sure that it currently is
                let columnChangedId: string = dataChangedEvent.ColumnId;
                let currentChartDefinition = this.ChartState.ChartDefinitions.find(cd => cd.Title == this.ChartState.CurrentChart);
                let requireUpdate: boolean = false;
                if (currentChartDefinition.YAxisColumnId == columnChangedId || currentChartDefinition.XAxisColumnId == columnChangedId || currentChartDefinition.AdditionalColumnId == columnChangedId) {
                    this.setChartData();
                }
            }
        }

    }

    private setChartData() {
         let chartDefinition = this.ChartState.ChartDefinitions.find(cd => cd.Title == this.ChartState.CurrentChart);
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let chartData: any = this.blotter.ChartService.BuildChartData(chartDefinition, columns);
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(ChartInternalRedux.ChartInternalSetChartData(chartData));
    }

    private chlearChartData() {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(ChartInternalRedux.ChartInternalSetChartData(null));
    }
}