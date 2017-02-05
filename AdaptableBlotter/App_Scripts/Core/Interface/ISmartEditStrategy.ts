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
    BuildPreviewValues(smartEditValue: number, smartEditOperation: SmartEditOperation): ISmartEditPreviewReturn;
    ApplySmartEdit(preview: ISmartEditPreview): void;
}

export interface ISmartEditPreviewReturn extends IStrategyActionReturn<ISmartEditPreview> {

}