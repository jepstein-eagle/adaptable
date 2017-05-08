import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { SmartEditOperation } from '../Enums';
import { ICellValidationRule } from '../Interface/ICellValidationStrategy';


export interface ISmartEditPreview {
    ColumnId: string,
    PreviewResults: ISmartEditPreviewResult[]
}

export interface ISmartEditPreviewResult {
    Id: any,
    InitialValue: number,
    ComputedValue: number,
    ValidationRules: ICellValidationRule[]
}

export interface ISmartEditStrategy extends IStrategy {
    CheckCorrectCellSelection():IStrategyActionReturn<boolean>;
    BuildPreviewValues(smartEditValue: number, smartEditOperation: SmartEditOperation): ISmartEditPreview;
    ApplySmartEdit(bypassCellValidationWarnings : boolean): void;
}

