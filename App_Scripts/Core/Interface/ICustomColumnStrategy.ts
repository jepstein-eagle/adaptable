import { IConfigEntity } from './IAdaptableBlotter'

export interface ICustomColumn extends IConfigEntity {
    ColumnId: string;
    GetValueFunc: string
}