import * as React from "react";
import { ICellSummmary } from "../../Utilities/Interface/SelectedCell/ICellSummmary";
export interface CellSummaryPopoverProps extends React.ClassAttributes<CellSummaryPopover> {
    cssClassName: string;
    CellSummary: ICellSummmary;
}
export declare class CellSummaryPopover extends React.Component<CellSummaryPopoverProps, {}> {
    render(): any;
}
