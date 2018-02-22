import {  IStrategy } from './IStrategy';
import { IStrategyActionReturn } from './IStrategyActionReturn';
import { MathOperation } from '../../Core/Enums';
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
    BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): ISmartEditPreview;
    ApplySmartEdit(bypassCellValidationWarnings : boolean): void;
}

