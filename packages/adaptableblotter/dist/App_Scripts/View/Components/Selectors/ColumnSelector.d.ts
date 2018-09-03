import * as React from "react";
import { SelectionMode } from "../../../Core/Enums";
import { IColumn } from "../../../Core/Interface/IColumn";
export interface ColumnSelectorProps extends React.HTMLProps<ColumnSelector> {
    ColumnList: IColumn[];
    SelectedColumnIds: string[];
    onColumnChange: (SelectedColumns: IColumn[]) => void;
    SelectionMode: SelectionMode;
    className?: string;
    bsSize?: 'large' | 'lg' | 'small' | 'sm';
    cssClassName: string;
}
export declare class ColumnSelector extends React.Component<ColumnSelectorProps, {}> {
    componentWillReceiveProps(nextProps: ColumnSelectorProps, nextContext: any): void;
    render(): JSX.Element;
    onClearButton(): void;
    onColumnChange(selected: IColumn[], isEmptySelection: boolean): void;
}
