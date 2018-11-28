import { IStrategy } from './IStrategy';
import { IStrategyActionReturn } from './IStrategyActionReturn';
import { IPreviewInfo } from '../../Core/Interface/IPreview';
import { ICellInfo } from '../../Core/Interface/Interfaces';
export interface IBulkUpdateStrategy extends IStrategy {
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(BulkUpdateValue: any): IPreviewInfo;
    ApplyBulkUpdate(newValues: ICellInfo[]): void;
}
