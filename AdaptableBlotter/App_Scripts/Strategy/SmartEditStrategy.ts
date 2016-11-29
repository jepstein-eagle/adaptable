import {MenuItemShowPopup} from '../Core/MenuItem'
import {AdaptableStrategyBase} from '../Core/AdaptableStrategyBase'
import {AdaptableViewFactory} from '../View/AdaptableViewFactory'
import * as StrategyIds from '../Core/StrategyIds'
import {SmartEditOperation, ColumnType} from '../Core/Enums'
import {IMenuItem} from '../Core/Interface/IStrategy';
import {IAdaptableBlotter} from '../Core/Interface/IAdaptableBlotter'
import {ISmartEditStrategy, ISmartEditValueTuple, ISmartEditPreviewReturn} from '../Core/Interface/ISmartEditStrategy'
import {MenuType} from '../Core/Enums';

export class SmartEditStrategy extends AdaptableStrategyBase implements ISmartEditStrategy {
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.SmartEditStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Smart Edit", this.Id, 'SmartEditAction',MenuType.Action,"pencil");
    }

    public ApplySmartEdit(smartEditValue: number, smartEditOperation: SmartEditOperation): void {
        let selectedCells = this.blotter.getSelectedCells();
        let values: ISmartEditValueTuple[] = [];
        let newValues: { id: any, columnId: string, value: any }[] = [];
        for (let pair of selectedCells.Selection) {
            for (var columnValuePair of pair[1]) {
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
                newValues.push({ id: pair[0], columnId: columnValuePair.columnID, value: newValue })
                //this.blotter.setValue(pair[0], columnValuePair.columnID, newValue)
            }
        }
        this.blotter.setValueBatch(newValues)
    }


    public BuildPreviewValues(smartEditValue: number, smartEditOperation: SmartEditOperation): ISmartEditPreviewReturn {
        let selectedCells = this.blotter.getSelectedCells();
        let values: ISmartEditValueTuple[] = [];
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
                values.push({ Id: pair[0], InitialValue: Number(columnValuePair.value), ComputedValue: newValue })

                columnId = columnValuePair.columnID;
            }
        }

        return {
            ActionReturn: {
                ColumnId: columnId,
                InitialValueLabel: this.blotter.getColumnHeader(columnId) + " Initial Value",
                ComputedValueLabel: this.blotter.getColumnHeader(columnId) + " Computed Value",
                Values: values
            }
        }
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}