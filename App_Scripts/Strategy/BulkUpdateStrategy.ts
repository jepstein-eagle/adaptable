import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { MathOperation, DataType, CellValidationMode } from '../Core/Enums'
import { IStrategyActionReturn } from '../Strategy/Interface/IStrategyActionReturn';
import { IAdaptableBlotter, IColumn, ICellInfo } from '../Core/Interface/IAdaptableBlotter'
import { IBulkUpdateStrategy } from '../Strategy/Interface/IBulkUpdateStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { ICellValidationRule } from '../Strategy/Interface/ICellValidationStrategy';
import { BulkUpdateState } from '../Redux/ActionsReducers/Interface/IState'
import { IPreviewInfo, IPreviewResult } from '../Core/Interface/IPreviewResult';

export class BulkUpdateStrategy extends AdaptableStrategyBase implements IBulkUpdateStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.BulkUpdateStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.BulkUpdateStrategyName, ScreenPopups.BulkUpdatePopup, StrategyGlyphs.BulkUpdateGlyph);
    }

    public ApplyBulkUpdate(bypassCellValidationWarnings: boolean): void {
        let thePreview = this.blotter.AdaptableBlotterStore.TheStore.getState().BulkUpdate.PreviewInfo
        let newValues: ICellInfo[] = [];
        if (bypassCellValidationWarnings) {
            for (let previewResult of thePreview.PreviewResults) {
                if (previewResult.ValidationRules.filter(p => p.CellValidationMode == CellValidationMode.StopEdit).length == 0) {
                    newValues.push({ Id: previewResult.Id, ColumnId: thePreview.ColumnId, Value: previewResult.ComputedValue })
                }
            }
        }
        else {
            thePreview.PreviewResults.filter(p => p.ValidationRules.length == 0).forEach(pr => {
                newValues.push({ Id: pr.Id, ColumnId: thePreview.ColumnId, Value: pr.ComputedValue })
            })
        }

        this.AuditFunctionAction("ApplyBulkUpdate",
            "",
            { BulkUpdateValue: this.GetBulkUpdateState().BulkUpdateValue, NewValues: newValues })

        this.blotter.setValueBatch(newValues)
    }

    public CheckCorrectCellSelection(): IStrategyActionReturn<boolean> {
        let selectedCells = this.blotter.getSelectedCells();
        if (selectedCells.Selection.size == 0) {
            return {
                Error: {
                    ErrorMsg: "No cells are selected.\nPlease select some cells."
                }
            }
        }

        let columnId: string
        for (let pair of selectedCells.Selection) {
            if (pair[1].length > 1) {
                return {
                    Error: {
                        ErrorMsg: "Bulk Update only supports single column edit.\nPlease adjust cell selection."
                    }
                }
            }

            let selectedColumnId: string = pair[1][0].columnID;
            //for multiple range the column can be different for all records
            if (!columnId) {
                columnId = selectedColumnId
            }
            else if (columnId != selectedColumnId) {
                return {
                    Error: {
                        ErrorMsg: "Bulk Update only supports single column edit.\nPlease adjust cell selection."
                    }
                }
            }

            // test column is not readonly
            if (this.blotter.isColumnReadonly(selectedColumnId)) {
                return {
                    Error: {
                        ErrorMsg: "Bulk Update is not allowed on readonly columns.\nPlease adjust the cell selection."
                    }
                }

            }
        }
        return { ActionReturn: true };

    }

    public BuildPreviewValues(bulkUpdateValue: any): IPreviewInfo {
        let selectedCells = this.blotter.getSelectedCells();
        let previewResults: IPreviewResult[] = [];
        let columnId: string;

        for (let pair of selectedCells.Selection) {
            let typedBulkUpdateValue;
            let selectedColumnId: string = pair[1][0].columnID;
            let selectedColumn: IColumn = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == selectedColumnId);
            switch (selectedColumn.DataType) {
                case DataType.Number:
                    typedBulkUpdateValue = Number(bulkUpdateValue);
                    break;
                case DataType.String:
                    typedBulkUpdateValue = bulkUpdateValue;
                    break;
                case DataType.Date:
                    typedBulkUpdateValue = new Date(bulkUpdateValue);
                    break;
            }

            for (var columnValuePair of pair[1]) {

                let dataChangedEvent: IDataChangedEvent = {
                    OldValue: columnValuePair.value,
                    NewValue: typedBulkUpdateValue,
                    ColumnId: columnValuePair.columnID,
                    IdentifierValue: pair[0],
                    Timestamp: Date.now(),
                    Record: null
                }

                let validationRules: ICellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(dataChangedEvent);

                previewResults.push({ Id: pair[0], InitialValue: columnValuePair.value, ComputedValue: typedBulkUpdateValue, ValidationRules: validationRules })
                columnId = columnValuePair.columnID;
            }
        }

        return {

            ColumnId: columnId,
            PreviewResults: previewResults

        }
    }

    private GetBulkUpdateState(): BulkUpdateState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().BulkUpdate;
    }

}