"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const BulkUpdateRedux = require("../../Redux/ActionsReducers/BulkUpdateRedux");
const SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ButtonApply_1 = require("../Components/Buttons/ButtonApply");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const ScreenPopups = require("../../Core/Constants/ScreenPopups");
const ColumnValueSelector_1 = require("../Components/Selectors/ColumnValueSelector");
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
const AdaptablePopover_1 = require("../AdaptablePopover");
const Enums_1 = require("../../Utilities/Enums");
const PreviewResultsPanel_1 = require("../Components/PreviewResultsPanel");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const UIHelper_1 = require("../UIHelper");
class BulkUpdateToolbarControlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Disabled: true,
            SubFunc: (sender, event) => {
                this.onSelectionChanged();
            }
        };
    }
    componentDidMount() {
        if (this.props.Blotter) {
            this.props.Blotter.onSelectedCellsChanged().Subscribe(this.state.SubFunc);
        }
    }
    componentWillUnmount() {
        if (this.props.Blotter) {
            this.props.Blotter.onSelectedCellsChanged().Unsubscribe(this.state.SubFunc);
        }
    }
    render() {
        let statusColour = this.getStatusColour();
        // missing datatype validation for time being
        // we dont want to show the panel in the form but will need to appear in a popup....
        let cssClassName = this.props.cssClassName + "__bulkupdate";
        let activeButton = this.state.Disabled ?
            React.createElement(react_bootstrap_1.Button, { style: { marginRight: "3px" }, onClick: () => this.onDisabledChanged(), bsStyle: "default", bsSize: "small" }, "Off")
            : React.createElement(react_bootstrap_1.Button, { style: { marginRight: "3px" }, onClick: () => this.onDisabledChanged(), bsStyle: "primary", bsSize: "small" }, "On");
        let selectedColumn = (this.props.PreviewInfo) ?
            ColumnHelper_1.ColumnHelper.getColumnFromId(this.props.PreviewInfo.ColumnId, this.props.Columns) :
            null;
        let previewPanel = React.createElement(PreviewResultsPanel_1.PreviewResultsPanel, { cssClassName: cssClassName, UpdateValue: this.props.BulkUpdateValue, PreviewInfo: this.props.PreviewInfo, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SelectedColumn: selectedColumn, ShowPanel: true, ShowHeader: false });
        let content = React.createElement("span", null,
            React.createElement("div", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(react_bootstrap_1.InputGroup, null,
                    React.createElement(react_bootstrap_1.InputGroup.Button, null, activeButton),
                    React.createElement(ColumnValueSelector_1.ColumnValueSelector, { style: { width: "120px" }, cssClassName: cssClassName, disabled: !this.props.IsValidSelection, bsSize: "small", SelectedColumnValue: this.props.BulkUpdateValue, SelectedColumn: selectedColumn, Blotter: this.props.Blotter, onColumnValueChange: columns => this.onColumnValueSelectedChanged(columns) })),
                this.props.IsValidSelection && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) &&
                    React.createElement(ButtonApply_1.ButtonApply, { cssClassName: cssClassName, style: { marginLeft: "3px" }, onClick: () => this.onApplyClick(), size: "small", glyph: "ok", bsStyle: UIHelper_1.UIHelper.getStyleNameByStatusColour(statusColour), overrideTooltip: "Apply Bulk Update", overrideDisableButton: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) || (this.props.PreviewInfo != null && this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent), DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }),
                this.props.IsValidSelection && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) &&
                    React.createElement("span", { style: { marginLeft: "3px" } },
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Preview Results", bodyText: [previewPanel], MessageType: UIHelper_1.UIHelper.getMessageTypeByStatusColour(statusColour), useButton: true, triggerAction: "click" }))));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyConstants.BulkUpdateStrategyName, glyphicon: StrategyConstants.BulkUpdateGlyph, onClose: () => this.props.onClose(StrategyConstants.BulkUpdateStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onColumnValueSelectedChanged(selectedColumnValue) {
        this.props.onBulkUpdateValueChange(selectedColumnValue);
    }
    onSelectionChanged() {
        if (!this.state.Disabled) {
            this.getSelectedCells();
        }
    }
    getSelectedCells() {
        this.props.onBulkUpdateValueChange("");
        this.props.onBulkUpdateCheckSelectedCells();
    }
    getStatusColour() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && this.props.PreviewInfo) {
            if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
                return Enums_1.StatusColour.Red;
            }
            if (this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning || this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) {
                return Enums_1.StatusColour.Amber;
            }
        }
        return Enums_1.StatusColour.Green;
    }
    onDisabledChanged() {
        let newDisabledState = !this.state.Disabled;
        if (!newDisabledState) {
            this.props.onBulkUpdateCheckSelectedCells();
        }
        this.setState({ Disabled: newDisabledState });
    }
    onApplyClick() {
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ?
            this.onConfirmWarningCellValidation() :
            this.onApplyBulkUpdate();
    }
    onConfirmWarningCellValidation() {
        let confirmation = {
            CancelText: "Cancel Edit",
            ConfirmationTitle: "Cell Validation Failed",
            ConfirmationMsg: "Do you want to continue?",
            ConfirmationText: "Bypass Rule",
            CancelAction: BulkUpdateRedux.BulkUpdateApply(false),
            ConfirmAction: BulkUpdateRedux.BulkUpdateApply(true),
            ShowCommentBox: true
        };
        this.props.onConfirmWarningCellValidation(confirmation);
    }
    onApplyBulkUpdate() {
        this.props.onApplyBulkUpdate();
        this.onSelectionChanged();
    }
}
function mapStateToProps(state, ownProps) {
    return {
        BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
        IsValidSelection: state.System.IsValidBulkUpdateSelection,
        PreviewInfo: state.System.BulkUpdatePreviewInfo,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onBulkUpdateValueChange: (value) => dispatch(BulkUpdateRedux.BulkUpdateChangeValue(value)),
        onBulkUpdateCheckSelectedCells: () => dispatch(SystemRedux.BulkUpdateCheckCellSelection()),
        onApplyBulkUpdate: () => dispatch(BulkUpdateRedux.BulkUpdateApply(false)),
        onConfirmWarningCellValidation: (confirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.BulkUpdateStrategyId, ScreenPopups.BulkUpdatePopup))
    };
}
exports.BulkUpdateToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(BulkUpdateToolbarControlComponent);
