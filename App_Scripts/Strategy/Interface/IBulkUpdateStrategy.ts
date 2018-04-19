import { IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression';
import { MathOperation } from '../../Core/Enums';
import { IStrategyActionReturn } from './IStrategyActionReturn';
import { IPreviewInfo } from '../../Core/Interface/IPreviewResult';
import { ICellInfo } from '../../Core/Interface/Interfaces';

export interface IBulkUpdateStrategy extends IStrategy {
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(BulkUpdateValue: any): IPreviewInfo;
    ApplyBulkUpdate(newValues: ICellInfo[]): void;
}


