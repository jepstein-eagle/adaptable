import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { MathOperation, DataType } from '../Core/Enums'
import { IStrategyActionReturn } from '../Strategy/Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IBulkUpdateStrategy } from '../Strategy/Interface/IBulkUpdateStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { BulkUpdateState } from '../Redux/ActionsReducers/Interface/IState'
import { IPreviewInfo, IPreviewResult } from '../Core/Interface/IPreviewResult';
import { ICellInfo } from '../Core/Interface/Interfaces';
import { IColumn } from '../Core/Interface/IColumn';
import { PreviewHelper } from '../Core/Helpers/PreviewHelper';
import { ICellValidationRule } from '../Core/Api/Interface/AdaptableBlotterObjects';

export class BulkUpdateStrategy extends AdaptableStrategyBase implements IBulkUpdateStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.BulkUpdateStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.BulkUpdateStrategyName, ScreenPopups.BulkUpdatePopup, StrategyGlyphs.BulkUpdateGlyph);
    }

    public ApplyBulkUpdate(newValues: ICellInfo[]): void {
      
       // this.AuditFunctionAction("ApplyBulkUpdate", "", { BulkUpdateValue: this.GetBulkUpdateState().BulkUpdateValue, NewValues: newValues })

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

                let previewResult: IPreviewResult = { Id: pair[0], InitialValue: columnValuePair.value, ComputedValue: typedBulkUpdateValue, ValidationRules: validationRules }

                previewResults.push(previewResult)
                columnId = columnValuePair.columnID;
            }
        }

        return {
            ColumnId: columnId,
            PreviewResults: previewResults,
            PreviewValidationSummary: PreviewHelper.GetPreviewValidationSummary(previewResults)
        }
    }

    private GetBulkUpdateState(): BulkUpdateState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().BulkUpdate;
    }

}