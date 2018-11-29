import * as React from "react";
import { IColumn } from "../../Api/Interface/IColumn";
import { IRange } from "../../Api/Interface/IAdaptableBlotterObjects";
export interface ExpressionBuilderRangesPropsExpressionBuilderRanges extends React.ClassAttributes<ExpressionBuilderRanges> {
    SelectedColumn: IColumn;
    Ranges: Array<IRange>;
    Columns: Array<IColumn>;
    onRangesChange: (Ranges: Array<IRange>) => void;
    cssClassName: string;
}
export declare class ExpressionBuilderRanges extends React.Component<ExpressionBuilderRangesPropsExpressionBuilderRanges, {}> {
    render(): JSX.Element;
    getOperand1FormControl(index: number, range: IRange): any;
    getOperand2FormControl(index: number, range: IRange): any;
    onRangeDelete(index: number): void;
    private addRange;
    private onLeafExpressionOperatorChanged;
    private onRangeTypeChangedOperand1;
    private onRangeTypeChangedOperand2;
    private onOperand1Edit;
    private onOperand2Edit;
    private onColumnOperand1SelectedChanged;
    private onColumnOperand2SelectedChanged;
}
