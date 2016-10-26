import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
import { MenuItemShowPopup } from '../../Core/MenuItem';
import { AdaptableStrategyBase } from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy';

import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';

export class CustomSortStrategy extends AdaptableStrategyBase {
    private CustomSorts: ICustomSort[]
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CustomSortStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Custom Sort", this.Id, 'CustomSortConfig', "sort-by-attributes");
        this.InitCustomSort();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitCustomSort())
    }


    InitCustomSort() {
        if (this.CustomSorts != this.blotter.AdaptableBlotterStore.TheStore.getState().CustomSort.CustomSorts) {
            this.removeCustomSorts();
            this.CustomSorts = this.blotter.AdaptableBlotterStore.TheStore.getState().CustomSort.CustomSorts;
            this.applyCustomSorts();
        }
    }

    removeCustomSorts() {
        if (this.CustomSorts) {
            this.CustomSorts.forEach(customSort => {
                this.blotter.removeCustomSort(customSort.ColumnId)
            });
        }
    }

    applyCustomSorts() {
        this.CustomSorts.forEach(customSort => {
            this.blotter.setCustomSort(customSort.ColumnId, CreateCompareCustomSort(customSort, this.blotter))
        });
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}

function CreateCompareCustomSort(customSort: ICustomSort, blotter: IAdaptableBlotter) {
    return function compareItemsOfCustomSort(firstElement: any, secondElement: any): number {
        let firstElementValueString = blotter.getDisplayValue(firstElement.uid, customSort.ColumnId) //firstElement[customSort.ColumnId];
        let secondElementValueString = blotter.getDisplayValue(secondElement.uid, customSort.ColumnId)//secondElement[customSort.ColumnId];
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