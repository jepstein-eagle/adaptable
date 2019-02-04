import { IGridSort } from "../Interface/IGridSort";
import { ILayout } from "../Interface/BlotterObjects/ILayout";
import { IColumn } from '../Interface/IColumn';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
export declare module LayoutHelper {
    function getLayoutDescription(layout: ILayout, columns: IColumn[]): string;
    function getGridSort(gridSorts: IGridSort[], columns: IColumn[]): string;
    function getSortOrder(sortOrder: 'Unknown' | 'Ascending' | 'Descending'): string;
    function autoSaveLayout(blotter: IAdaptableBlotter): void;
}
