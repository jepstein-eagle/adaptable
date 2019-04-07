import * as React from "react";
import { ExportDestination } from '../../Utilities/Enums';
import { ILiveReport } from "../../Utilities/Interface/Reports/ILiveReport";
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
export interface ReportEntityRowProps extends SharedEntityExpressionRowProps<ReportEntityRow> {
    LiveReports: ILiveReport[];
    onExport: (exportDestination: ExportDestination) => void;
    onReportStopLive: (exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => void;
}
export declare class ReportEntityRow extends React.Component<ReportEntityRowProps, {}> {
    render(): any;
}
