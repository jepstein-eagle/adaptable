import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IDashboardStrategy } from './Interface/IDashboardStrategy';
export declare class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
    private DashboardState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(): void;
    protected InitState(): void;
    private GetDashboardState;
}
