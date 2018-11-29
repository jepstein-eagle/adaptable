"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../Utilities/Enums");
const StringExtensions_1 = require("../Extensions/StringExtensions");
var PreviewHelper;
(function (PreviewHelper) {
    function GetPreviewValidationSummary(previewResults) {
        let globalHasValidationPrevent = false;
        let globalHasValidationWarning = false;
        let globalHasOnlyValidationPrevent = true;
        previewResults.forEach((previewResult) => {
            let hasValidationErrors = previewResult.ValidationRules.length > 0;
            let localHasValidationPrevent = previewResult.ValidationRules.filter(x => x.ActionMode == Enums_1.ActionMode.StopEdit).length > 0;
            let localHasValidationWarning = previewResult.ValidationRules.filter(x => x.ActionMode == Enums_1.ActionMode.WarnUser).length > 0;
            globalHasValidationPrevent = globalHasValidationPrevent || localHasValidationPrevent;
            globalHasValidationWarning = globalHasValidationWarning || localHasValidationWarning;
            if (!hasValidationErrors || localHasValidationWarning) {
                globalHasOnlyValidationPrevent = false;
            }
        });
        return { HasValidationPrevent: globalHasValidationPrevent, HasValidationWarning: globalHasValidationWarning, HasOnlyValidationPrevent: globalHasOnlyValidationPrevent };
    }
    PreviewHelper.GetPreviewValidationSummary = GetPreviewValidationSummary;
    function GetValidationMessage(previewInfo, newValue) {
        if (previewInfo && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(newValue)) {
            let previewValidationSummary = previewInfo.PreviewValidationSummary;
            if (previewValidationSummary.HasOnlyValidationPrevent) {
                return "All Cell Validations have failed (see Preview for details).";
            }
            else if (previewValidationSummary.HasValidationPrevent && previewValidationSummary.HasValidationWarning) {
                return "Some Cell Validations have failed (see Preview for details).\nYou will be asked to confirm the updates which are set to 'warning' before they will be applied; those which are set to 'prevent' will be ignored.";
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
    PreviewHelper.GetValidationMessage = GetValidationMessage;
    function GetCellInfosFromPreview(previewInfo, bypassCellValidationWarnings) {
        let newValues = [];
        if (bypassCellValidationWarnings) {
            for (let previewResult of previewInfo.PreviewResults) {
                if (previewResult.ValidationRules.filter(p => p.ActionMode == 'Stop Edit').length == 0) {
                    newValues.push({ Id: previewResult.Id, ColumnId: previewInfo.ColumnId, Value: previewResult.ComputedValue });
                }
            }
        }
        else {
            previewInfo.PreviewResults.filter(p => p.ValidationRules.length == 0).forEach(pr => {
                newValues.push({ Id: pr.Id, ColumnId: previewInfo.ColumnId, Value: pr.ComputedValue });
            });
        }
        return newValues;
    }
    PreviewHelper.GetCellInfosFromPreview = GetCellInfosFromPreview;
})(PreviewHelper = exports.PreviewHelper || (exports.PreviewHelper = {}));
