import * as React from "react";
import { SortOrder, SelectionMode } from '../../../Core/Enums';
import { ListGroupProps } from 'react-bootstrap';
export interface SingleListBoxProps extends ListGroupProps {
    Values: Array<any>;
    UiSelectedValues: Array<any>;
    onSelectedChange: (SelectedValues: Array<any>) => void;
    DisplayMember?: string;
    ValueMember?: string;
    SortMember?: string;
    SelectionMode: SelectionMode;
    cssClassName: string;
}
export interface SingleListBoxState extends React.ClassAttributes<SingleListBox> {
    Values: Array<any>;
    UiSelectedValues: Array<any>;
    FilterValue: string;
    SortOrder: SortOrder;
}
export declare class SingleListBox extends React.Component<SingleListBoxProps, SingleListBoxState> {
    constructor(props: SingleListBoxProps);
    componentWillReceiveProps(nextProps: SingleListBoxProps, nextContext: any): void;
    render(): JSX.Element;
    handleChangeFilterValue(x: string): void;
    sortColumnValues(): void;
    raiseOnChange(): void;
    onClickItem(item: any): void;
}
