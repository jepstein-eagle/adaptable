import { ApiBase } from "./ApiBase";
import { ICalculatedColumn } from '../Utilities/Interface/IAdaptableBlotterObjects';
import { ICalculatedColumnApi } from './Interface/ICalculatedColumnApi';
export declare class CalculatedColumnApi extends ApiBase implements ICalculatedColumnApi {
    GetAll(): ICalculatedColumn[];
    Add(calculatedColumn: ICalculatedColumn): void;
    EditExpression(column: string, columnExpression: string): void;
    Delete(column: string): void;
}
