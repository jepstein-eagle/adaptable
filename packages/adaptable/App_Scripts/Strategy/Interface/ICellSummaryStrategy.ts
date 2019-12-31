import { IStrategy } from './IStrategy';
import { CellSummmary } from '../../Utilities/Interface/Selection/CellSummmary';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';

export interface ICellSummaryStrategy extends IStrategy {
  CreateCellSummary(selectedCellInfo: SelectedCellInfo): CellSummmary;
}
