import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'
import { DropdownButton, MenuItem, SplitButton, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { IReport } from '../../Strategy/Interface/IExportStrategy'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helpers/Helper';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { ExportDestination, SortOrder } from '../../Core/Enums';
import { OpenfinHelper } from '../../Core/Helpers/OpenfinHelper';
import { iPushPullHelper } from '../../Core/Helpers/iPushPullHelper';
import { ILiveReport } from "../../Strategy/Interface/IExportStrategy";

interface ExportToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ExportToolbarControlComponent> {
    onApplyExport: (Report: string, exportDestination: ExportDestination) => ExportRedux.ExportApplyAction;
    onSelectReport: (Report: string) => ExportRedux.ReportSelectAction;
    onNewReport: () => PopupRedux.PopupShowAction;
    onEditReport: () => PopupRedux.PopupShowAction;
    onReportStopLive: (Report: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => ExportRedux.ReportStopLiveAction;
    Columns: IColumn[],
    Reports: IReport[];
    CurrentReport: string;
    LiveReports: ILiveReport[];
}

class ExportToolbarControlComponent extends React.Component<ExportToolbarControlComponentProps, {}> {
    componentWillReceiveProps(nextProps: ExportToolbarControlComponentProps, nextContext: any) {
        //if there was a selected search and parent unset the column we then clear the component 
        // otherwise it's correctly unselected but the input still have the previsous selected text
        if (StringExtensions.IsNullOrEmpty(nextProps.CurrentReport) && StringExtensions.IsNotNullOrEmpty(this.props.CurrentReport)) {
            (this.refs.typeahead as any).getInstance().clear()
        }
    }
    render(): any {
        let savedReport: IReport = this.props.Reports.find(s => s.Name == this.props.CurrentReport);
        let savedReportIndex = this.props.Reports.findIndex(s => s.Name == this.props.CurrentReport);
        let sortedReports = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.Reports, "Name")

        let currentReportId = StringExtensions.IsNullOrEmpty(this.props.CurrentReport) ?
            "select" : this.props.CurrentReport

        let availableReports = this.props.Reports.map((x, index) => {
            return <option value={x.Name} key={index}>{x.Name}</option>
        })

        let csvMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.CSV)} key={"csv"}>{"CSV"}</MenuItem>
        let clipboardMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.Clipboard)} key={"clipboard"}> {"Clipboard"}</MenuItem>
        let openfinExcelMenuItem
        if (this.props.LiveReports.find(x => x.Report == currentReportId && x.ExportDestination == ExportDestination.OpenfinExcel)) {
            openfinExcelMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onReportStopLive(currentReportId, ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Stop Live Openfin Excel"}</MenuItem>
        }
        else {
            openfinExcelMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Start Live Openfin Excel"}</MenuItem>
        }

        let iPushPullExcelMenuItem
        if (this.props.LiveReports.find(x => x.Report == currentReportId && x.ExportDestination == ExportDestination.iPushPull)) {
            iPushPullExcelMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onReportStopLive(currentReportId, ExportDestination.iPushPull)} key={"IPPExcel"}> {"Stop Sync with iPushPull"}</MenuItem>
        }
        else {
            iPushPullExcelMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.iPushPull)} key={"IPPExcel"}> {"Start Sync with iPushPull"}</MenuItem>
        }

        const exportGlyph: any = <OverlayTrigger key={"exportOverlay"} overlay={<Tooltip id="tooltipButton" > {"Export"}</Tooltip >}>
            <Glyphicon glyph={"export"} />
        </OverlayTrigger>
        
        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <Typeahead
                    bsSize={"small"}
                    className={"adaptable_blotter_typeahead_inline"} ref="typeahead" emptyLabel={"No Reports found with that search"}
                    placeholder={"Select a Report"}
                    labelKey={"Name"}
                    filterBy={["Name"]}
                    clearButton={true}
                    selected={savedReport ? [savedReport] : []}
                    onChange={(selected) => { this.onSelectedReportChanged(selected) }}
                    options={sortedReports}
                />
                {' '}
                <DropdownButton bsSize="small" bsStyle="default" title={exportGlyph} id="exportDropdown" disabled={currentReportId == "select"} >
                    {csvMenuItem}
                    {clipboardMenuItem}
                    {
                        OpenfinHelper.isRunningInOpenfin() && OpenfinHelper.isExcelOpenfinLoaded() && openfinExcelMenuItem
                    }
                    {
                        iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem
                    }
                </DropdownButton>

                {' '}
                <ButtonEdit onClick={() => this.props.onEditReport()}
                    size={"small"}
                    overrideTooltip="Edit Report"
                    overrideDisableButton={savedReport == null || savedReport.IsPredefined}
                    ConfigEntity={savedReport}
                    DisplayMode="Glyph" />
                {' '}
                <ButtonNew onClick={() => this.props.onNewReport()}
                    size={"small"}
                    overrideTooltip="Create New Report"
                    DisplayMode="Glyph" />
                {' '}
                <ButtonDelete
                    size={"small"}
                    overrideTooltip="Delete Report"
                    overrideDisableButton={savedReport == null || savedReport.IsPredefined}
                    ConfigEntity={savedReport}
                    DisplayMode="Glyph"
                    ConfirmAction={ExportRedux.ReportDelete(savedReportIndex)}
                    ConfirmationMsg={"Are you sure you want to delete '" + !savedReport ? "" : savedReport.Name + "'?"}
                    ConfirmationTitle={"Delete Report"} />
            </div>
        </span>

        return <PanelDashboard headerText={StrategyNames.ExportStrategyName} glyphicon="export" onClose={() => this.props.onClose(this.props.DashboardControl)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
            {content}
        </PanelDashboard>
    }

    onSelectedReportChanged(selected: IReport[]) {
        this.props.onSelectReport(selected.length > 0 ? selected[0].Name : "");
    }


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentReport: state.Export.CurrentReport,
        Reports: state.Export.Reports,
        Columns: state.Grid.Columns,
        LiveReports: state.Export.CurrentLiveReports,
        DashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.ExportStrategyId),
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onApplyExport: (Report: string, exportDestination: ExportDestination) => dispatch(ExportRedux.ExportApply(Report, exportDestination)),
        onSelectReport: (Report: string) => dispatch(ExportRedux.ReportSelect(Report)),
        onReportStopLive: (Report: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => dispatch(ExportRedux.ReportStopLive(Report, exportDestination)),
        onNewReport: () => dispatch(PopupRedux.PopupShow(ScreenPopups.ExportPopup, false, "New")),
        onEditReport: () => dispatch(PopupRedux.PopupShow(ScreenPopups.ExportPopup, false, "Edit")),
        onClose: (dashboardControl: IDashboardStrategyControlConfiguration) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl.Strategy, false)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.ExportPopup, isReadOnly))
    };
}

export let ExportToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ExportToolbarControlComponent);

