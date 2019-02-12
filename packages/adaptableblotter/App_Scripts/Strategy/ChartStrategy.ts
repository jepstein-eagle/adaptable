import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import * as ChartRedux from '../Redux/ActionsReducers/ChartRedux'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';
import { ChartState, SystemState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';
import * as _ from 'lodash'
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { IDataChangedInfo } from '../Api/Interface/IDataChangedInfo';
import { IChartDefinition } from "../Utilities/Interface/BlotterObjects/IChartDefinition";
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { ChartVisibility } from '../Utilities/ChartEnums';

export class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {

    private ChartState: ChartState
    private SystemState: SystemState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ChartStrategyId, blotter)

        this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))

    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ChartStrategyName, ScreenPopups.ChartPopup, StrategyConstants.ChartGlyph);
    }

    protected InitState() {
        let isChartRelatedStateChanged: boolean = false;

        if (this.ChartState != this.GetChartState()) {
            this.ChartState = this.GetChartState();
            isChartRelatedStateChanged = true;
        }

        if (this.SystemState != this.GetSystemState()) {
            if (this.SystemState == null) {
                isChartRelatedStateChanged = true; // correct?
            } else {
                if (this.SystemState.ChartVisibility != this.GetSystemState().ChartVisibility) {
                    isChartRelatedStateChanged = true;
                }
            }
            this.SystemState = this.blotter.AdaptableBlotterStore.TheStore.getState().System;
        }

        if (isChartRelatedStateChanged) {

            if (StringExtensions.IsNotNullOrEmpty(this.ChartState.CurrentChartDefinition)
                && this.SystemState.ChartVisibility == ChartVisibility.Maximised) {
                this.setChartData();
            } else {
                this.clearChartData();
            }

            if (this.ChartState.CurrentChartDefinition == null && this.SystemState.ChartVisibility == ChartVisibility.Maximised) {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Hidden));
            }

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Chart, this.ChartState)
            }
        }
    }

    debouncedSetChartData = _.debounce(() => this.setChartData(), this.getRefreshrate());

    protected handleDataSourceChanged(dataChangedInfo: IDataChangedInfo): void {
 //     console.log(dataChangedInfo.ColumnId)
        if (this.SystemState.ChartVisibility == ChartVisibility.Maximised && StringExtensions.IsNotNullOrEmpty( this.ChartState.CurrentChartDefinition)) {
            // need to make sure that this is up to date always - not sure that it currently is
            let columnChangedId: string = dataChangedInfo.ColumnId;
            let currentChartDefinition: IChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Title == this.ChartState.CurrentChartDefinition)
            if ( ArrayExtensions.ContainsItem(currentChartDefinition.YAxisColumnIds, columnChangedId) ||
                currentChartDefinition.XAxisColumnId == columnChangedId ||
                currentChartDefinition.XSegmentColumnId == columnChangedId) {
                this.debouncedSetChartData();
            }
        }
    }

    private getRefreshrate() {
        return (this.ChartState == null) ? 1000 : this.ChartState.RefreshRate * 1000;
    }

    private setChartData() {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let currentChartDefinition: IChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Title == this.ChartState.CurrentChartDefinition)
        if (currentChartDefinition) {
            let chartData: any = this.blotter.ChartService.BuildChartData(currentChartDefinition, columns);
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartData(chartData));
        }
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