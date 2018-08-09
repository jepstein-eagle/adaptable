import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { MathOperation, DataType, MessageType } from '../Core/Enums'
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { ISmartEditStrategy } from './Interface/ISmartEditStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { SmartEditState } from '../Redux/ActionsReducers/Interface/IState'
import { IPreviewInfo, IPreviewResult } from '../Core/Interface/IPreviewResult';
import { ICellInfo } from '../Core/Interface/Interfaces';
import { IColumn } from '../Core/Interface/IColumn';
import { PreviewHelper } from '../Core/Helpers/PreviewHelper';
import { ICellValidationRule } from '../Core/Api/Interface/AdaptableBlotterObjects';
import { ISelectedCell } from './Interface/ISelectedCellsStrategy';

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
        let selectedCellInfo = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
        if (selectedCellInfo == null || selectedCellInfo.Selection.size == 0) {
            return {
                Alert: {
                    Header: "Smart Edit Error",
                    Msg: "No cells are selected.\nPlease select some cells.",
                    MessageType: MessageType.Error
                }
            }
        }

        if (selectedCellInfo.Columns.length != 1) {
            return {
                Alert: {
                    Header: "Smart Edit Error",
                    Msg: "Smart Edit only supports single column edit.\nPlease adjust cell selection.",
                    MessageType: MessageType.Error
                }
            }
        }

       if (selectedCellInfo.Columns[0].DataType != DataType.Number) {
            return {
                Alert: {
                    Header: "Smart Edit Error",
                    Msg: "Smart Edit only supports editing of numeric columns.\nPlease adjust the cell selection.",
                    MessageType: MessageType.Error
                }
            }
        }

        if (selectedCellInfo.Columns[0].ReadOnly) {
            return {
                Alert: {
                    Header: "Smart Edit Error",
                    Msg: "Smart Edit is not allowed on readonly columns.\nPlease adjust the cell selection.",
                    MessageType: MessageType.Error
                }
            }

        }
        return { ActionReturn: true };
    }

    public BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): IPreviewInfo {
        let selectedCells = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
        let previewResults: IPreviewResult[] = [];
        let columnId: string = selectedCells.Columns[0].ColumnId
       
        for (let pair of selectedCells.Selection) {
            for (var selectedCell of pair[1]) {
                let newValue: number;
                switch (smartEditOperation) {
                    case MathOperation.Add:
                        newValue = Number(selectedCell.value) + smartEditValue
                        break;
                    case MathOperation.Subtract:
                        newValue = Number(selectedCell.value) - smartEditValue
                        break;
                    case MathOperation.Multiply:
                        newValue = Number(selectedCell.value) * smartEditValue
                        break;
                    case MathOperation.Divide:
                        newValue = Number(selectedCell.value) / smartEditValue
                        break;
                }
                //avoid the 0.0000000000x 
                newValue = parseFloat(newValue.toFixed(12))

                let dataChangedEvent: IDataChangedEvent = {
                    OldValue: Number(selectedCell.value),
                    NewValue: newValue,
                    ColumnId: selectedCell.columnId,
                    IdentifierValue: pair[0],
                    Timestamp: Date.now(),
                    Record: null
                }

                let validationRules: ICellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(dataChangedEvent);

                let previewResult: IPreviewResult = { Id: pair[0], InitialValue: Number(selectedCell.value), ComputedValue: newValue, ValidationRules: validationRules }
                previewResults.push(previewResult)
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