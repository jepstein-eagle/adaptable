import { ICellValidationStrategy } from './Interface/ICellValidationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IColumn } from '../Core/Interface/IColumn';
export declare class CellValidationStrategy extends AdaptableStrategyBase implements ICellValidationStrategy {
    private CellValidationState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    addContextMenuItem(column: IColumn): void;
}
