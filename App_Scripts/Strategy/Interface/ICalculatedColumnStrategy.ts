import { IAdaptableBlotterObject } from '../../Core/Interface/IAdaptableBlotter';

export interface ICalculatedColumn extends IAdaptableBlotterObject {
    ColumnId: string;
    GetValueFunc: string
}