import * as React from "react";
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColumn } from "../../Utilities/Interface/IColumn";
interface CalculatedColumnEntityRowProps<CalculatedColumnEntityRow> extends SharedEntityRowProps<CalculatedColumnEntityRow> {
    Columns: IColumn[];
}
export declare class CalculatedColumnEntityRow extends React.Component<CalculatedColumnEntityRowProps<CalculatedColumnEntityRow>, {}> {
    render(): any;
}
export {};
