import * as React from "react";
import { IColumn } from '../../../Api/Interface/IColumn';
import { IAdaptableBlotter } from "../../../api/Interface/IAdaptableBlotter";
export interface ColumnValueSelectorProps extends React.HTMLProps<ColumnValueSelector> {
    SelectedColumn: IColumn;
    SelectedColumnValue: string;
    onColumnValueChange: (columnvalue: any) => void;
    Blotter: IAdaptableBlotter;
    AllowNew?: boolean;
    bsSize?: 'large' | 'lg' | 'small' | 'sm';
    cssClassName: string;
}
export declare class ColumnValueSelector extends React.Component<ColumnValueSelectorProps, {}> {
    componentWillReceiveProps(nextProps: ColumnValueSelectorProps, nextContext: any): void;
    render(): JSX.Element;
    onColumnChange(selected: any[]): void;
}
