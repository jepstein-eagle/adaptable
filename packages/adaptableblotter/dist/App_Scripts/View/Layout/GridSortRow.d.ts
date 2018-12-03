import * as React from "react";
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColumn } from "../../api/Interface/IColumn";
import { SortOrder } from "../../Utilities/Enums";
import { IGridSort } from "../../api/Interface/IAdaptableBlotterObjects";
export interface GridSortRowProps<GridSortRow> extends SharedEntityExpressionRowProps<GridSortRow> {
    GridSort: IGridSort;
    onGridSortColumnChanged: (column: IColumn) => void;
    onGridSortOrderChanged: (sortOrder: SortOrder) => void;
    onDeleteGridSort: () => void;
}
export declare class GridSortRow extends React.Component<GridSortRowProps<GridSortRow>, {}> {
    render(): any;
    private onColumnSelectedChanged;
    private onSortOrderChanged;
}
