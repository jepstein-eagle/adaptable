import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IPieChartStrategy } from './Interface/IPieChartStrategy';
import { PieChartState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Utilities/Interface/IColumn';
export declare class PieChartStrategy extends AdaptableStrategyBase implements IPieChartStrategy {
    protected PieChartState: PieChartState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
}
