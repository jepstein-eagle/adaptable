import { IStrategy } from './IStrategy';
import { IStrategyActionReturn } from './IStrategyActionReturn';
import { ICellInfo } from '../../Api/Interface/Interfaces';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';

export interface IBulkUpdateStrategy extends IStrategy {
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(BulkUpdateValue: any): IPreviewInfo;
    ApplyBulkUpdate(newValues: ICellInfo[]): void;
}
