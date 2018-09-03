import * as React from "react";
export interface ExpressionBuilderUserFilterProps extends React.ClassAttributes<ExpressionBuilderUserFilter> {
    AvailableFilterNames: Array<string>;
    SelectedFilterNames: Array<string>;
    onFilterNameChange: (selectedFilterNames: Array<string>) => void;
    cssClassName: string;
}
export declare class ExpressionBuilderUserFilter extends React.Component<ExpressionBuilderUserFilterProps, {}> {
    render(): any;
    onClickColum(filterName: string): void;
}
