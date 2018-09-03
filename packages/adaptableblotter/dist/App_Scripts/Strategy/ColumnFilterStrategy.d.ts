import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
export declare class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
    private filterState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    private GetColumnFilterState;
}
