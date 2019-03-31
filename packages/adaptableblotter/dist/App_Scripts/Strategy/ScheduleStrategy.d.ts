import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IScheduleStrategy } from './Interface/IScheduleStrategy';
import { ScheduleState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Utilities/Interface/IColumn';
export declare class ScheduleStrategy extends AdaptableStrategyBase implements IScheduleStrategy {
    protected ScheduleState: ScheduleState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
}
