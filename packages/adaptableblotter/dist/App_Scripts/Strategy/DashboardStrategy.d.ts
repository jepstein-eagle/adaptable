import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IDashboardStrategy } from './Interface/IDashboardStrategy';
export declare class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
    private GridSorts;
    private GridState;
    private DashboardState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(): void;
    protected InitState(): void;
    private GetGridState;
    private GetDashboardState;
}
