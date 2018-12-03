import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter';
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy';
import { IColumn } from '../api/Interface/IColumn';
export declare class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
}
