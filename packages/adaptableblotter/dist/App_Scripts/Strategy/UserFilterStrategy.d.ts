import { IUserFilterStrategy } from './Interface/IUserFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
export declare class UserFilterStrategy extends AdaptableStrategyBase implements IUserFilterStrategy {
    private userFilters;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(columnId: string): void;
    protected InitState(): void;
    private GetUserFilterState;
}
