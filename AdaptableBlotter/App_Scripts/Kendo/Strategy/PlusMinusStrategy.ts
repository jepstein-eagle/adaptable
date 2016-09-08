import {PlusMinusState} from '../../Redux/ActionsReducers/Interface/IState';
import {IPlusMinusStrategy} from '../../Core/Interface/IPlusMinusStrategy';
import {MenuItemShowPopup} from '../../Core/MenuItem';
import {AdaptableStrategyBase} from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import {IMenuItem} from '../../Core/Interface/IStrategy';
import {ColumnType} from '../../Core/Enums'
import {IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter';
import {Helper} from '../../Core/Helper';

export class PlusMinusStrategy extends AdaptableStrategyBase implements IPlusMinusStrategy {
    private menuItemConfig: IMenuItem;
    private PlusMinusState: PlusMinusState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.PlusMinusStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Plus/Minus", this.Id, 'PlusMinusConfig');
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitPlusMinus())
        blotter.OnKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent))
    }

    private InitPlusMinus() {
        if (this.PlusMinusState != this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus) {
            this.PlusMinusState = this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus;
        }
    }

    //we know for Kendo we receive a JQueryKeyEventObject
    private handleKeyDown(keyEvent: JQueryKeyEventObject | KeyboardEvent) {
        //it's a speacial key so we handle the string representation of the key '
        if (Helper.getStringRepresentionFromKey(keyEvent) == "-" || Helper.getStringRepresentionFromKey(keyEvent) == "+") {
            let side = 1
            if (Helper.getStringRepresentionFromKey(keyEvent) == "-") {
                side = -1
            }
            let selectedCell = this.blotter.getSelectedCells()
            for (var keyValuePair of selectedCell.Selection) {
                for (var columnValuePair of keyValuePair[1]) {
                    if (this.blotter.getColumnType(columnValuePair.columnID) == ColumnType.Number) {
                        this.blotter.setValue(keyValuePair[0], columnValuePair.columnID, columnValuePair.value + ( this.PlusMinusState.DefaultNudge * side))
                    }
                }
            }
        }
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}


