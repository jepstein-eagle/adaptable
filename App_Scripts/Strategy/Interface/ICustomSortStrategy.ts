import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter'

export interface ICustomSort extends IConfigEntity {
    ColumnId: string;
    CustomSortItems: Array<string>
}