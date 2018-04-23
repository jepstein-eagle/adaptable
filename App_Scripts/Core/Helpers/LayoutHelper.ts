import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { Expression } from '../Expression'
import { ExpressionHelper } from '../Helpers/ExpressionHelper'
import { IReport } from '../../Strategy/Interface/IExportStrategy';
import { ReportColumnScope, ReportRowScope, SortOrder } from '../Enums'
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { IColumn } from '../Interface/IColumn';
import { ISelectedCells, IGridSort } from '../Interface/Interfaces';
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'



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
            returnString += getColumnDescription(gs.Column, columns) + getSortOrder(gs.SortOrder)
        })
        return returnString;
    }

    export function getSortOrder(sortOrder: SortOrder): string {
        return (sortOrder == SortOrder.Ascending) ? " [asc] " : " [desc] "
    }

    export function getColumnDescription(columnId: string, columns: IColumn[]): string {
        let column: IColumn = columns.find(c => c.ColumnId == columnId);
        return (column) ? column.FriendlyName : GeneralConstants.MISSING_COLUMN;
    }

}