import { IConfigEntity } from './IAdaptableBlotter'

export interface ICalculatedColumn extends IConfigEntity {
    ColumnId: string;
    GetValueFunc: string
}