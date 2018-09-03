import { ICellValidationStrategy } from './Interface/ICellValidationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
export declare class CellValidationStrategy extends AdaptableStrategyBase implements ICellValidationStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(columnId: string): void;
}
