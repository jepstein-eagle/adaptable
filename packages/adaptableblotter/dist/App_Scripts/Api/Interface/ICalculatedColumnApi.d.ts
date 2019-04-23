import { ICalculatedColumn } from "../../Utilities/Interface/BlotterObjects/ICalculatedColumn";
import { CalculatedColumnState } from "../../Redux/ActionsReducers/Interface/IState";
export interface ICalculatedColumnApi {
    GetState(): CalculatedColumnState;
    GetAll(): ICalculatedColumn[];
    Add(calculatedColumn: ICalculatedColumn): void;
    EditExpression(column: string, columnExpression: string): void;
    Delete(column: string): void;
}
