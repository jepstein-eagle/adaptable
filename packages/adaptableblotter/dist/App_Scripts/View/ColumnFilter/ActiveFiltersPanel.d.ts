import * as React from "react";
import { IColumn } from "../../Utilities/Interface/IColumn";
import { IColumnFilter } from "../../Utilities/Interface/BlotterObjects/IColumnFilter";
import { AccessLevel } from "../../Utilities/Enums";
export interface ActiveFiltersPanelProps extends React.ClassAttributes<ActiveFiltersPanel> {
    ColumnFilters: IColumnFilter[];
    Columns: IColumn[];
    cssClassName: string;
    AccessLevel: AccessLevel;
    onClear: (columnFilter: IColumnFilter) => void;
    onSaveColumnFilterasUserFilter: (columnFilter: IColumnFilter) => void;
}
export declare class ActiveFiltersPanel extends React.Component<ActiveFiltersPanelProps, {}> {
    render(): any;
    private createRow;
}
