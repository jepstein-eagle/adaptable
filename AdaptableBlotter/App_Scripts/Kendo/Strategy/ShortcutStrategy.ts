import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
import {MenuItemShowPopup} from '../../Core/MenuItem';
import {AdaptableStrategyBase} from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import {IMenuItem} from '../../Core/Interface/IStrategy';
import {Helper} from '../../Core/Helper';
import {ColumnType} from '../../Core/Enums'

import {IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter';

export class ShortcutStrategy extends AdaptableStrategyBase {
    private Shortcuts: IShortcut[]
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ShortcutStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Shortcut", this.Id, 'ShortcutConfig');
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

                                    // Another complication is that the cell might have been edited or not, so we need to work out which method to use...
                                    var isEditing = this.blotter.gridHasCurrentEditValue();
                                    if (isEditing) {
                                        let currentCellValue = this.blotter.getCurrentCellEditValue()
                                        this.blotter.setValue(keyValuePair[0], columnValuePair.columnID, currentCellValue * shortcut.ShortcutResult)
                                    }
                                    else {
                                        this.blotter.setValue(keyValuePair[0], columnValuePair.columnID, columnValuePair.value * shortcut.ShortcutResult)
                                    }
                                    break;
                                case ColumnType.Date:
                                    // Date we ONLY replace so dont need to worry about editing values
                                    this.blotter.setValue(keyValuePair[0], columnValuePair.columnID, shortcut.ShortcutResult)
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


