import { IStrategy } from './IStrategy';
import { ICellSummmary } from '../../Utilities/Interface/Selection/ICellSummmary';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';

export interface ICellSummaryStrategy extends IStrategy {
  CreateCellSummary(selectedCellInfo: SelectedCellInfo): ICellSummmary;
}
