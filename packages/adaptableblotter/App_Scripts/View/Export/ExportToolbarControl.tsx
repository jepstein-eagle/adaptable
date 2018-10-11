import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { DropdownButton, MenuItem, SplitButton, OverlayTrigger, Tooltip, Glyphicon, InputGroup } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../Core/Interface/IColumn';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
//import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helpers/Helper';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonClear } from "../Components/Buttons/ButtonClear";
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { ExportDestination, SortOrder, AccessLevel } from '../../Core/Enums';
import { OpenfinHelper } from '../../Core/Helpers/OpenfinHelper';
import { iPushPullHelper } from '../../Core/Helpers/iPushPullHelper';
import { ILiveReport } from "../../Strategy/Interface/IExportStrategy";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import { IReport } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ReportHelper } from "../../Core/Helpers/ReportHelper";
import { EntitlementHelper } from "../../Core/Helpers/EntitlementHelper";
import { IEntitlement } from "../../Core/Interface/Interfaces";


interface ExportToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ExportToolbarControlComponent> {
    onApplyExport: (Report: string, exportDestination: ExportDestination) => ExportRedux.ExportApplyAction;
    onSelectReport: (Report: string) => ExportRedux.ReportSelectAction;
    onNewReport: () => PopupRedux.PopupShowScreenAction;
    onEditReport: () => PopupRedux.PopupShowScreenAction;
    onReportStopLive: (Report: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => SystemRedux.ReportStopLiveAction;
    Columns: IColumn[],
    Reports: IReport[];
    CurrentReport: string;
    LiveReports: ILiveReport[];
}

class ExportToolbarControlComponent extends React.Component<ExportToolbarControlComponentProps, {}> {

    render(): any {
        const selectReportString: string = "Select a Report"
        let cssClassName: string = this.props.cssClassName + "__export";
        let savedReport: IReport = this.props.Reports.find(s => s.Name == this.props.CurrentReport);
        let savedReportIndex = this.props.Reports.findIndex(s => s.Name == this.props.CurrentReport);
        let sortedReports: IReport[] = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.Reports, "Name")

        let currentReportId = StringExtensions.IsNullOrEmpty(this.props.CurrentReport) ?
            selectReportString : this.props.CurrentReport

        let availableReports: any[] = this.props.Reports.filter(s => s.Name != this.props.CurrentReport).map((report, index) => {
            return <MenuItem key={index} eventKey={index} onClick={() => this.onSelectedReportChanged(report.Name)}>{report.Name}</MenuItem>
        })

        let csvMenuItem = <MenuItem disabled={this.props.AccessLevel == AccessLevel.ReadOnly} onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.CSV)} key={"csv"}>{"CSV"}</MenuItem>
        let clipboardMenuItem = <MenuItem disabled={this.props.AccessLevel == AccessLevel.ReadOnly} onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.Clipboard)} key={"clipboard"}> {"Clipboard"}</MenuItem>
        let openfinExcelMenuItem
        if (this.props.LiveReports.find(x => x.Report == currentReportId && x.ExportDestination == ExportDestination.OpenfinExcel)) {
            openfinExcelMenuItem = <MenuItem disabled={this.props.AccessLevel == AccessLevel.ReadOnly} onClick={() => this.props.onReportStopLive(currentReportId, ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Stop Live Openfin Excel"}</MenuItem>
        }
        else {
            openfinExcelMenuItem = <MenuItem disabled={this.props.AccessLevel == AccessLevel.ReadOnly} onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Start Live Openfin Excel"}</MenuItem>
        }

        let iPushPullExcelMenuItem
        if (this.props.LiveReports.find(x => x.Report == currentReportId && x.ExportDestination == ExportDestination.iPushPull)) {
            iPushPullExcelMenuItem = <MenuItem disabled={this.props.AccessLevel == AccessLevel.ReadOnly} onClick={() => this.props.onReportStopLive(currentReportId, ExportDestination.iPushPull)} key={"IPPExcel"}> {"Stop Sync with iPushPull"}</MenuItem>
        }
        else {
            iPushPullExcelMenuItem = <MenuItem disabled={this.props.AccessLevel == AccessLevel.ReadOnly} onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.iPushPull)} key={"IPPExcel"}> {"Start Sync with iPushPull"}</MenuItem>
        }

        const exportGlyph: any = <OverlayTrigger key={"exportOverlay"} overlay={<Tooltip id="tooltipButton" > {"Export"}</Tooltip >}>
            <Glyphicon glyph={StrategyIds.ExportGlyph} />
        </OverlayTrigger>

        let content = <span>

            <InputGroup>
                <DropdownButton
                    disabled={availableReports.length == 0}
                    style={{ minWidth: "120px" }}
                    className={cssClassName}
                    bsSize={"small"}
                    bsStyle={"default"}
                    title={currentReportId}
                    id="report" >
                    {availableReports}
                </DropdownButton>

                {currentReportId != selectReportString &&
                    <InputGroup.Button>
                        <ButtonClear
                            bsStyle={"default"}
                            cssClassName={cssClassName}
                            onClick={() => this.onSelectedReportChanged("")}
                            size={"small"}
                            overrideTooltip="Clear Report"
                            overrideDisableButton={currentReportId == selectReportString}
                            DisplayMode="Glyph"
                            AccessLevel={this.props.AccessLevel}
                        />
                    </InputGroup.Button>

                }
            </InputGroup>


            <span className={this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <DropdownButton
                    style={{ marginLeft: "5px" }}

                    bsSize="small"
                    bsStyle="primary"
                    title={exportGlyph}
                    id="exportDropdown"
                    disabled={currentReportId == selectReportString} >
                    {csvMenuItem}
                    {clipboardMenuItem} {
                        OpenfinHelper.isRunningInOpenfin() && OpenfinHelper.isExcelOpenfinLoaded() && openfinExcelMenuItem
                    } {
                        iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem
                    }
                </DropdownButton>

                <ButtonEdit
                    style={{ marginLeft: "2px" }}
                    onClick={() => this.props.onEditReport()}
                    cssClassName={cssClassName}
                    size={"small"}
                    overrideTooltip="Edit Report"
                    overrideDisableButton={savedReport == null || ReportHelper.IsSystemReport(savedReport)}
                    DisplayMode="Glyph"
                    AccessLevel={this.props.AccessLevel}
                />

                <ButtonNew
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName} onClick={() => this.props.onNewReport()}
                    size={"small"}
                    overrideTooltip="Create New Report"
                    DisplayMode="Glyph"
                    AccessLevel={this.props.AccessLevel}
                />

                <ButtonDelete
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName}
                    size={"small"}
                    overrideTooltip="Delete Report"
                    overrideDisableButton={savedReport == null || ReportHelper.IsSystemReport(savedReport)}
                    DisplayMode="Glyph"
                    ConfirmAction={ExportRedux.ReportDelete(savedReportIndex)}
                    ConfirmationMsg={"Are you sure you want to delete '" + !savedReport ? "" : savedReport.Name + "'?"}
                    ConfirmationTitle={"Delete Report"}
                    AccessLevel={this.props.AccessLevel}
                />
            </span>
        </span>

        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyIds.ExportStrategyName} glyphicon={StrategyIds.ExportGlyph} onClose={() => this.props.onClose(StrategyIds.ExportStrategyId)} onConfigure={() => this.props.onConfigure()}>
            {content}
        </PanelDashboard>
    }

    onSelectedReportChanged(reportName: string) {
        this.props.onSelectReport(reportName);
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentReport: state.Export.CurrentReport,
        Reports: state.Export.Reports,
        LiveReports: state.System.CurrentLiveReports,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onApplyExport: (Report: string, exportDestination: ExportDestination) => dispatch(ExportRedux.ExportApply(Report, exportDestination)),
        onSelectReport: (Report: string) => dispatch(ExportRedux.ReportSelect(Report)),
        onReportStopLive: (Report: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => dispatch(SystemRedux.ReportStopLive(Report, exportDestination)),
        onNewReport: () => dispatch(PopupRedux.PopupShowScreen(StrategyIds.ExportStrategyId, ScreenPopups.ExportPopup, "New")),
        onEditReport: () => dispatch(PopupRedux.PopupShowScreen(StrategyIds.ExportStrategyId, ScreenPopups.ExportPopup, "Edit")),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyIds.ExportStrategyId, ScreenPopups.ExportPopup))
    };
}

export let ExportToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ExportToolbarControlComponent);


