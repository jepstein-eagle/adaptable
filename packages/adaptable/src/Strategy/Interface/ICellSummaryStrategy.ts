import { IStrategy } from './IStrategy';
import { CellSummmary } from '../../PredefinedConfig/Selection/CellSummmary';
import { SelectedCellInfo } from '../../PredefinedConfig/Selection/SelectedCellInfo';

export interface ICellSummaryStrategy extends IStrategy {
  CreateCellSummary(selectedCellInfo: SelectedCellInfo): CellSummmary;
}
