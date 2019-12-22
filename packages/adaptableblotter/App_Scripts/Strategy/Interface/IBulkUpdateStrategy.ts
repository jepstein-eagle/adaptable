import { IStrategy } from './IStrategy';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';

export interface IBulkUpdateStrategy extends IStrategy {
  CheckCorrectCellSelection(): BulkUpdateValidationResult;
  BuildPreviewValues(BulkUpdateValue: any): IPreviewInfo;
  ApplyBulkUpdate(newValues: GridCell[]): void;
}

export interface BulkUpdateValidationResult {
  IsValid: boolean;
  Column?: AdaptableColumn;
  Alert?: AdaptableAlert;
}
