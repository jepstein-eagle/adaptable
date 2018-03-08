import { IAdaptableBlotterObject } from '../../Core/Interface/IAdaptableBlotter';
import { IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression';
import { MathOperation } from '../../Core/Enums';
import { IStrategyActionReturn } from './IStrategyActionReturn';
import { IPreviewInfo } from '../../Core/Interface/IPreviewResult';

export interface IBulkUpdateStrategy extends IStrategy {
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(BulkUpdateValue: any): IPreviewInfo;
    ApplyBulkUpdate(bypassCellValidationWarnings: boolean): void;
}


