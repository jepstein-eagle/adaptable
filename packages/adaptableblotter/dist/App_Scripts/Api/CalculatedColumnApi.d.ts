import { ApiBase } from "./ApiBase";
import { ICalculatedColumn } from "../Utilities/Interface/BlotterObjects/ICalculatedColumn";
import { ICalculatedColumnApi } from './Interface/ICalculatedColumnApi';
import { CalculatedColumnState } from '../Redux/ActionsReducers/Interface/IState';
export declare class CalculatedColumnApi extends ApiBase implements ICalculatedColumnApi {
    getCalculatedColumnState(): CalculatedColumnState;
    getAllCalculatedColumn(): ICalculatedColumn[];
    addCalculatedColumn(calculatedColumn: ICalculatedColumn): void;
    editCalculatedColumnExpression(column: string, columnExpression: string): void;
    deleteCalculatedColumn(column: string): void;
}
