import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ICustomSort } from '../Core/Api/Interface/IAdaptableBlotterObjects';
export declare class CustomSortStrategy extends AdaptableStrategyBase {
    private CustomSorts;
    constructor(blotter: IAdaptableBlotter);
    protected InitState(): void;
    protected addPopupMenuItem(): void;
    addContextMenuItem(columnId: string): void;
    removeCustomSorts(): void;
    applyCustomSorts(): void;
    protected getComparerFunction(customSort: ICustomSort, blotter: IAdaptableBlotter): Function;
}
