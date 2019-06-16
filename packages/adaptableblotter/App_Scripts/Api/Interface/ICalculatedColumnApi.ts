import {
  CalculatedColumnState,
  CalculatedColumn,
} from '../../PredefinedConfig/IUserState/CalculatedColumnState';

export interface ICalculatedColumnApi {
  getCalculatedColumnState(): CalculatedColumnState;
  getAllCalculatedColumn(): CalculatedColumn[];
  addCalculatedColumn(calculatedColumn: CalculatedColumn): void;
  editCalculatedColumnExpression(column: string, columnExpression: string): void;
  deleteCalculatedColumn(column: string): void;
}
