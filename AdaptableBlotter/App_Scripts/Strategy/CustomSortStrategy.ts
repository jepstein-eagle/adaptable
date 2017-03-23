import { ICustomSort } from '../Core/Interface/ICustomSortStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class CustomSortStrategy extends AdaptableStrategyBase {
    private CustomSorts: ICustomSort[]
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CustomSortStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Custom Sort", 'CustomSortConfig', MenuType.ConfigurationPopup, "sort-by-attributes");
        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }


    InitState() {
        if (this.CustomSorts != this.blotter.AdaptableBlotterStore.TheStore.getState().CustomSort.CustomSorts) {
            this.removeCustomSorts();
            this.CustomSorts = this.blotter.AdaptableBlotterStore.TheStore.getState().CustomSort.CustomSorts;
            this.applyCustomSorts();
        }
    }

    protected addColumnMenuItems(columnId: string): void {
        let label = this.CustomSorts.findIndex(x=>x.ColumnId == columnId)>-1?"Edit ": "Create "
        let popupParam = this.CustomSorts.findIndex(x=>x.ColumnId == columnId)>-1?"Edit|":"New|"
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(this.createMenuItemShowPopup(
                label + "Custom Sort",
                "CustomSortConfig",
                MenuType.ConfigurationPopup,
                "sort-by-attributes",
                popupParam + columnId)))
    }

    removeCustomSorts() {
        if (this.CustomSorts) {
            this.CustomSorts.forEach(customSort => {
                this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                    "RemoveCustomSort",
                    "ColumnId:" + customSort.ColumnId,
                    customSort)
                this.blotter.removeCustomSort(customSort.ColumnId)
            });
        }
    }

    applyCustomSorts() {
        this.CustomSorts.forEach(customSort => {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                "SetCustomSort",
                "ColumnId:" + customSort.ColumnId,
                customSort)
            this.blotter.setCustomSort(customSort.ColumnId, CreateCompareCustomSort(customSort, this.blotter))
        });
    }


}

function CreateCompareCustomSort(customSort: ICustomSort, blotter: IAdaptableBlotter) {
    return function compareItemsOfCustomSort(firstElement: any, secondElement: any): number {
        let firstElementValueString = blotter.getDisplayValue(blotter.getPrimaryKeyValueFromRecord(firstElement), customSort.ColumnId) //firstElement[customSort.ColumnId];
        let secondElementValueString = blotter.getDisplayValue(blotter.getPrimaryKeyValueFromRecord(secondElement), customSort.ColumnId)//secondElement[customSort.ColumnId];
        let firstElementValue = firstElement[customSort.ColumnId];
        let secondElementValue = secondElement[customSort.ColumnId];
        let indexFirstElement = customSort.CustomSortItems.indexOf(firstElementValueString);
        let containsFirstElement = indexFirstElement >= 0;
        let indexSecondElement = customSort.CustomSortItems.indexOf(secondElementValueString);
        let containsSecondElement = indexSecondElement >= 0;
        //if none of the element are in the list we jsut return normal compare
        if (!containsFirstElement && !containsSecondElement) {
            return (firstElementValue < secondElementValue) ? -1 : 1;
        }
        //if first item not in the list make sure we put it after the second item
        if (!containsFirstElement) {
            return 1;
        }
        //if second item not in the list make sure we put it after the first item
        if (!containsSecondElement) {
            return -1;
        }

        //return the comparison from the list if the two items are in the list
        return indexFirstElement - indexSecondElement;
    }
}