import { IAdaptableBlotterObject } from "../../Core/Interface/Interfaces";

export interface ICalculatedColumn extends IAdaptableBlotterObject {
    ColumnId: string;
    GetValueFunc: string
}