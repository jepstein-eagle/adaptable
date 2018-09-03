import * as React from "react";
export interface ExpressionBuilderColumnValuesProps extends React.ClassAttributes<ExpressionBuilderColumnValues> {
    SelectedValues: Array<any>;
    ColumnValues: Array<any>;
    onColumnValuesChange: (SelectedValues: Array<any>) => void;
    cssClassName: string;
}
export declare class ExpressionBuilderColumnValues extends React.Component<ExpressionBuilderColumnValuesProps, {}> {
    render(): JSX.Element;
}
