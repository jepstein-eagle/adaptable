import * as React from "react";
import { SortOrder } from '../../../Core/Enums';
export interface ListBoxFilterSortComponentProps extends React.ClassAttributes<ListBoxFilterSortComponent> {
    FilterValue: string;
    SortOrder: SortOrder;
    handleChangeFilterValue: (value: string) => void;
    sortColumnValues: () => void;
}
export declare class ListBoxFilterSortComponent extends React.Component<ListBoxFilterSortComponentProps, {}> {
    render(): JSX.Element;
    handleChangeFilterValue(x: React.FormEvent<any>): void;
    clearFilter(): void;
}
