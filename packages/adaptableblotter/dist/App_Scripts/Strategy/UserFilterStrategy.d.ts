import { IUserFilterStrategy } from './Interface/IUserFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter';
import { IColumn } from '../api/Interface/IColumn';
export declare class UserFilterStrategy extends AdaptableStrategyBase implements IUserFilterStrategy {
    private userFilters;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
    private GetUserFilterState;
}
