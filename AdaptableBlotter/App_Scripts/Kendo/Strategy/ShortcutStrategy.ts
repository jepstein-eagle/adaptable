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


    public ApplyShortcut(keyPressed: string): void {
        // TODO: After we do plus / minus and we have the ability to "know" what cell has been clicked and which cell

    }

    private handleKeyDown(keyEvent: JQueryKeyEventObject | KeyboardEvent) {
        for (var shortcut of this.Shortcuts) {
            if (shortcut.IsLive) {
                if (Helper.getStringRepresentionFromKey(keyEvent) == shortcut.ShortcutKey.toLowerCase()) {
//alert(shortcut.ShortcutKey);
                    let selectedCell = this.blotter.getSelectedCells()
                    for (var keyValuePair of selectedCell.Selection) {
                        for (var columnValuePair of keyValuePair[1]) {
                            let columnType: ColumnType = this.blotter.getColumnType(columnValuePair.columnID);
                            switch (columnType) {
                                case ColumnType.Number:
                              let currentCellValue = this.blotter.getCurrentCellEditValue()
                              alert(currentCellValue);

                                    this.blotter.setValue(keyValuePair[0], columnValuePair.columnID, columnValuePair.value * shortcut.ShortcutResult)
                                    break;
                                case ColumnType.String:
                                    // not sure if we will do strings
                                    this.blotter.setValue(keyValuePair[0], columnValuePair.columnID, "hello")
                                    break;
                                case ColumnType.Date:
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


