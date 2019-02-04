import { ICellInfo } from "../Interface/ICellInfo";
import { IPreviewResult, IPreviewValidationSummary, IPreviewInfo } from "../Interface/IPreview";
export declare module PreviewHelper {
    function GetPreviewValidationSummary(previewResults: IPreviewResult[]): IPreviewValidationSummary;
    function GetValidationMessage(previewInfo: IPreviewInfo, newValue: string): string;
    function GetCellInfosFromPreview(previewInfo: IPreviewInfo, bypassCellValidationWarnings: boolean): ICellInfo[];
}
