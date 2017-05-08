import { IConfigEntity } from './IAdaptableBlotter'

export interface ICustomSort extends IConfigEntity {
    ColumnId: string;
    CustomSortItems: Array<string>
}