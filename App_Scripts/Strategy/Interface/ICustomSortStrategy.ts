import { IAdaptableBlotterObject } from '../../Core/Interface/IAdaptableBlotter'

export interface ICustomSort extends IAdaptableBlotterObject {
    ColumnId: string;
    CustomSortItems: Array<string>
}