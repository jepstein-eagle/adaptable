import { IStrategy } from './IStrategy';
import { ISelectedCellSummmary } from '../../Utilities/Interface/SelectedCell/ISelectedCellSummmary';
import { ISelectedCellInfo } from '../../Utilities/Interface/SelectedCell/ISelectedCellInfo';
export interface ISelectedCellsStrategy extends IStrategy {
    CreateSelectedCellSummary(selectedCellInfo: ISelectedCellInfo): ISelectedCellSummmary;
}
