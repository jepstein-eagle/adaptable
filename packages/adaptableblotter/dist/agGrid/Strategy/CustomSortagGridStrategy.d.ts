import { CustomSortStrategy } from '../../App_Scripts/Strategy/CustomSortStrategy';
import { IAdaptableBlotter } from '../../App_Scripts/Core/Interface/IAdaptableBlotter';
import { ICustomSort } from '../../App_Scripts/Api/Interface/IAdaptableBlotterObjects';
export declare class CustomSortagGridStrategy extends CustomSortStrategy {
    constructor(blotter: IAdaptableBlotter);
    getComparerFunction(customSort: ICustomSort, blotter: IAdaptableBlotter): Function;
}
