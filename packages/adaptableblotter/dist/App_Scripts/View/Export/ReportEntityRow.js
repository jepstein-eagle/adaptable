"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const Enums_1 = require("../../Core/Enums");
const ReportHelper_1 = require("../../Core/Helpers/ReportHelper");
const OpenfinHelper_1 = require("../../Core/Helpers/OpenfinHelper");
const iPushPullHelper_1 = require("../../Core/Helpers/iPushPullHelper");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
class ReportEntityRow extends React.Component {
    render() {
        let report = this.props.AdaptableBlotterObject;
        let csvMenuItem = React.createElement(react_bootstrap_1.MenuItem, { onClick: () => this.props.onExport(Enums_1.ExportDestination.CSV), key: "csv" }, "Export to CSV");
        let clipboardMenuItem = React.createElement(react_bootstrap_1.MenuItem, { onClick: () => this.props.onExport(Enums_1.ExportDestination.Clipboard), key: "clipboard" },
            " ",
            "Export to Clipboard");
        let openfinExcelMenuItem = (this.props.LiveReports.find(x => x.Report == report.Name)) ?
            React.createElement(react_bootstrap_1.MenuItem, { onClick: () => this.props.onReportStopLive(Enums_1.ExportDestination.OpenfinExcel), key: "OpenfinExcel" },
                " ",
                "Stop Live Openfin Excel")
            : React.createElement(react_bootstrap_1.MenuItem, { onClick: () => this.props.onExport(Enums_1.ExportDestination.OpenfinExcel), key: "OpenfinExcel" },
                " ",
                "Start Live Openfin Excel");
        let iPushPullExcelMenuItem = (this.props.LiveReports.find(x => x.Report == report.Name && x.ExportDestination == Enums_1.ExportDestination.iPushPull)) ?
            React.createElement(react_bootstrap_1.MenuItem, { onClick: () => this.props.onReportStopLive(Enums_1.ExportDestination.iPushPull), key: "IPPExcel" },
                " ",
                "Stop Sync with iPushPull")
            : React.createElement(react_bootstrap_1.MenuItem, { onClick: () => this.props.onExport(Enums_1.ExportDestination.iPushPull), key: "IPPExcel" },
                " ",
                "Start Sync with iPushPull");
        let exportGlyph = React.createElement(react_bootstrap_1.Glyphicon, { glyph: StrategyConstants.ExportGlyph });
        // let hasLive = this.props.LiveReports.find(x => x.Report == report.Name && x.ExportDestination == ExportDestination.iPushPull) != null
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = report.Name;
        colItems[1].Content = ReportHelper_1.ReportHelper.GetReportColumnsDescription(report, this.props.Columns);
        colItems[2].Content = ReportHelper_1.ReportHelper.GetReportExpressionDescription(report, this.props.Columns, this.props.UserFilters);
        let exportButton = React.createElement(react_bootstrap_1.OverlayTrigger, { overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipButton" },
                " ",
                "Export Report") },
            React.createElement(react_bootstrap_1.DropdownButton, { bsSize: "small", bsStyle: "default", title: exportGlyph, key: report.Name, id: report.Name },
                csvMenuItem,
                clipboardMenuItem,
                OpenfinHelper_1.OpenfinHelper.isRunningInOpenfin() && OpenfinHelper_1.OpenfinHelper.isExcelOpenfinLoaded() && openfinExcelMenuItem,
                iPushPullHelper_1.iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem));
        colItems[3].Content = exportButton;
        let buttons = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, editClick: () => this.props.onEdit(this.props.Index, report), showShare: this.props.TeamSharingActivated, shareClick: () => this.props.onShare(), EntityName: "Report" });
        colItems[4].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.ReportEntityRow = ReportEntityRow;
