import { IStrategy } from './IStrategy';
import { IStrategyActionReturn } from './IStrategyActionReturn';
import { IPreviewInfo } from '../../api/Interface/IPreview';
import { ICellInfo } from '../../api/Interface/Interfaces';
export interface IBulkUpdateStrategy extends IStrategy {
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(BulkUpdateValue: any): IPreviewInfo;
    ApplyBulkUpdate(newValues: ICellInfo[]): void;
}
