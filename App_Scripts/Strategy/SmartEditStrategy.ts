import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { MathOperation, DataType, CellValidationMode } from '../Core/Enums'
import { IStrategyActionReturn } from '../Strategy/Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { ISmartEditStrategy } from '../Strategy/Interface/ISmartEditStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { SmartEditState } from '../Redux/ActionsReducers/Interface/IState'
import { IPreviewInfo, IPreviewResult } from '../Core/Interface/IPreviewResult';
import { ICellInfo } from '../Core/Interface/Interfaces';
import { IColumn } from '../Core/Interface/IColumn';
import { PreviewHelper } from '../Core/Helpers/PreviewHelper';
import { ICellValidationRule } from '../Core/Api/Interface/AdaptableBlotterObjects';

export class SmartEditStrategy extends AdaptableStrategyBase implements ISmartEditStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.SmartEditStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.SmartEditStrategyName, ScreenPopups.SmartEditPopup, StrategyGlyphs.SmartEditGlyph);
    }

    public ApplySmartEdit(newValues: ICellInfo[]): void {
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

    public BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): IPreviewInfo {
        let selectedCells = this.blotter.getSelectedCells();
        let previewResults: IPreviewResult[] = [];
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
                        newValue = Number(columnValuePair.value) * smartEditValue
                        break;
                    case MathOperation.Divide:
                        newValue = Number(columnValuePair.value) / smartEditValue
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

                let previewResult: IPreviewResult = { Id: pair[0], InitialValue: Number(columnValuePair.value), ComputedValue: newValue, ValidationRules: validationRules }
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

    private GetSmartEditState(): SmartEditState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit;
    }

}