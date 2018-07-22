import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import * as GeneralConstants from '../Constants/GeneralConstants'
import { IGridSort, ILayout } from '../Api/Interface/AdaptableBlotterObjects';
import { SortOrder } from '../Enums';
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from './ColumnHelper';



export module LayoutHelper {

    export function getLayoutDescription(layout: ILayout, columns: IColumn[]): string {
        let returnString: string = "";
        let gridSorts: IGridSort[] = layout.GridSorts;
        returnString += layout.Columns.length + " Columns; ";
        returnString += "\n"
        returnString += " Sort: " + getGridSort(layout.GridSorts, columns);
        return returnString;
    }

    export function getGridSort(gridSorts: IGridSort[], columns: IColumn[]): string {
        if (gridSorts.length == 0) {
            return "None";
        }

        let returnString: string = ""
        gridSorts.forEach((gs: IGridSort) => {
            returnString += ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) + getSortOrder(gs.SortOrder)
        })
        return returnString;
    }

    export function getSortOrder(sortOrder: 'Unknown' |'Ascending'|'Descending'): string {
        return (sortOrder == SortOrder.Ascending) ? " [asc] " : " [desc] "
    }

   


    
}