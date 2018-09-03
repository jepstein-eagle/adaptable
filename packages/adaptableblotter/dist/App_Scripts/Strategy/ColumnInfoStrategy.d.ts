import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IColumnInfoStrategy } from './Interface/IColumnInfoStrategy';
export declare class ColumnInfoStrategy extends AdaptableStrategyBase implements IColumnInfoStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(columnId: string): void;
}
