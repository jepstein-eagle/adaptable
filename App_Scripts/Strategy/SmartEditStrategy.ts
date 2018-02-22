import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { MathOperation, DataType, CellValidationMode } from '../Core/Enums'
import { IStrategyActionReturn } from '../Strategy/Interface/IStrategyActionReturn';
import { IAdaptableBlotter, IColumn, ICellInfo } from '../Core/Interface/IAdaptableBlotter'
import { ISmartEditStrategy, ISmartEditPreview, ISmartEditPreviewResult } from '../Strategy/Interface/ISmartEditStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { ICellValidationRule } from '../Strategy/Interface/ICellValidationStrategy';
import { SmartEditState } from '../Redux/ActionsReducers/Interface/IState'

export class SmartEditStrategy extends AdaptableStrategyBase implements ISmartEditStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.SmartEditStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.SmartEditStrategyName, ScreenPopups.SmartEditPopup, StrategyGlyphs.SmartEditGlyph);
    }

    public ApplySmartEdit(bypassCellValidationWarnings: boolean): void {
        let thePreview = this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit.Preview
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

        this.AuditFunctionAction("ApplySmartEdit",
            "",
            { SmartEditValue: this.GetSmartEditState().SmartEditValue, SmartEditOperation: this.GetSmartEditState().SmartEditOperation, NewValues: newValues })

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
                        ErrorMsg: "Smart Edit only supports single column edit.\nPlease adjust cell selection."
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
                        ErrorMsg: "Smart Edit only supports single column edit.\nPlease adjust cell selection."
                    }
                }
            }

            // test column is numeric
            let selectedColumn: IColumn = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == selectedColumnId);
            if (selectedColumn.DataType != DataType.Number) {
                return {
                    Error: {
                        ErrorMsg: "Smart Edit only supports editing of numeric columns.\nPlease adjust the cell selection."
                    }
                }
            }

            // test column is not readonly
            if (this.blotter.isColumnReadonly(selectedColumnId)) {
                return {
                    Error: {
                        ErrorMsg: "Smart Edit is not allowed on readonly columns.\nPlease adjust the cell selection."
                    }
                }

            }
        }
        return { ActionReturn: true };

    }

    public BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): ISmartEditPreview {
        let selectedCells = this.blotter.getSelectedCells();
        let previewResults: ISmartEditPreviewResult[] = [];
        let columnId: string;

        for (let pair of selectedCells.Selection) {


            for (var columnValuePair of pair[1]) {


                let newValue: number;
                switch (smartEditOperation) {
                    case MathOperation.Add:
                        newValue = Number(columnValuePair.value) + smartEditValue
                        break;
                    case MathOperation.Subtract:
                        newValue = Number(columnValuePair.value) - smartEditValue
                        break;
                    case MathOperation.Multiply:
                        newValue = Number(columnValuePair.value) + smartEditValue
                        break;
                    case MathOperation.Divide:
                        newValue = Number(columnValuePair.value) / smartEditValue
                        break;
                    case MathOperation.Replace:
                        newValue = smartEditValue
                        break;
                }
                //avoid the 0.0000000000x 
                newValue = parseFloat(newValue.toFixed(12))

                let dataChangedEvent: IDataChangedEvent = {
                    OldValue: Number(columnValuePair.value),
                    NewValue: newValue,
                    ColumnId: columnValuePair.columnID,
                    IdentifierValue: pair[0],
                    Timestamp: Date.now(),
                    Record: null
                }

                let validationRules: ICellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(dataChangedEvent);

                previewResults.push({ Id: pair[0], InitialValue: Number(columnValuePair.value), ComputedValue: newValue, ValidationRules: validationRules })
                columnId = columnValuePair.columnID;
            }
        }

        return {

            ColumnId: columnId,
            PreviewResults: previewResults

        }
    }

    private GetSmartEditState(): SmartEditState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit;
    }

}