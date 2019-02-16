import * as React from "react";
import { ICellSummmary } from "../../Utilities/Interface/SelectedCell/ICellSummmary";
interface CellSummaryDetailsProps extends React.ClassAttributes<CellSummaryDetails> {
    CellSummary: ICellSummmary;
    cssClassName: string;
}
export declare class CellSummaryDetails extends React.Component<CellSummaryDetailsProps, {}> {
    render(): JSX.Element;
    private createRow;
}
export {};
