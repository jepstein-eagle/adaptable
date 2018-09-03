import * as React from "react";
import { IColumn } from '../../Core/Interface/IColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
export interface PlusMinusEntityRowProps extends SharedEntityExpressionRowProps<PlusMinusEntityRow> {
    Column: IColumn;
    onColumnDefaultNudgeValueChange: (index: number, event: React.FormEvent<any>) => void;
}
export declare class PlusMinusEntityRow extends React.Component<PlusMinusEntityRowProps, {}> {
    render(): any;
    private wrapExpressionDescription;
}
