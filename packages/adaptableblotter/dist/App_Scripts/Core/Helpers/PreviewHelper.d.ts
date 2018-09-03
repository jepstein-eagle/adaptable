import { IPreviewValidationSummary, IPreviewResult, IPreviewInfo } from '../Interface/IPreviewResult';
import { ICellInfo } from '../Interface/Interfaces';
export declare module PreviewHelper {
    function GetPreviewValidationSummary(previewResults: IPreviewResult[]): IPreviewValidationSummary;
    function GetValidationMessage(previewInfo: IPreviewInfo, newValue: string): string;
    function GetCellInfosFromPreview(previewInfo: IPreviewInfo, bypassCellValidationWarnings: boolean): ICellInfo[];
}
