import { IPreviewResult, IPreviewValidationSummary, IPreviewInfo } from "../../api/Interface/IPreview";
import { ActionMode } from "../Enums";
import { StringExtensions } from "../Extensions/StringExtensions";
import { ICellInfo } from "../../api/Interface/Interfaces";


export module PreviewHelper {

    export function GetPreviewValidationSummary(previewResults: IPreviewResult[]): IPreviewValidationSummary {
        let globalHasValidationPrevent = false
        let globalHasValidationWarning = false
        let globalHasOnlyValidationPrevent = true

        previewResults.forEach((previewResult: IPreviewResult) => {
            let hasValidationErrors: boolean = previewResult.ValidationRules.length > 0;
            let localHasValidationPrevent: boolean = previewResult.ValidationRules.filter(x => x.ActionMode == ActionMode.StopEdit).length > 0
            let localHasValidationWarning: boolean = previewResult.ValidationRules.filter(x => x.ActionMode ==  ActionMode.WarnUser).length > 0
            globalHasValidationPrevent = globalHasValidationPrevent || localHasValidationPrevent;
            globalHasValidationWarning = globalHasValidationWarning || localHasValidationWarning;
            if (!hasValidationErrors || localHasValidationWarning) {
                globalHasOnlyValidationPrevent = false;
            }
        })
        return { HasValidationPrevent: globalHasValidationPrevent, HasValidationWarning: globalHasValidationWarning, HasOnlyValidationPrevent: globalHasOnlyValidationPrevent }
    }

    export function GetValidationMessage(previewInfo: IPreviewInfo, newValue: string): string {
        if (previewInfo && StringExtensions.IsNotNullOrEmpty(newValue)) {
            let previewValidationSummary: IPreviewValidationSummary = previewInfo.PreviewValidationSummary;
            if (previewValidationSummary.HasOnlyValidationPrevent) {
                return "All Cell Validations have failed (see Preview for details)."
            }
            else if (previewValidationSummary.HasValidationPrevent && previewValidationSummary.HasValidationWarning) {
                return "Some Cell Validations have failed (see Preview for details).\nYou will be asked to confirm the updates which are set to 'warning' before they will be applied; those which are set to 'prevent' will be ignored."
            }
            else if (previewValidationSummary.HasValidationWarning) {
                return "Some Cell Validations have failed (see Preview for details).\nYou will be asked to confirm these updates before they will be applied.";
            }
            else if (previewValidationSummary.HasValidationPrevent) {
                return "Some Cell Validations have failed (see Preview for details).\nThese updates will be ignored.";
            }
        }
        return "";
    }


    export function GetCellInfosFromPreview(previewInfo: IPreviewInfo, bypassCellValidationWarnings: boolean): ICellInfo[] {
        let newValues: ICellInfo[] = [];
        if (bypassCellValidationWarnings) {
            for (let previewResult of previewInfo.PreviewResults) {
                if (previewResult.ValidationRules.filter(p => p.ActionMode ==  'Stop Edit').length == 0) {
                    newValues.push({ Id: previewResult.Id, ColumnId: previewInfo.ColumnId, Value: previewResult.ComputedValue })
                }
            }
        }
        else {
            previewInfo.PreviewResults.filter(p => p.ValidationRules.length == 0).forEach(pr => {
                newValues.push({ Id: pr.Id, ColumnId: previewInfo.ColumnId, Value: pr.ComputedValue })
            })
        }

        return newValues;
    }
}

