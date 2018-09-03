import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { DistinctCriteriaPairValue } from '../../../Core/Enums';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
export interface ColumnValueSelectorProps extends React.HTMLProps<ColumnValueSelector> {
    SelectedColumn: IColumn;
    SelectedColumnValue: string;
    onColumnValueChange: (columnvalue: any) => void;
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>;
    AllowNew?: boolean;
    bsSize?: 'large' | 'lg' | 'small' | 'sm';
    cssClassName: string;
}
export declare class ColumnValueSelector extends React.Component<ColumnValueSelectorProps, {}> {
    componentWillReceiveProps(nextProps: ColumnValueSelectorProps, nextContext: any): void;
    render(): JSX.Element;
    onColumnChange(selected: any[]): void;
}
