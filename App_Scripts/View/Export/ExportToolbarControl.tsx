import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'
import { DropdownButton, MenuItem, SplitButton, OverlayTrigger, Tooltip, Glyphicon, InputGroup } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../Core/Interface/IColumn';
import { IReport } from '../../Strategy/Interface/IExportStrategy'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
//import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
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
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'


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
        let cssClassName: string = this.props.cssClassName + "__export";
        let savedReport: IReport = this.props.Reports.find(s => s.Name == this.props.CurrentReport);
        let savedReportIndex = this.props.Reports.findIndex(s => s.Name == this.props.CurrentReport);
        let sortedReports: IReport[] = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.Reports, "Name")

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
            <Glyphicon glyph={StrategyGlyphs.ExportGlyph} />
        </OverlayTrigger>

        let content = <InputGroup>
            <span className={this.props.IsReadOnly ? "ab_readonly" : ""}>
                <Typeahead
                    bsSize={"small"}
                    ref="typeahead" emptyLabel={"No Reports found with that search"}
                    placeholder={"Select a Report"}
                    labelKey={"Name"}
                    clearButton={true}
                    selected={savedReport ? [savedReport] : []}
                    onChange={(selected) => { this.onSelectedReportChanged(selected) }}
                    options={sortedReports}
                    filterBy={(option: IReport, text: any) => {
                        if (sortedReports.length) {
                            // Display all the options if there's a selection.
                            return true;
                        }
                        // Otherwise filter on some criteria.
                        return option.Name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
                    }}
                />
            </span>
            <InputGroup.Button>
                <span className={this.props.IsReadOnly ? "ab_readonly" : ""}>

                    <DropdownButton
                        style={{ marginLeft: "2px" }}
                        bsSize="small" bsStyle="default" title={exportGlyph} id="exportDropdown" disabled={currentReportId == "select"} >
                        {csvMenuItem}
                        {clipboardMenuItem} {
                            OpenfinHelper.isRunningInOpenfin() && OpenfinHelper.isExcelOpenfinLoaded() && openfinExcelMenuItem
                        } {
                            iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem
                        }
                    </DropdownButton>
                </span>
            </InputGroup.Button>
            <InputGroup.Button>
                <span className={this.props.IsReadOnly ? "ab_readonly" : ""}>
                    <ButtonEdit
                        style={{ marginLeft: "2px" }}
                        onClick={() => this.props.onEditReport()}
                        cssClassName={cssClassName}
                        size={"small"}
                        overrideTooltip="Edit Report"
                        overrideDisableButton={savedReport == null || savedReport.IsPredefined}
                        ConfigEntity={savedReport}
                        DisplayMode="Glyph" />
                </span>
            </InputGroup.Button>
            <InputGroup.Button>
                <span className={this.props.IsReadOnly ? "ab_readonly" : ""}>
                    <ButtonNew
                        style={{ marginLeft: "2px" }}
                        cssClassName={cssClassName} onClick={() => this.props.onNewReport()}
                        size={"small"}
                        overrideTooltip="Create New Report"
                        DisplayMode="Glyph" />
                </span>
            </InputGroup.Button>
            <InputGroup.Button>
                <span className={this.props.IsReadOnly ? "ab_readonly" : ""}>
                    <ButtonDelete
                        style={{ marginLeft: "2px" }}
                        cssClassName={cssClassName}
                        size={"small"}
                        overrideTooltip="Delete Report"
                        overrideDisableButton={savedReport == null || savedReport.IsPredefined}
                        ConfigEntity={savedReport}
                        DisplayMode="Glyph"
                        ConfirmAction={ExportRedux.ReportDelete(savedReportIndex)}
                        ConfirmationMsg={"Are you sure you want to delete '" + !savedReport ? "" : savedReport.Name + "'?"}
                        ConfirmationTitle={"Delete Report"} />
                </span>
            </InputGroup.Button>
        </InputGroup>

        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyNames.ExportStrategyName} glyphicon={StrategyGlyphs.ExportGlyph} onClose={() => this.props.onClose(StrategyIds.ExportStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
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
        LiveReports: state.Export.CurrentLiveReports,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onApplyExport: (Report: string, exportDestination: ExportDestination) => dispatch(ExportRedux.ExportApply(Report, exportDestination)),
        onSelectReport: (Report: string) => dispatch(ExportRedux.ReportSelect(Report)),
        onReportStopLive: (Report: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => dispatch(ExportRedux.ReportStopLive(Report, exportDestination)),
        onNewReport: () => dispatch(PopupRedux.PopupShow(ScreenPopups.ExportPopup, false, "New")),
        onEditReport: () => dispatch(PopupRedux.PopupShow(ScreenPopups.ExportPopup, false, "Edit")),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.ExportPopup, isReadOnly))
    };
}

export let ExportToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ExportToolbarControlComponent);

