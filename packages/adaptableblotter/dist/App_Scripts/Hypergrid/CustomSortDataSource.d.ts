import { AdaptableBlotter } from './AdaptableBlotter';
export interface ICustomSortInfo {
    SortedValues: any[];
    Formatter: any;
}
export declare let CustomSortDataSource: (blotter: AdaptableBlotter) => any;
