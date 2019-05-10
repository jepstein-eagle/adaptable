import { ICalculatedColumn } from '../../Utilities/Interface/BlotterObjects/ICalculatedColumn';
import { CalculatedColumnState } from '../../Redux/ActionsReducers/Interface/IState';

export interface ICalculatedColumnApi {
  getCalculatedColumnState(): CalculatedColumnState;
  getAllCalculatedColumn(): ICalculatedColumn[];
  addCalculatedColumn(calculatedColumn: ICalculatedColumn): void;
  editCalculatedColumnExpression(column: string, columnExpression: string): void;
  deleteCalculatedColumn(column: string): void;
}
