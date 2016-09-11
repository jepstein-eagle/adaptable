import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
import {MenuItemShowPopup} from '../../Core/MenuItem';
import {AdaptableStrategyBase} from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import {IMenuItem} from '../../Core/Interface/IStrategy';
import {Helper} from '../../Core/Helper';
import {ColumnType} from '../../Core/Enums'
import {ICalendarService} from '../../Core/Services/Interface/ICalendarService'

import {IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter';

export class ShortcutStrategy extends AdaptableStrategyBase {
    private Shortcuts: IShortcut[]
    private menuItemConfig: IMenuItem;
    private calendarService: ICalendarService; // is there some singleton pattern we need?

    constructor(blotter: IAdaptableBlotter, calendarService: ICalendarService) {
        super(StrategyIds.ShortcutStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Shortcut", this.Id, 'ShortcutConfig');
        this.calendarService = calendarService;
        this.InitShortcut();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitShortcut())
        blotter.OnKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent))
    }

    InitShortcut() {
        if (this.Shortcuts != this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.Shortcuts) {
            this.Shortcuts = this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.Shortcuts;
        }
    }


    private handleKeyDown(keyEvent: JQueryKeyEventObject | KeyboardEvent) {
        for (var shortcut of this.Shortcuts) {
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
                                            NumberToReplace = currentCellValue * shortcut.ShortcutResult;
                                        }
                                        else {
                                            NumberToReplace = columnValuePair.value * shortcut.ShortcutResult;
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
                                             DateToReplace = this.calendarService.GetDynamicDate(shortcut.ShortcutResult);
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

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}


