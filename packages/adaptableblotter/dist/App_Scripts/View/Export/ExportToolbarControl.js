"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ExportRedux = require("../../Redux/ActionsReducers/ExportRedux");
const SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const ButtonDelete_1 = require("../Components/Buttons/ButtonDelete");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const ButtonEdit_1 = require("../Components/Buttons/ButtonEdit");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../../Utilities/Enums");
const OpenfinHelper_1 = require("../../Utilities/Helpers/OpenfinHelper");
const iPushPullHelper_1 = require("../../Utilities/Helpers/iPushPullHelper");
const GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
const ReportHelper_1 = require("../../Utilities/Helpers/ReportHelper");
const StyleConstants_1 = require("../../Utilities/Constants/StyleConstants");
class ExportToolbarControlComponent extends React.Component {
    render() {
        const selectReportString = "Select a Report";
        let cssClassName = this.props.cssClassName + "__export";
        let savedReport = this.props.Reports.find(s => s.Name == this.props.CurrentReport);
        let savedReportIndex = this.props.Reports.findIndex(s => s.Name == this.props.CurrentReport);
        let currentReportId = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentReport) ?
            selectReportString : this.props.CurrentReport;
        let availableReports = this.props.Reports.filter(s => s.Name != this.props.CurrentReport).map((report, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: index, onClick: () => this.onSelectedReportChanged(report.Name) }, report.Name);
        });
        let csvMenuItem = React.createElement(react_bootstrap_1.MenuItem, { disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, onClick: () => this.props.onApplyExport(currentReportId, Enums_1.ExportDestination.CSV), key: "csv" }, "CSV");
        let clipboardMenuItem = React.createElement(react_bootstrap_1.MenuItem, { disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, onClick: () => this.props.onApplyExport(currentReportId, Enums_1.ExportDestination.Clipboard), key: "clipboard" },
            " ",
            "Clipboard");
        let openfinExcelMenuItem;
        if (this.props.LiveReports.find(x => x.Report == currentReportId && x.ExportDestination == Enums_1.ExportDestination.OpenfinExcel)) {
            openfinExcelMenuItem = React.createElement(react_bootstrap_1.MenuItem, { disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, onClick: () => this.props.onReportStopLive(currentReportId, Enums_1.ExportDestination.OpenfinExcel), key: "OpenfinExcel" },
                " ",
                "Stop Live Openfin Excel");
        }
        else {
            openfinExcelMenuItem = React.createElement(react_bootstrap_1.MenuItem, { disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, onClick: () => this.props.onApplyExport(currentReportId, Enums_1.ExportDestination.OpenfinExcel), key: "OpenfinExcel" },
                " ",
                "Start Live Openfin Excel");
        }
        let iPushPullExcelMenuItem;
        if (this.props.LiveReports.find(x => x.Report == currentReportId && x.ExportDestination == Enums_1.ExportDestination.iPushPull)) {
            iPushPullExcelMenuItem = React.createElement(react_bootstrap_1.MenuItem, { disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, onClick: () => this.props.onReportStopLive(currentReportId, Enums_1.ExportDestination.iPushPull), key: "IPPExcel" },
                " ",
                "Stop Sync with iPushPull");
        }
        else {
            iPushPullExcelMenuItem = React.createElement(react_bootstrap_1.MenuItem, { disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, onClick: () => this.props.onApplyExport(currentReportId, Enums_1.ExportDestination.iPushPull), key: "IPPExcel" },
                " ",
                "Start Sync with iPushPull");
        }
        let deleteMessage = "Are you sure you want to delete '";
        if (savedReport != null) {
            deleteMessage = deleteMessage + savedReport.Name + "?";
        }
        let exportDropdownStyle = (this.props.UseSingleColourForButtons) ? StyleConstants_1.DEFAULT_BSSTYLE : StyleConstants_1.PRIMARY_BSSTYLE;
        const exportGlyph = React.createElement(react_bootstrap_1.OverlayTrigger, { key: "exportOverlay", overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipButton" },
                " ",
                "Export") },
            React.createElement(react_bootstrap_1.Glyphicon, { glyph: StrategyConstants.ExportGlyph }));
        let content = React.createElement("span", null,
            React.createElement(react_bootstrap_1.InputGroup, null,
                React.createElement(react_bootstrap_1.DropdownButton, { disabled: availableReports.length == 0, style: { minWidth: "120px" }, className: cssClassName, bsSize: this.props.DashboardSize, bsStyle: "default", title: currentReportId, id: "report" }, availableReports),
                currentReportId != selectReportString &&
                    React.createElement(react_bootstrap_1.InputGroup.Button, null,
                        React.createElement(ButtonClear_1.ButtonClear, { bsStyle: "default", cssClassName: cssClassName, onClick: () => this.onSelectedReportChanged(""), size: this.props.DashboardSize, overrideTooltip: "Clear Report", overrideDisableButton: currentReportId == selectReportString, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel, showDefaultStyle: this.props.UseSingleColourForButtons }))),
            React.createElement("span", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(react_bootstrap_1.DropdownButton, { style: { marginLeft: "5px" }, bsSize: this.props.DashboardSize, bsStyle: exportDropdownStyle, title: exportGlyph, id: "exportDropdown", disabled: currentReportId == selectReportString },
                    csvMenuItem,
                    clipboardMenuItem,
                    OpenfinHelper_1.OpenfinHelper.isRunningInOpenfin() && OpenfinHelper_1.OpenfinHelper.isExcelOpenfinLoaded() && openfinExcelMenuItem,
                    iPushPullHelper_1.iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem),
                React.createElement(ButtonEdit_1.ButtonEdit, { style: { marginLeft: "2px" }, onClick: () => this.props.onEditReport(), cssClassName: cssClassName, size: this.props.DashboardSize, overrideTooltip: "Edit Report", overrideDisableButton: savedReport == null || ReportHelper_1.ReportHelper.IsSystemReport(savedReport), DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel, showDefaultStyle: this.props.UseSingleColourForButtons }),
                React.createElement(ButtonNew_1.ButtonNew, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.props.onNewReport(), size: this.props.DashboardSize, overrideTooltip: "Create New Report", DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel, showDefaultStyle: this.props.UseSingleColourForButtons }),
                React.createElement(ButtonDelete_1.ButtonDelete, { style: { marginLeft: "2px" }, cssClassName: cssClassName, size: this.props.DashboardSize, overrideTooltip: "Delete Report", overrideDisableButton: savedReport == null || ReportHelper_1.ReportHelper.IsSystemReport(savedReport), DisplayMode: "Glyph", ConfirmAction: ExportRedux.ReportDelete(savedReportIndex), ConfirmationMsg: deleteMessage, ConfirmationTitle: "Delete Report", AccessLevel: this.props.AccessLevel, showDefaultStyle: this.props.UseSingleColourForButtons })));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyConstants.ExportStrategyName, glyphicon: StrategyConstants.ExportGlyph, onClose: () => this.props.onClose(StrategyConstants.ExportStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onSelectedReportChanged(reportName) {
        this.props.onSelectReport(reportName);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CurrentReport: state.Export.CurrentReport,
        Reports: state.Export.Reports,
        LiveReports: state.System.CurrentLiveReports,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onApplyExport: (Report, exportDestination) => dispatch(ExportRedux.ExportApply(Report, exportDestination)),
        onSelectReport: (Report) => dispatch(ExportRedux.ReportSelect(Report)),
        onReportStopLive: (Report, exportDestination) => dispatch(SystemRedux.ReportStopLive(Report, exportDestination)),
        onNewReport: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup, "New")),
        onEditReport: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup, "Edit")),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup))
    };
}
exports.ExportToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ExportToolbarControlComponent);
