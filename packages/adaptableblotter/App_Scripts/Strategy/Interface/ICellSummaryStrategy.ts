import { IStrategy } from './IStrategy';
import { ICellSummmary } from '../../Utilities/Interface/SelectedCell/ICellSummmary';
import { ISelectedCellInfo } from '../../Utilities/Interface/SelectedCell/ISelectedCellInfo';

export interface ICellSummaryStrategy extends IStrategy {
    CreateCellSummary(selectedCellInfo: ISelectedCellInfo): ICellSummmary
}


