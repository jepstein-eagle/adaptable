import * as React from "react";
import { LeafExpressionOperator, DataType, DistinctCriteriaPairValue } from '../../../Utilities/Enums';
import { ListGroupProps } from 'react-bootstrap';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { IColumn } from "../../../Core/Interface/IColumn";
import { IRange } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface ListBoxFilterFormProps extends ListGroupProps {
    CurrentColumn: IColumn;
    Columns: IColumn[];
    ColumnValuePairs: Array<IRawValueDisplayValuePair>;
    UserFilters: Array<IRawValueDisplayValuePair>;
    UiSelectedColumnValues: Array<string>;
    UiSelectedUserFilters: Array<string>;
    UiSelectedRange: IRange;
    onColumnValueSelectedChange: (SelectedValues: Array<any>) => void;
    onUserFilterSelectedChange: (SelectedValues: Array<any>) => void;
    onCustomRangeExpressionChange: (rangeExpression: IRange) => void;
    Operators: Array<LeafExpressionOperator>;
    DataType: DataType;
    cssClassName: string;
    DistinctCriteriaPairValue: DistinctCriteriaPairValue;
}
export interface ListBoxFilterFormState extends React.ClassAttributes<ListBoxFilterForm> {
    UiSelectedColumnValues: Array<string>;
    UiSelectedUserFilters: Array<string>;
    UiSelectedRange: IRange;
    FilterValue: string;
    DistinctCriteriaPairValue: DistinctCriteriaPairValue;
}
export declare class ListBoxFilterForm extends React.Component<ListBoxFilterFormProps, ListBoxFilterFormState> {
    constructor(props: ListBoxFilterFormProps);
    componentWillReceiveProps(nextProps: ListBoxFilterFormProps, nextContext: any): void;
    render(): JSX.Element;
    private onLeafExpressionOperatorChange;
    private onRangeTypeChangedOperand1;
    private onRangeTypeChangedOperand2;
    private getOperand1FormControl;
    private getOperand2FormControl;
    private onOperand1Edit;
    private onOperand2Edit;
    private onColumnOperand1SelectedChanged;
    private onColumnOperand2SelectedChanged;
    onUpdateFilterSearch(filterSearch: string): void;
    raiseOnChangeColumnValues(): void;
    raiseOnChangeUserFilter(): void;
    raiseOnChangeCustomExpression(): void;
    onClickItemColumnValue(item: IRawValueDisplayValuePair): void;
    onClickItemUserFilter(item: IRawValueDisplayValuePair): void;
}
