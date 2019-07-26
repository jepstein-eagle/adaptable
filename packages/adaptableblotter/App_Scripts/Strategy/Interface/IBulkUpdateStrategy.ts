import { IStrategy } from './IStrategy';
import { IStrategyActionReturn, BulkUpdateValidationResult } from './IStrategyActionReturn';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { GridCell } from '../../Utilities/Interface/SelectedCell/GridCell';

export interface IBulkUpdateStrategy extends IStrategy {
  CheckCorrectCellSelection(): BulkUpdateValidationResult;
  BuildPreviewValues(BulkUpdateValue: any): IPreviewInfo;
  ApplyBulkUpdate(newValues: GridCell[]): void;
}
