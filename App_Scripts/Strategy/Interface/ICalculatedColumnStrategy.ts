import { IAdaptableBlotterObject } from "../../Core/Interface/Interfaces";
import { IStrategy } from "./IStrategy";

export interface ICalculatedColumnStrategy extends IStrategy {
}


export interface ICalculatedColumn extends IAdaptableBlotterObject {
    ColumnId: string;
    GetValueFunc: string
}