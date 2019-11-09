import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';

export interface IPreviewInfo {
  ColumnId: string;
  PreviewResults: IPreviewResult[];
  PreviewValidationSummary: IPreviewValidationSummary;
}

export interface IPreviewValidationSummary {
  HasValidationPrevent: boolean;
  HasValidationWarning: boolean;
  HasOnlyValidationPrevent: boolean;
}

export interface IPreviewResult {
  Id: any;
  InitialValue: number;
  ComputedValue: number;
  ValidationRules: CellValidationRule[];
}
