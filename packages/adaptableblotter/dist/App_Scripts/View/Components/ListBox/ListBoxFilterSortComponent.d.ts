import * as React from "react";
import { SortOrder } from '../../../Utilities/Enums';
export interface ListBoxFilterSortComponentProps extends React.ClassAttributes<ListBoxFilterSortComponent> {
    FilterValue: string;
    SortOrder: SortOrder;
    handleChangeFilterValue: (value: string) => void;
    sortColumnValues: () => void;
    DisableSort: boolean;
}
export declare class ListBoxFilterSortComponent extends React.Component<ListBoxFilterSortComponentProps, {}> {
    render(): JSX.Element;
    handleChangeFilterValue(x: React.FormEvent<any>): void;
    clearFilter(): void;
}
