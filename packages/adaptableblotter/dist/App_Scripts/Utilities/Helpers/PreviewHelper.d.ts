import { IPreviewResult, IPreviewValidationSummary, IPreviewInfo } from "../../Api/Interface/IPreview";
import { ICellInfo } from "../../api/Interface/Interfaces";
export declare module PreviewHelper {
    function GetPreviewValidationSummary(previewResults: IPreviewResult[]): IPreviewValidationSummary;
    function GetValidationMessage(previewInfo: IPreviewInfo, newValue: string): string;
    function GetCellInfosFromPreview(previewInfo: IPreviewInfo, bypassCellValidationWarnings: boolean): ICellInfo[];
}
