import { ApiBase } from "./ApiBase";
import { ICalculatedColumn } from './Interface/IAdaptableBlotterObjects';
export interface ICalculatedColumnApi {
    GetAll(): ICalculatedColumn[];
    Add(calculatedColumn: ICalculatedColumn): void;
    EditExpression(column: string, columnExpression: string): void;
    Delete(column: string): void;
}
export declare class CalculatedColumnApi extends ApiBase implements ICalculatedColumnApi {
    GetAll(): ICalculatedColumn[];
    Add(calculatedColumn: ICalculatedColumn): void;
    EditExpression(column: string, columnExpression: string): void;
    Delete(column: string): void;
}
