import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { DataType, MessageType, StateChangedTrigger } from '../Core/Enums'
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IBulkUpdateStrategy } from './Interface/IBulkUpdateStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { BulkUpdateState } from '../Redux/ActionsReducers/Interface/IState'
import { IPreviewInfo, IPreviewResult } from '../Core/Interface/IPreviewResult';
import { ICellInfo } from '../Core/Interface/Interfaces';
import { PreviewHelper } from '../Core/Helpers/PreviewHelper';
import { ICellValidationRule } from '../Core/Api/Interface/AdaptableBlotterObjects';

export class BulkUpdateStrategy extends AdaptableStrategyBase implements IBulkUpdateStrategy {
    protected BulkUpdateState: BulkUpdateState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.BulkUpdateStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.BulkUpdateStrategyName, ScreenPopups.BulkUpdatePopup, StrategyIds.BulkUpdateGlyph);
    }

    protected InitState() {
        if (this.BulkUpdateState != this.GetBulkUpdateState()) {
            this.BulkUpdateState = this.GetBulkUpdateState();
          
            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.BulkUpdate, this.BulkUpdateState)
            }
       
        }
    }
    public ApplyBulkUpdate(newValues: ICellInfo[]): void {

        // this.AuditFunctionAction("ApplyBulkUpdate", "", { BulkUpdateValue: this.GetBulkUpdateState().BulkUpdateValue, NewValues: newValues })

        this.blotter.setValueBatch(newValues)
    }

    public CheckCorrectCellSelection(): IStrategyActionReturn<boolean> {
        let selectedCellInfo = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
        if (selectedCellInfo == null || selectedCellInfo.Selection.size == 0) {
            return {
                Alert: {
                    Header: "Bulk Update Error",
                   Msg: "No cells are selected.\nPlease select some cells.",
                   MessageType: MessageType.Error
                }
            }
        }


        if (selectedCellInfo.Columns.length != 1) {
            return {
                Alert: {
                    Header: "Bulk Update Error",
                    Msg: "Bulk Update only supports single column edit.\nPlease adjust cell selection.",
                    MessageType: MessageType.Error
                }
            }
        }

        if (selectedCellInfo.Columns[0].ReadOnly) {
            return {
                Alert: {
                    Header: "Bulk Update Error",
                    Msg: "Bulk Update is not allowed on readonly columns.\nPlease adjust the cell selection.",
                    MessageType: MessageType.Error
                }
            }

        }
        return { ActionReturn: true };
    }

    public BuildPreviewValues(bulkUpdateValue: any): IPreviewInfo {
        let selectedCells = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
        let previewResults: IPreviewResult[] = [];
        let columnId: string = "";
        if (selectedCells != null && selectedCells.Columns.length > 0) {
            columnId = selectedCells.Columns[0].ColumnId
            let typedBulkUpdateValue;
            switch (selectedCells.Columns[0].DataType) {
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

            for (let pair of selectedCells.Selection) {
                for (let selectedCell of pair[1]) {

                    let dataChangedEvent: IDataChangedEvent = {
                        OldValue: selectedCell.value,
                        NewValue: typedBulkUpdateValue,
                        ColumnId: selectedCell.columnId,
                        IdentifierValue: pair[0],
                        Timestamp: Date.now(),
                        Record: null
                    }

                    let validationRules: ICellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(dataChangedEvent);
                    let previewResult: IPreviewResult = { Id: pair[0], InitialValue: selectedCell.value, ComputedValue: typedBulkUpdateValue, ValidationRules: validationRules }
                    previewResults.push(previewResult)
                }
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