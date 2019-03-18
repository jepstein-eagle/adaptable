import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter'
import { IPieChartStrategy } from './Interface/IPieChartStrategy'
import { PieChartState } from '../Redux/ActionsReducers/Interface/IState';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { StateChangedTrigger } from '../Utilities/Enums';
import { IColumn } from '../Utilities/Interface/IColumn';

export class PieChartStrategy extends AdaptableStrategyBase implements IPieChartStrategy {
    protected PieChartState: PieChartState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.PieChartStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.PieChartStrategyName, ScreenPopups.PieChartPopup, StrategyConstants.PieChartGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            this.createContextMenuItemShowPopup(
                StrategyConstants.PieChartStrategyName,
                ScreenPopups.PieChartPopup,
                StrategyConstants.PieChartGlyph,
                column.ColumnId)
        }

    }

    protected InitState() {
        if (this.PieChartState != this.blotter.AdaptableBlotterStore.TheStore.getState().PieChart) {
            this.PieChartState = this.blotter.AdaptableBlotterStore.TheStore.getState().PieChart;

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.PieChart, this.PieChartState)
            }
        }
    }


}