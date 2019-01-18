import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumnInfoStrategy } from './Interface/IColumnInfoStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';
export declare class ColumnInfoStrategy extends AdaptableStrategyBase implements IColumnInfoStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
}
