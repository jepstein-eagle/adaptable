import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
import {MenuItemShowPopup} from '../../Core/MenuItem';
import {AdaptableStrategyBase} from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import {IMenuItem} from '../../Core/Interface/IStrategy';
import {Helper} from '../../Core/Helper';
import {ColumnType} from '../../Core/Enums'
import {ShortcutAction} from '../../Core/Enums'
import {ICalendarService} from '../../Core/Services/Interface/ICalendarService'

import {IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter';

export class ShortcutStrategy extends AdaptableStrategyBase {
    private NumericShortcuts: IShortcut[]
    private DateShortcuts: IShortcut[]
    private menuItemConfig: IMenuItem;


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ShortcutStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Shortcut", this.Id, 'ShortcutConfig');
        this.InitShortcut();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitShortcut())
        blotter.OnKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent))
    }


    InitShortcut() {
        if (this.NumericShortcuts != this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.NumericShortcuts) {
            this.NumericShortcuts = this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.NumericShortcuts;
        }
        if (this.DateShortcuts != this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.DateShortcuts) {
            this.DateShortcuts = this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.DateShortcuts;
        }
    }

    private handleKeyDown(keyEvent: JQueryKeyEventObject | KeyboardEvent) {
        
        for (var shortcut of this.NumericShortcuts.concat(this.DateShortcuts)) {
            if (shortcut.IsLive) {
                if (Helper.getStringRepresentionFromKey(keyEvent) == shortcut.ShortcutKey.toLowerCase()) {
                    let selectedCell = this.blotter.getSelectedCells()
                    for (var keyValuePair of selectedCell.Selection) {
                        for (var columnValuePair of keyValuePair[1]) {
                            let columnType: ColumnType = this.blotter.getColumnType(columnValuePair.columnID);
                            switch (columnType) {
                                case ColumnType.Number:
                                    if (shortcut.ColumnType == ColumnType.Number) {
                                        var NumberToReplace: Number;
                                        // Another complication is that the cell might have been edited or not, so we need to work out which method to use...
                                        if (this.blotter.gridHasCurrentEditValue()) {
                                            let currentCellValue = this.blotter.getCurrentCellEditValue()
                                            NumberToReplace = this.CalculateShortcut(currentCellValue, shortcut.ShortcutResult, shortcut.ShortcutAction);
                                        }
                                        else {
                                            NumberToReplace = this.CalculateShortcut(columnValuePair.value, shortcut.ShortcutResult, shortcut.ShortcutAction);
                                        }
                                        this.blotter.setValue(keyValuePair[0], columnValuePair.columnID, NumberToReplace);
                                        // useful feature - prevents the main thing happening you want to on the keypress.
                                        keyEvent.preventDefault();
                                    }
                                    break;
                                case ColumnType.Date:
                                    // Date we ONLY replace so dont need to worry about editing values
                                    if (shortcut.ColumnType == ColumnType.Date) {
                                        var DateToReplace: Date;
                                        if (shortcut.IsDynamic) {
                                            DateToReplace = this.CalendarService.GetDynamicDate(shortcut.ShortcutResult);
                                        } else {
                                            DateToReplace = shortcut.ShortcutResult;
                                        }
                                        this.blotter.setValue(keyValuePair[0], columnValuePair.columnID, DateToReplace);
                                        // useful feature - prevents the main thing happening you want to on the keypress.
                                        keyEvent.preventDefault();

                                    }
                                    break;
                            }

                        }
                    }
                }
            }
        }
    }

    private CalculateShortcut(first: number, second: number, shortcutAction: ShortcutAction): number {
        let firstNumber: number = Number(first);
        let secondNumber: number = Number(second);

        switch (shortcutAction) {
            case ShortcutAction.Add:
                return firstNumber + secondNumber;
            case ShortcutAction.Subtract:
                return (firstNumber - secondNumber);
            case ShortcutAction.Multiply:
                return (firstNumber * secondNumber);
            case ShortcutAction.Divide:
                return (firstNumber / secondNumber);
            case ShortcutAction.Replace:
                return secondNumber;
        }
    }


    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}


