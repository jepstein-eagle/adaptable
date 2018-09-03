import * as React from "react";
import { ExportDestination } from '../../Core/Enums';
import { ILiveReport } from '../../Strategy/Interface/IExportStrategy';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
export interface ReportEntityRowProps extends SharedEntityExpressionRowProps<ReportEntityRow> {
    IsLast: boolean;
    LiveReports: ILiveReport[];
    onExport: (exportDestination: ExportDestination) => void;
    onReportStopLive: (exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => void;
}
export declare class ReportEntityRow extends React.Component<ReportEntityRowProps, {}> {
    render(): any;
}
