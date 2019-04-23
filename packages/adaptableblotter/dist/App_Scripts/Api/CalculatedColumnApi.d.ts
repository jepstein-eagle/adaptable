import { ApiBase } from "./ApiBase";
import { ICalculatedColumn } from "../Utilities/Interface/BlotterObjects/ICalculatedColumn";
import { ICalculatedColumnApi } from './Interface/ICalculatedColumnApi';
import { CalculatedColumnState } from '../Redux/ActionsReducers/Interface/IState';
export declare class CalculatedColumnApi extends ApiBase implements ICalculatedColumnApi {
    GetState(): CalculatedColumnState;
    GetAll(): ICalculatedColumn[];
    Add(calculatedColumn: ICalculatedColumn): void;
    EditExpression(column: string, columnExpression: string): void;
    Delete(column: string): void;
}
