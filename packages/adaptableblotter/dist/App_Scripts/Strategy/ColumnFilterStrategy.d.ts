import { IColumnFilterStrategy } from './Interface/IColumnFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter';
import { IColumn } from '../Api/Interface/IColumn';
export declare class ColumnFilterStrategy extends AdaptableStrategyBase implements IColumnFilterStrategy {
    private columnFilterState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
    private GetColumnFilterState;
}
