import {ICustomSort} from '../../Core/Interface/ICustomSortStrategy';
import {MenuItemShowPopup} from '../../Core/MenuItem';
import {AdaptableStrategyBase} from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'

import {IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter';

export class CustomSortStrategy extends AdaptableStrategyBase {
    private CustomSorts: ICustomSort[]
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CustomSortStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Custom Sort", this.Id, 'CustomSortConfig');
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
            this.blotter.setCustomSort(customSort.ColumnId, CreateCompareCustomSort(customSort))
        });
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}

function CreateCompareCustomSort(customSort: ICustomSort) {
    return function compareItemsOfCustomSort(firstElement: any, secondElement: any): number {
        let firstElementValue = firstElement[customSort.ColumnId];
        let secondElementValue = secondElement[customSort.ColumnId];
        let indexFirstElement = customSort.CustomSortItems.indexOf(firstElementValue);
        let containsFirstElement = indexFirstElement >= 0;
        let indexSecondElement = customSort.CustomSortItems.indexOf(secondElementValue);
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