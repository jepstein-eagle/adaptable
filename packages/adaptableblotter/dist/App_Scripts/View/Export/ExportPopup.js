"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ExportRedux = require("../../Redux/ActionsReducers/ExportRedux");
const SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
const Enums_1 = require("../../Utilities/Enums");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ReportEntityRow_1 = require("./ReportEntityRow");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const ReportWizard_1 = require("./Wizard/ReportWizard");
class ExportPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.getEmptyConfigState();
    }
    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew();
        }
        if (this.props.PopupParams == "Edit") {
            let selectedReport = this.props.Reports.find(a => a.Name == this.props.CurrentReport);
            let selectedReportIndex = this.props.Reports.findIndex(a => a.Name == this.props.CurrentReport);
            this.onEdit(selectedReportIndex, selectedReport);
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__export";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__export";
        let infoBody = ["Create a 'Report' (or use a predefined one) and then export it to specified location.", React.createElement("br", null), React.createElement("br", null)];
        let colItems = [
            { Content: "Report", Size: 3 },
            { Content: "Columns", Size: 3 },
            { Content: "Query Details", Size: 3 },
            { Content: "Export", Size: 1 },
            { Content: "", Size: 2 },
        ];
        let Reports = this.props.SystemReports.concat(this.props.Reports).map((report, index) => {
            let reportIndex = index - this.props.SystemReports.length;
            return React.createElement(ReportEntityRow_1.ReportEntityRow, { cssClassName: cssClassName, AdaptableBlotterObject: report, key: index, colItems: colItems, Index: reportIndex, Columns: this.props.Columns, UserFilters: this.props.UserFilters, LiveReports: this.props.LiveReports, onShare: () => this.props.onShare(report), TeamSharingActivated: this.props.TeamSharingActivated, onExport: (exportDestination) => this.onApplyExport(report.Name, exportDestination), onReportStopLive: (exportDestination) => this.props.onReportStopLive(report.Name, exportDestination), onEdit: () => this.onEdit(reportIndex, report), onDeleteConfirm: ExportRedux.ReportDelete(reportIndex) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create Report", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstants.ExportStrategyName, bsStyle: "primary", glyphicon: StrategyConstants.ExportGlyph, infoBody: infoBody, button: newButton },
                Reports.length > 0 ?
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: Reports, allowOverflow: true })
                    :
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to create a new Report.  A Report is named group of columns and Unique values.."),
                this.state.EditedAdaptableBlotterObject &&
                    React.createElement(ReportWizard_1.ReportWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ModalContainer: this.props.ModalContainer, ConfigEntities: this.props.Reports, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let Report = this.state.EditedAdaptableBlotterObject;
        this.props.onAddUpdateReport(this.state.EditedAdaptableBlotterObjectIndex, Report);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let report = this.state.EditedAdaptableBlotterObject;
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(report.Name)) {
            return false;
        }
        if (report.ReportRowScope == Enums_1.ReportRowScope.ExpressionRows && ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(report.Expression)) {
            return false;
        }
        if (report.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns && ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(report.ColumnIds)) {
            return false;
        }
        if (report.AutoExport != null) {
            if (report.AutoExport.Schedule.Hour == null || report.AutoExport.Schedule.Minute == null) {
                return false;
            }
            if (report.AutoExport.Schedule.OneOffDate == null && ArrayExtensions_1.ArrayExtensions.IsEmpty(report.AutoExport.Schedule.DaysOfWeek)) {
                return false;
            }
        }
        return true;
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyReport(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, ReportToEdit) {
        let clonedReportToEdit = Helper_1.Helper.cloneObject(ReportToEdit);
        this.setState({ EditedAdaptableBlotterObject: clonedReportToEdit, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }
    onApplyExport(Report, exportDestination) {
        this.props.onApplyExport(Report, exportDestination);
    }
}
function mapStateToProps(state) {
    return {
        Reports: state.Export.Reports,
        SystemReports: state.System.SystemReports,
        CurrentReport: state.Export.CurrentReport,
        LiveReports: state.System.CurrentLiveReports,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onApplyExport: (value, exportDestination) => dispatch(ExportRedux.ExportApply(value, exportDestination)),
        onAddUpdateReport: (Index, Report) => dispatch(ExportRedux.ReportAddUpdate(Index, Report)),
        onReportStopLive: (Report, exportDestination) => dispatch(SystemRedux.ReportStopLive(Report, exportDestination)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ExportStrategyId))
    };
}
exports.ExportPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ExportPopupComponent);
