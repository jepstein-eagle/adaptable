import * as React from "react";
import { ExpressionEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColumnFilter } from "../../api/Interface/IAdaptableBlotterObjects";
import { AccessLevel } from "../../Utilities/Enums";
export interface ColumnFilterEntityRowProps<AdvancedSearchEntityRow> extends ExpressionEntityRowProps<AdvancedSearchEntityRow> {
    onClear: (columnFilter: IColumnFilter) => void;
    onSaveColumnFilterasUserFilter: (columnFilter: IColumnFilter) => void;
    ColumnFilter: IColumnFilter;
    AccessLevel: AccessLevel;
}
export declare class ColumnFilterEntityRow extends React.Component<ColumnFilterEntityRowProps<ColumnFilterEntityRow>, {}> {
    render(): any;
}
