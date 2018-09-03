import * as React from "react";
import { ExpressionEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColumnFilter } from "../../Core/Api/Interface/AdaptableBlotterObjects";
export interface ColumnFilterEntityRowProps<AdvancedSearchEntityRow> extends ExpressionEntityRowProps<AdvancedSearchEntityRow> {
    onClear: (columnFilter: IColumnFilter) => void;
    onSaveColumnFilterasUserFilter: (columnFilter: IColumnFilter) => void;
    ColumnFilter: IColumnFilter;
}
export declare class ColumnFilterEntityRow extends React.Component<ColumnFilterEntityRowProps<ColumnFilterEntityRow>, {}> {
    render(): any;
}
