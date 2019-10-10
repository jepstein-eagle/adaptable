import {
  CalculatedColumnState,
  CalculatedColumn,
} from '../../PredefinedConfig/RunTimeState/CalculatedColumnState';

export interface ICalculatedColumnApi {
  getCalculatedColumnState(): CalculatedColumnState;
  getAllCalculatedColumn(): CalculatedColumn[];
  addCalculatedColumn(calculatedColumn: CalculatedColumn): void;
  editCalculatedColumnExpression(column: string, columnExpression: string): void;
  deleteCalculatedColumn(column: string): void;

  /**
   * Opens the Calculated Column popup screen
   */
  showCalculatedColumnPopup(): void;
}
