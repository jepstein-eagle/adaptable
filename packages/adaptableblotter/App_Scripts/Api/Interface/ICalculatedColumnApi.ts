import {
  CalculatedColumnState,
  ICalculatedColumn,
} from '../../PredefinedConfig/IUserState/CalculatedColumnState';

export interface ICalculatedColumnApi {
  getCalculatedColumnState(): CalculatedColumnState;
  getAllCalculatedColumn(): ICalculatedColumn[];
  addCalculatedColumn(calculatedColumn: ICalculatedColumn): void;
  editCalculatedColumnExpression(column: string, columnExpression: string): void;
  deleteCalculatedColumn(column: string): void;
}
