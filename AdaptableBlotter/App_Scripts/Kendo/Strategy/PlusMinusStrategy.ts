import { PlusMinusState } from '../../Redux/ActionsReducers/Interface/IState';
import { IPlusMinusStrategy } from '../../Core/Interface/IPlusMinusStrategy';
import { MenuItemShowPopup } from '../../Core/MenuItem';
import { AdaptableStrategyBase } from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy';
import { ColumnType } from '../../Core/Enums'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import {MenuType} from '../../Core/Enums';

export class PlusMinusStrategy extends AdaptableStrategyBase implements IPlusMinusStrategy {
    private menuItemConfig: IMenuItem;
    private PlusMinusState: PlusMinusState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.PlusMinusStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Plus/Minus", this.Id, 'PlusMinusConfig', MenuType.Configuration,"plus-sign");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
        blotter.OnKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent))
    }

    private InitState() {
        if (this.PlusMinusState != this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus) {
            this.PlusMinusState = this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus;
        }
    }

    //we know for Kendo we receive a JQueryKeyEventObject
    private handleKeyDown(keyEvent: JQueryKeyEventObject | KeyboardEvent) {
        //it's a speacial key so we handle the string representation of the key '
        if (Helper.getStringRepresentionFromKey(keyEvent) == "-" || Helper.getStringRepresentionFromKey(keyEvent) == "+") {
            let newValues: { id: any, columnId: string, value: any }[] = [];
            let side = 1
            if (Helper.getStringRepresentionFromKey(keyEvent) == "-") {
                side = -1
            }
            let selectedCell = this.blotter.getSelectedCells()
            for (var keyValuePair of selectedCell.Selection) {
                for (var columnValuePair of keyValuePair[1]) {
                    if (this.blotter.getColumnType(columnValuePair.columnID) == ColumnType.Number) {
                        let newValue: { id: any, columnId: string, value: any }
                        //we try to find a condition with an expression for that column that matches the record
                        let columnNudgesWithExpression = this.PlusMinusState.ColumnsDefaultNudge.filter(x => x.ColumnId == columnValuePair.columnID && x.Expression != null)
                        for (let columnNudge of columnNudgesWithExpression) {
                            if (ExpressionHelper.IsSatisfied(columnNudge.Expression,
                                this.blotter.getRecordIsSatisfiedFunction(keyValuePair[0], "getColumnValue"),
                                this.blotter.getRecordIsSatisfiedFunction(keyValuePair[0], "getDisplayColumnValue"),
                                this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns)) {
                                newValue = { id: keyValuePair[0], columnId: columnValuePair.columnID, value: columnValuePair.value + (columnNudge.DefaultNudge * side) }
                            }
                        }
                        //we havent found any Condition with an Expression so we look for a general one for the column
                        if (!newValue) {
                            let columnNudge = this.PlusMinusState.ColumnsDefaultNudge.find(x => x.ColumnId == columnValuePair.columnID && x.Expression == null)
                            if (columnNudge) {
                                newValue = ({ id: keyValuePair[0], columnId: columnValuePair.columnID, value: columnValuePair.value + (columnNudge.DefaultNudge * side) })
                            }
                            //we havent found a condition so we use the general nudge
                            else {
                                newValue = ({ id: keyValuePair[0], columnId: columnValuePair.columnID, value: columnValuePair.value + (this.PlusMinusState.DefaultNudge * side) })
                            }
                        }
                        newValues.push(newValue)
                    }
                }
            }

      //      newValues.forEach((v)=>{
      //          this.blotter.setValue(v.id, v.columnId, v.value);
      //      })
            this.blotter.setValueBatch(newValues);
        
            //I know interface is different but we leverage on the fact that we havent name the interface so they are "compatible" in that order...
            this.blotter.selectCells(newValues);
        }
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}


