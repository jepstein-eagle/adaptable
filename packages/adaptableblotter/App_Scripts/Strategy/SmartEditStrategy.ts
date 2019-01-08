import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { MathOperation, DataType, MessageType, StateChangedTrigger } from '../Utilities/Enums'
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter'
import { ISmartEditStrategy } from './Interface/ISmartEditStrategy'
import { SmartEditState } from '../Redux/ActionsReducers/Interface/IState';
import { ICellInfo } from '../Api/Interface/Interfaces';
import { ISelectedCellInfo } from './Interface/ISelectedCellsStrategy';
import { ICellValidationRule } from '../Api/Interface/IAdaptableBlotterObjects';
import { PreviewHelper } from '../Utilities/Helpers/PreviewHelper';
import { IDataChangedInfo } from '../Api/Interface/IDataChangedInfo';
import { IPreviewInfo, IPreviewResult } from '../Utilities/Interface/IPreview';

export class SmartEditStrategy extends AdaptableStrategyBase implements ISmartEditStrategy {
    
    private SmartEditState: SmartEditState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.SmartEditStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.SmartEditStrategyName, ScreenPopups.SmartEditPopup, StrategyConstants.SmartEditGlyph);
    }

    protected InitState() {
        if (this.SmartEditState != this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit) {
            this.SmartEditState = this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit;
       
            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.SmartEdit, this.SmartEditState)
            }
        }
    }

    public ApplySmartEdit(newValues: ICellInfo[]): void {
        this.blotter.setValueBatch(newValues)
    }

    public CheckCorrectCellSelection(): IStrategyActionReturn<boolean> {
        let selectedCellInfo: ISelectedCellInfo = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
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

                let dataChangedEvent: IDataChangedInfo = {
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
