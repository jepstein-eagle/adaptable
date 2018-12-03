import * as React from "react";
import { IColumn } from '../../api/Interface/IColumn';
import { QueryTab } from '../../Utilities/Enums';
import { IUserFilter } from "../../api/Interface/IAdaptableBlotterObjects";
import { Expression } from "../../api/Expression";
export interface ExpressionBuilderPreviewProps extends React.ClassAttributes<ExpressionBuilderPreview> {
    Expression: Expression;
    UserFilters: IUserFilter[];
    onSelectedColumnChange: (ColumnId: string, tab: QueryTab) => void;
    ColumnsList: Array<IColumn>;
    DeleteRange: (ColumnId: string, index: number) => void;
    DeleteUserFilterExpression: (ColumnId: string, index: number) => void;
    DeleteColumnValue: (ColumnId: string, ColumnValue: any) => void;
    DeleteAllColumnExpression: (ColumnId: string) => void;
    ShowPanel: boolean;
    ReadOnlyMode?: boolean;
    cssClassName: string;
}
export declare class ExpressionBuilderPreview extends React.Component<ExpressionBuilderPreviewProps, {}> {
    componentWillReceiveProps(nextProps: ExpressionBuilderPreviewProps, nextContext: any): void;
    render(): JSX.Element;
    onColumnHeaderSelected(columnId: string): void;
    ensureSelectedColumnVisible(columnId: string): void;
    private getOperand1Value;
    private getOperand2Value;
}
