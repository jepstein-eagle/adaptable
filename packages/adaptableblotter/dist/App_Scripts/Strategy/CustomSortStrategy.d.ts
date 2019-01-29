import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ICustomSort } from "../Utilities/Interface/BlotterObjects/ICustomSort";
import { IColumn } from '../Utilities/Interface/IColumn';
export declare class CustomSortStrategy extends AdaptableStrategyBase {
    private CustomSorts;
    constructor(blotter: IAdaptableBlotter);
    protected InitState(): void;
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    removeCustomSorts(): void;
    applyCustomSorts(): void;
    getComparerFunction(customSort: ICustomSort, blotter: IAdaptableBlotter): Function;
}
