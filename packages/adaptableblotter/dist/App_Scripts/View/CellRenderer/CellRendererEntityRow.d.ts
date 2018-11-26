import * as React from "react";
import { IColumn } from '../../Core/Interface/IColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IPercentCellRenderer } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface CellRendererEntityRowProps extends SharedEntityExpressionRowProps<CellRendererEntityRow> {
    Column: IColumn;
    ColorPalette: string[];
    onPositiveColorChanged: (percentCellRenderer: IPercentCellRenderer, positiveColor: string) => void;
    onNegativeColorChanged: (percentCellRenderer: IPercentCellRenderer, negativeColor: string) => void;
}
export declare class CellRendererEntityRow extends React.Component<CellRendererEntityRowProps, {}> {
    render(): any;
    onPositiveColorChanged(event: React.FormEvent<any>): void;
    onNegativeColorChanged(event: React.FormEvent<any>): void;
}
