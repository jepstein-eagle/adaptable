import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy';
export declare class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(columnId: string): void;
}
