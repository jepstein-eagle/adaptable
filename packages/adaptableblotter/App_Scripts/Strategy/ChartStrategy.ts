import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';
import { ChartState, SystemState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';
import * as _ from 'lodash'
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { IDataChangedInfo } from '../Api/Interface/IDataChangedInfo';
import { IChartDefinition, ICategoryChartDefinition } from "../Utilities/Interface/BlotterObjects/IChartDefinition";
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { ChartVisibility } from '../Utilities/ChartEnums';
import { ExpressionHelper } from '../Utilities/Helpers/ExpressionHelper';
import { IColumn } from '../Utilities/Interface/IColumn';

export class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {

    private ChartState: ChartState
    private SystemState: SystemState
    private throttleSetChartData: (() => void) & _.Cancelable;

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ChartStrategyId, blotter)

        this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        let refreshRate = blotter.AdaptableBlotterStore.TheStore.getState().Chart.RefreshRate * 1000;
        this.throttleSetChartData = _.throttle(this.setChartData, refreshRate);
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ChartStrategyName, ScreenPopups.ChartPopup, StrategyConstants.ChartGlyph);
    }

    protected InitState() {
        let isChartRelatedStateChanged: boolean = false;
        let displayChartAtStartUp: boolean = false;

        if (this.ChartState != this.GetChartState()) {
            if (this.ChartState == null) {
                isChartRelatedStateChanged = true;
                // if user has set display at startup to be true and there is a current chart then show it
                if (this.blotter.BlotterOptions.chartOptions.displayOnStartUp && StringExtensions.IsNotNullOrEmpty(this.GetChartState().CurrentChartName)) {
                     displayChartAtStartUp = true;
                }
            } else {
                let chartStateDefinition: IChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Name == this.ChartState.CurrentChartName)
                let storeStateDefinition: IChartDefinition = this.GetChartState().ChartDefinitions.find(c => c.Name == this.GetChartState().CurrentChartName)

                if (this.doChartDefinitionChangesRequireDataUpdate(chartStateDefinition, storeStateDefinition)) {
                    isChartRelatedStateChanged = true;
                }
            }
            this.ChartState = this.GetChartState();
        }

        if (this.SystemState != this.GetSystemState()) {
            if (this.SystemState == null) {
                isChartRelatedStateChanged = true; // correct? seems not but not urgent to fix
            } else {
                if (this.SystemState.ChartVisibility != this.GetSystemState().ChartVisibility) {
                    isChartRelatedStateChanged = true;
                }
            }
            this.SystemState = this.blotter.AdaptableBlotterStore.TheStore.getState().System;
        }

        if (isChartRelatedStateChanged) {

            if (StringExtensions.IsNotNullOrEmpty(this.ChartState.CurrentChartName)
                && this.SystemState.ChartVisibility == ChartVisibility.Maximised) {
                this.setChartData();
            } else {
                this.clearChartData();
            }

            if (this.ChartState.CurrentChartName == null && this.SystemState.ChartVisibility == ChartVisibility.Maximised) {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Hidden));
            }

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Chart, this.ChartState)
            }

            if(displayChartAtStartUp){
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Maximised));
                this.setChartData();
            }
        }
    }

    private doChartDefinitionChangesRequireDataUpdate(cd1: IChartDefinition, cd2: IChartDefinition): boolean {
        // slightly nonsensical for now but iwll change as more charts are added I think...
        let a = cd1 as ICategoryChartDefinition;
        let b = cd2 as ICategoryChartDefinition;

        if (a == null && b !== null) {
            return true;
        }
        if (b == null && a !== null) {
            return true;
        }

        if (a.XAxisColumnId != b.XAxisColumnId) {
            return true;
        }
        if (ArrayExtensions.areArraysNotEqual(a.YAxisColumnIds, b.YAxisColumnIds)) {
            return true;
        }
        if (a.YAxisTotal != b.YAxisTotal) {
            return true;
        }
        if (ExpressionHelper.ConvertExpressionToString(a.XAxisExpression, this.GetColumnState()) != ExpressionHelper.ConvertExpressionToString(b.XAxisExpression, this.GetColumnState())) {
            return true;
        }
        return false;
    }

    protected handleDataSourceChanged(dataChangedInfo: IDataChangedInfo): void {
        if (this.SystemState.ChartVisibility == ChartVisibility.Maximised && StringExtensions.IsNotNullOrEmpty(this.ChartState.CurrentChartName)) {
            // need to make sure that this is up to date always - not sure that it currently is
            let columnChangedId: string = dataChangedInfo.ColumnId;
            let currentChartDefinition: ICategoryChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Name == this.ChartState.CurrentChartName) as ICategoryChartDefinition
            if (ArrayExtensions.ContainsItem(currentChartDefinition.YAxisColumnIds, columnChangedId) ||
                currentChartDefinition.XAxisColumnId == columnChangedId) {
                this.throttleSetChartData();
            }
        }
    }

    private setChartData() {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let chartDefinition: ICategoryChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Name == this.ChartState.CurrentChartName) as ICategoryChartDefinition
        if (chartDefinition) {
            let chartData: any = this.blotter.ChartService.BuildCategoryChartData(chartDefinition, columns);
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

    private GetColumnState(): IColumn[] {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
    }

}
