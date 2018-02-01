import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';

export interface ICalculatedColumn extends IConfigEntity {
    ColumnId: string;
    GetValueFunc: string
}