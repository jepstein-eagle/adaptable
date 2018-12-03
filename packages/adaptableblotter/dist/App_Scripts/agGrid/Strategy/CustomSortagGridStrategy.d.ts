import { CustomSortStrategy } from '../../Strategy/CustomSortStrategy';
import { IAdaptableBlotter } from '../../api/Interface/IAdaptableBlotter';
import { ICustomSort } from '../../api/Interface/IAdaptableBlotterObjects';
export declare class CustomSortagGridStrategy extends CustomSortStrategy {
    constructor(blotter: IAdaptableBlotter);
    getComparerFunction(customSort: ICustomSort, blotter: IAdaptableBlotter): Function;
}
