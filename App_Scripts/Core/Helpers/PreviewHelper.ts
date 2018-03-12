import { ExpressionHelper } from '../Helpers/ExpressionHelper'
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy'
import { DataType, CellValidationMode } from '../Enums'
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { StringExtensions } from '../Extensions/StringExtensions'
import { Helper } from './Helper';
import { IColumn } from '../Interface/IColumn';
import { IPreviewValidationSummary, IPreviewResult, IPreviewInfo } from '../Interface/IPreviewResult';


export module PreviewHelper {

    export function GetPreviewValidationSummary(previewResults: IPreviewResult[]): IPreviewValidationSummary {
        let globalHasValidationPrevent = false
        let globalHasValidationWarning = false
        let globalHasOnlyValidationPrevent = true

        previewResults.forEach((previewResult: IPreviewResult) => {
            let hasValidationErrors: boolean = previewResult.ValidationRules.length > 0;
            let localHasValidationPrevent: boolean = previewResult.ValidationRules.filter(x => x.CellValidationMode == CellValidationMode.StopEdit).length > 0
            let localHasValidationWarning: boolean = previewResult.ValidationRules.filter(x => x.CellValidationMode == CellValidationMode.WarnUser).length > 0
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
}

