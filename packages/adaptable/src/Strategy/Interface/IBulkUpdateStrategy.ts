import { IStrategy } from './IStrategy';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { GridCell } from '../../PredefinedConfig/Selection/GridCell';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';

export interface IBulkUpdateStrategy extends IStrategy {
  checkCorrectCellSelection(): BulkUpdateValidationResult;
  buildPreviewValues(BulkUpdateValue: any): IPreviewInfo;
  applyBulkUpdate(newValues: GridCell[]): void;
}

export interface BulkUpdateValidationResult {
  IsValid: boolean;
  Column?: AdaptableColumn;
  Alert?: AdaptableAlert;
}
