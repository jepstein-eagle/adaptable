import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import { AdaptableViewFactory } from '../View/AdaptableViewFactory'
import * as StrategyIds from '../Core/StrategyIds'
import { SmartEditOperation, ColumnType, CellValidationAction } from '../Core/Enums'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { ISmartEditStrategy, ISmartEditPreview, ISmartEditPreviewResult, ISmartEditPreviewReturn } from '../Core/Interface/ISmartEditStrategy'
import { MenuType } from '../Core/Enums';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { ICellValidationRule } from '../Core/Interface/ICellValidationStrategy';
import { SmartEditState } from '../Redux/ActionsReducers/Interface/IState'


export class SmartEditStrategy extends AdaptableStrategyBase implements ISmartEditStrategy {
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.SmartEditStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Smart Edit", this.Id, 'SmartEditAction', MenuType.Action, "pencil");
    }

    public ApplySmartEdit(bypassCellValidationWarnings: boolean): void {
        let thePreview = this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit.Preview
        let newValues: { id: any, columnId: string, value: any }[] = [];
        if (bypassCellValidationWarnings) {
            for (let previewResult of thePreview.PreviewResults) {
                if (previewResult.ValidationRules.filter(p => p.CellValidationAction == CellValidationAction.Prevent).length == 0) {
                    newValues.push({ id: previewResult.Id, columnId: thePreview.ColumnId, value: previewResult.ComputedValue })
                }
            }
        }
        else {
            thePreview.PreviewResults.filter(p => p.ValidationRules.length == 0).forEach(pr => {
                newValues.push({ id: pr.Id, columnId: thePreview.ColumnId, value: pr.ComputedValue })
            })
        }

        this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
            "ApplySmartEdit",
            "",
            { SmartEditValue: this.GetSmartEditState().SmartEditValue, SmartEditOperation: this.GetSmartEditState().SmartEditOperation, NewValues: newValues })

        this.blotter.setValueBatch(newValues)
    }

    public BuildPreviewValues(smartEditValue: number, smartEditOperation: SmartEditOperation): ISmartEditPreviewReturn {
        let selectedCells = this.blotter.getSelectedCells();
        let previewResults: ISmartEditPreviewResult[] = [];
        let columnId: string;
        //if no cells are selected
        if (selectedCells.Selection.size == 0) {
            return {
                Error: {
                    ErrorMsg: "Please select some Cells.\nThat might be caused by the selection mode of the blotter not being Cell or MultiCell"
                }
            }
        }
        for (let pair of selectedCells.Selection) {
            if (pair[1].length > 1) {
                return {
                    Error: {
                        ErrorMsg: "Smart Edit only supports single column edit.\nPlease adjust cell selection."
                    }
                }
            }
            for (var columnValuePair of pair[1]) {
                if (this.blotter.getColumnType(columnValuePair.columnID) != ColumnType.Number) {
                    return {
                        Error: {
                            ErrorMsg: "Smart Edit only supports editing of numeric columns.\nPlease adjust the cell selection."
                        }
                    }

                }
                if (this.blotter.isColumnReadonly(columnValuePair.columnID)) {
                    return {
                        Error: {
                            ErrorMsg: "Smart Edit is not allowed on readonly columns.\nPlease adjust the cell selection."
                        }
                    }

                }
                let newValue: number;
                switch (smartEditOperation) {
                    case SmartEditOperation.Sum:
                        newValue = Number(columnValuePair.value) + smartEditValue
                        break;
                    case SmartEditOperation.Ratio:
                        newValue = Number(columnValuePair.value) * smartEditValue
                        break;
                    case SmartEditOperation.Absolute:
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
                }

                let validationRules: ICellValidationRule[] = this.blotter.AuditService.CheckCellChanging(dataChangedEvent);

                previewResults.push({ Id: pair[0], InitialValue: Number(columnValuePair.value), ComputedValue: newValue, ValidationRules: validationRules })
                columnId = columnValuePair.columnID;
            }
        }

        return {
            ActionReturn: {
                ColumnId: columnId,
                PreviewResults: previewResults
            }
        }
    }

    private GetSmartEditState(): SmartEditState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}