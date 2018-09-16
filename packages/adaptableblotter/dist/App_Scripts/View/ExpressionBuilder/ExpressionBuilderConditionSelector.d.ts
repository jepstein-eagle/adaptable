import * as React from "react";
import { IColumn } from '../../Core/Interface/IColumn';
import { ExpressionMode, QueryBuildStatus, QueryTab } from '../../Core/Enums';
import { IUserFilter, IRange } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { Expression } from "../../Core/Api/Expression";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
export interface ExpressionBuilderConditionSelectorProps extends React.ClassAttributes<ExpressionBuilderConditionSelector> {
    ColumnsList: Array<IColumn>;
    Expression: Expression;
    ExpressionMode: ExpressionMode;
    onExpressionChange: (Expression: Expression) => void;
    onSelectedColumnChange: (ColumnId: string, Tab: QueryTab) => void;
    UserFilters: IUserFilter[];
    SystemFilters: string[];
    SelectedColumnId: string;
    SelectedTab: QueryTab;
    QueryBuildStatus: QueryBuildStatus;
    cssClassName: string;
    Blotter: IAdaptableBlotter;
}
export interface ExpressionBuilderConditionSelectorState {
    SelectedColumnId: string;
    ColumnValues: Array<any>;
    SelectedColumnValues: Array<any>;
    AllFilterExpresions: Array<string>;
    SelectedFilterExpressions: Array<string>;
    SelectedColumnRanges: Array<IRange>;
    QueryBuildStatus: QueryBuildStatus;
    ShowWaitingMessage: boolean;
    SelectedTab: QueryTab;
}
export declare class ExpressionBuilderConditionSelector extends React.Component<ExpressionBuilderConditionSelectorProps, ExpressionBuilderConditionSelectorState> {
    constructor(props: ExpressionBuilderConditionSelectorProps);
    componentWillReceiveProps(nextProps: ExpressionBuilderConditionSelectorProps, nextContext: any): void;
    private buildState;
    private buildColumnValuesState;
    render(): JSX.Element;
    onSelectTab(): any;
    onTabChanged(tab: QueryTab): any;
    onSelectedColumnChanged(): void;
    onSelectedColumnRangesChange(selectedRanges: Array<IRange>): void;
    onSelectedColumnValuesChange(selectedColumnValues: Array<any>): void;
    onSelectedFiltersChanged(selectedFilters: Array<string>): void;
    private onColumnSelectChange;
}
