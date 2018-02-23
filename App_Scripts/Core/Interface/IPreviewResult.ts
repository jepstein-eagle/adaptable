import { ICellValidationRule } from '../../Strategy/Interface/ICellValidationStrategy';


export interface IPreviewInfo {
    ColumnId: string,
    PreviewResults: IPreviewResult[]
}

export interface IPreviewResult {
    Id: any,
    InitialValue: number,
    ComputedValue: number,
    ValidationRules: ICellValidationRule[]
}