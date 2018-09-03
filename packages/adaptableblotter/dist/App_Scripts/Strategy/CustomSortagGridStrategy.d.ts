import { CustomSortStrategy } from './CustomSortStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ICustomSort } from '../Core/Api/Interface/AdaptableBlotterObjects';
export declare class CustomSortagGridStrategy extends CustomSortStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected getComparerFunction(customSort: ICustomSort, blotter: IAdaptableBlotter): Function;
}
