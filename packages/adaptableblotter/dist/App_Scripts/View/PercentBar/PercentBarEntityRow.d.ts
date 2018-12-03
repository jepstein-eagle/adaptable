import * as React from "react";
import { IColumn } from '../../api/Interface/IColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IPercentBar } from "../../api/Interface/IAdaptableBlotterObjects";
export interface PercentBarEntityRowProps extends SharedEntityExpressionRowProps<PercentBarEntityRow> {
    Column: IColumn;
    ColorPalette: string[];
    onMinimumValueChanged: (PercentBar: IPercentBar, minimumValue: number) => void;
    onMaximumValueChanged: (PercentBar: IPercentBar, maximumValue: number) => void;
    onPositiveColorChanged: (PercentBar: IPercentBar, positiveColor: string) => void;
    onNegativeColorChanged: (PercentBar: IPercentBar, negativeColor: string) => void;
}
export declare class PercentBarEntityRow extends React.Component<PercentBarEntityRowProps, {}> {
    render(): any;
    onMinimumValueChanged(event: React.FormEvent<any>): void;
    onMaximumValueChanged(event: React.FormEvent<any>): void;
    onPositiveColorChanged(event: React.FormEvent<any>): void;
    onNegativeColorChanged(event: React.FormEvent<any>): void;
}
