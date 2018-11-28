import * as React from "react";
import { IColumn } from '../../Core/Interface/IColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IPercentBar } from "../../Api/Interface/IAdaptableBlotterObjects";
export interface PercentBarEntityRowProps extends SharedEntityExpressionRowProps<PercentBarEntityRow> {
    Column: IColumn;
    ColorPalette: string[];
    onPositiveColorChanged: (PercentBar: IPercentBar, positiveColor: string) => void;
    onNegativeColorChanged: (PercentBar: IPercentBar, negativeColor: string) => void;
}
export declare class PercentBarEntityRow extends React.Component<PercentBarEntityRowProps, {}> {
    render(): any;
    onPositiveColorChanged(event: React.FormEvent<any>): void;
    onNegativeColorChanged(event: React.FormEvent<any>): void;
}
