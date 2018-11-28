import * as React from "react";
import { DropdownButton, MenuItem, Col, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ExportDestination } from '../../Core/Enums';
import { ReportHelper } from '../../Core/Helpers/ReportHelper';
import { OpenfinHelper } from '../../Core/Helpers/OpenfinHelper';
import { ILiveReport } from '../../Strategy/Interface/IExportStrategy';
import { iPushPullHelper } from '../../Core/Helpers/iPushPullHelper';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { IReport } from "../../Api/Interface/IAdaptableBlotterObjects";
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'

export interface ReportEntityRowProps extends SharedEntityExpressionRowProps<ReportEntityRow> {
    IsLast: boolean
    LiveReports: ILiveReport[]
    onExport: (exportDestination: ExportDestination) => void;
    onReportStopLive: (exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => void,
}

export class ReportEntityRow extends React.Component<ReportEntityRowProps, {}> {
    render(): any {
        let report: IReport = this.props.AdaptableBlotterObject as IReport;
        let csvMenuItem: any = <MenuItem onClick={() => this.props.onExport(ExportDestination.CSV)} key={"csv"}>{"Export to CSV"}</MenuItem>
        let clipboardMenuItem: any = <MenuItem onClick={() => this.props.onExport(ExportDestination.Clipboard)} key={"clipboard"}> {"Export to Clipboard"}</MenuItem>
        let openfinExcelMenuItem = (this.props.LiveReports.find(x => x.Report == report.Name)) ?
            <MenuItem onClick={() => this.props.onReportStopLive(ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Stop Live Openfin Excel"}</MenuItem>
            : <MenuItem onClick={() => this.props.onExport(ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Start Live Openfin Excel"}</MenuItem>

        let iPushPullExcelMenuItem = (this.props.LiveReports.find(x => x.Report == report.Name && x.ExportDestination == ExportDestination.iPushPull)) ?
            <MenuItem onClick={() => this.props.onReportStopLive(ExportDestination.iPushPull)} key={"IPPExcel"}> {"Stop Sync with iPushPull"}</MenuItem>
            : <MenuItem onClick={() => this.props.onExport(ExportDestination.iPushPull)} key={"IPPExcel"}> {"Start Sync with iPushPull"}</MenuItem>


        let exportGlyph: any = <Glyphicon glyph={StrategyConstants.ExportGlyph} />
        // let hasLive = this.props.LiveReports.find(x => x.Report == report.Name && x.ExportDestination == ExportDestination.iPushPull) != null
        let isSystemReport: boolean = ReportHelper.IsSystemReport(report)

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = report.Name
        colItems[1].Content = ReportHelper.GetReportColumnsDescription(report, this.props.Columns)
        colItems[2].Content = ReportHelper.GetReportExpressionDescription(report, this.props.Columns, this.props.UserFilters)

        let exportButton = <OverlayTrigger overlay={<Tooltip id="tooltipButton" > {"Export Report"}</Tooltip >}>
            <DropdownButton
                bsSize={"small"}
                bsStyle={"default"}
                title={exportGlyph}
                key={report.Name}
                id={report.Name}                >
                {csvMenuItem}
                {clipboardMenuItem}
                {OpenfinHelper.isRunningInOpenfin() && OpenfinHelper.isExcelOpenfinLoaded() && openfinExcelMenuItem}
                {iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem}
            </DropdownButton>
        </OverlayTrigger>

        colItems[3].Content = exportButton

        let buttons: any = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, report)}
            overrideDisableEdit={isSystemReport}
            overrideDisableDelete={isSystemReport}
            overrideDisableShare={isSystemReport}
            showShare={this.props.TeamSharingActivated}
            shareClick={() => this.props.onShare()}
            EntityName="Report" />

        colItems[4].Content = buttons

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }
}
