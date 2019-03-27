import * as _ from 'lodash'
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';
import { ChartState, SystemState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { IDataChangedInfo } from '../Api/Interface/IDataChangedInfo';
import { IChartDefinition, ICategoryChartDefinition, IPieChartDefinition } from "../Utilities/Interface/BlotterObjects/IChartDefinition";
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { ChartVisibility, ChartType } from '../Utilities/ChartEnums';
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

            if (displayChartAtStartUp) {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Maximised));
                this.setChartData();
            }
        }
    }

    private doChartDefinitionChangesRequireDataUpdate(cd1: IChartDefinition, cd2: IChartDefinition): boolean {
        if (cd1 == null && cd2 !== null) {
            return true;
        }
        if (cd2 == null && cd1 !== null) {
            return true;
        }
        if (cd1 == null && cd2 == null) {
            return false;
        }

        if (cd1.ChartType == ChartType.CategoryChart) {
            return this.doCategoryChartDefinitionChangesRequireDataUpdate(cd1 as ICategoryChartDefinition, cd2 as ICategoryChartDefinition);
        }
        if (cd1.ChartType == ChartType.PieChart) {
            return this.doPieChartDefinitionChangesRequireDataUpdate(cd1 as IPieChartDefinition, cd2 as IPieChartDefinition);
        }
    }

    private doCategoryChartDefinitionChangesRequireDataUpdate(cd1: ICategoryChartDefinition, cd2: ICategoryChartDefinition): boolean {
        if (cd1.XAxisColumnId != cd2.XAxisColumnId) {
            return true;
        }
        if (ArrayExtensions.areArraysNotEqual(cd1.YAxisColumnIds, cd2.YAxisColumnIds)) {
            return true;
        }
        if (cd1.YAxisTotal != cd2.YAxisTotal) {
            return true;
        }
        if (ExpressionHelper.ConvertExpressionToString(cd1.XAxisExpression, this.GetColumnState()) != ExpressionHelper.ConvertExpressionToString(cd2.XAxisExpression, this.GetColumnState())) {
            return true;
        }
        return false;
    }

    private doPieChartDefinitionChangesRequireDataUpdate(cd1: IPieChartDefinition, cd2: IPieChartDefinition): boolean {
        if (cd1.PrimaryColumnId != cd2.PrimaryColumnId) {
            return true;
        }
        if (cd1.SecondaryColumnId != cd2.SecondaryColumnId) {
            return true;
        }
        if (cd1.SecondaryColumnOperation != cd2.SecondaryColumnOperation) {
            return true;
        }
        if (cd1.VisibleRowsOnly != cd2.VisibleRowsOnly) {
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
        let chartDefinition: IChartDefinition = this.ChartState.ChartDefinitions.find(c => c.Name == this.ChartState.CurrentChartName);
        if (chartDefinition) {
            let chartData: any;
            if (chartDefinition.ChartType == ChartType.CategoryChart) {
                chartData = this.blotter.ChartService.BuildCategoryChartData(chartDefinition as ICategoryChartDefinition, columns);
            } else if (chartDefinition.ChartType == ChartType.PieChart) {
                chartData = this.blotter.ChartService.BuildPieChartData(chartDefinition as IPieChartDefinition);
             }
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
