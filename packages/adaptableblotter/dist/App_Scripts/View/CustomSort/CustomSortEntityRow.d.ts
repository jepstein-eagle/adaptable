import * as React from "react";
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
export interface CustomSortEntityRowProps extends SharedEntityRowProps<CustomSortEntityRow> {
    ColumnLabel: string;
}
export declare class CustomSortEntityRow extends React.Component<CustomSortEntityRowProps, {}> {
    render(): any;
}
