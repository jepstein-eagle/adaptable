"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const BulkUpdateRedux = require("../../Redux/ActionsReducers/BulkUpdateRedux");
const SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const Enums_1 = require("../../Utilities/Enums");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const AdaptablePopover_1 = require("../AdaptablePopover");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const UIHelper_1 = require("../UIHelper");
const PreviewResultsPanel_1 = require("../Components/PreviewResultsPanel");
const PreviewHelper_1 = require("../../Utilities/Helpers/PreviewHelper");
const ColumnValueSelector_1 = require("../Components/Selectors/ColumnValueSelector");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
const StyleConstants_1 = require("../../Utilities/Constants/StyleConstants");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const CellValidationHelper_1 = require("../../Utilities/Helpers/CellValidationHelper");
class BulkUpdatePopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isShowingError: false, errorText: "", useSelector: false };
    }
    componentDidMount() {
        this.props.onBulkUpdateCheckSelectedCells();
        //      this.props.onBulkUpdateValueChange("");
    }
    render() {
        let cssClassName = this.props.cssClassName + "__bulkupdate";
        let infoBody = ["Click ", React.createElement("i", null,
                React.createElement("b", null, "Apply to Grid")),
            " button to update all selected cells with the value that you specify", React.createElement("br", null), React.createElement("br", null),
            "Edits that break Cell Validation Rules will be flagged and prevented."];
        let col;
        if (this.props.PreviewInfo) {
            col = ColumnHelper_1.ColumnHelper.getColumnFromId(this.props.PreviewInfo.ColumnId, this.props.Columns);
        }
        let hasDataTypeError = false;
        let dataTypeErrorMessage = "";
        if (col && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue)) {
            // check that the update value is a number for a numeric column.  not issue for dates as we dont allow free text
            if (col.DataType == Enums_1.DataType.Number) {
                if (isNaN(Number(this.props.BulkUpdateValue))) {
                    hasDataTypeError = true;
                    dataTypeErrorMessage = "This column only accepts numbers";
                }
            }
        }
        let globalValidationMessage = PreviewHelper_1.PreviewHelper.GetValidationMessage(this.props.PreviewInfo, this.props.BulkUpdateValue);
        let showPanel = this.props.PreviewInfo && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(globalValidationMessage);
        let previewPanel = showPanel ?
            React.createElement(PreviewResultsPanel_1.PreviewResultsPanel, { cssClassName: cssClassName, UpdateValue: this.props.BulkUpdateValue, PreviewInfo: this.props.PreviewInfo, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SelectedColumn: col, ShowPanel: showPanel, ShowHeader: true }) :
            null;
        return (React.createElement("div", { className: cssClassName }, col &&
            React.createElement("div", null,
                React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyConstants.BulkUpdateStrategyName, bsStyle: "primary", glyphicon: StrategyConstants.BulkUpdateGlyph, infoBody: infoBody },
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { onSubmit: () => this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplyBulkUpdate() },
                        React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineKey" }, col.DataType == Enums_1.DataType.Date ?
                            React.createElement("div", null,
                                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                                    React.createElement(react_bootstrap_1.HelpBlock, null, "Enter a date value.  Alternatively, tick the checkbox and select from an existing column value.")),
                                React.createElement(react_bootstrap_1.Row, null,
                                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                                        React.createElement(react_bootstrap_1.Checkbox, { className: "ab_medium_margin", onChange: (e) => this.onUseColumnValuesSelectorChanged(e), checked: this.state.useSelector },
                                            ' ',
                                            "Select from existing column values"))),
                                React.createElement(react_bootstrap_1.Row, null,
                                    React.createElement(react_bootstrap_1.Col, { xs: 9 }, this.state.useSelector ?
                                        React.createElement(ColumnValueSelector_1.ColumnValueSelector, { cssClassName: cssClassName, SelectedColumnValue: this.props.BulkUpdateValue, SelectedColumn: col, Blotter: this.props.Blotter, onColumnValueChange: columns => this.onColumnValueSelectedChanged(columns), AllowNew: false })
                                        :
                                            React.createElement(react_bootstrap_1.FormControl, { value: String(this.props.BulkUpdateValue), type: UIHelper_1.UIHelper.getDescriptionForDataType(col.DataType), placeholder: UIHelper_1.UIHelper.getPlaceHolderforDataType(col.DataType), onChange: (e) => this.onBulkUpdateValueChange(e) })),
                                    React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                        React.createElement(react_bootstrap_1.Button, { bsStyle: this.getButtonStyle(), disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) || this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent, onClick: () => { this.onApplyClick(); } }, "Apply to Grid")))) :
                            React.createElement("div", null,
                                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                                    React.createElement(react_bootstrap_1.HelpBlock, null, "Select an existing column value from the dropdown, or enter a new value")),
                                " ",
                                React.createElement(react_bootstrap_1.Row, null,
                                    React.createElement(react_bootstrap_1.Col, { xs: 8 },
                                        React.createElement(ColumnValueSelector_1.ColumnValueSelector, { cssClassName: cssClassName, SelectedColumnValue: this.props.BulkUpdateValue, SelectedColumn: col, Blotter: this.props.Blotter, onColumnValueChange: columns => this.onColumnValueSelectedChanged(columns) })),
                                    React.createElement(react_bootstrap_1.Col, { xs: 4 },
                                        React.createElement(react_bootstrap_1.Button, { bsStyle: this.getButtonStyle(), disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) || this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent || hasDataTypeError, onClick: () => { this.onApplyClick(); } }, "Apply to Grid"),
                                        ' ',
                                        (hasDataTypeError) &&
                                            React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Update Error", bodyText: [dataTypeErrorMessage], MessageType: Enums_1.MessageType.Error }),
                                        (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning) &&
                                            React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Validation Error", bodyText: [globalValidationMessage], MessageType: Enums_1.MessageType.Warning }),
                                        (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && !this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning && this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) &&
                                            React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Validation Error", bodyText: [globalValidationMessage], MessageType: Enums_1.MessageType.Error }))))))),
                previewPanel)));
    }
    onColumnValueSelectedChanged(selectedColumnValue) {
        this.props.onBulkUpdateValueChange(selectedColumnValue);
    }
    onUseColumnValuesSelectorChanged(event) {
        let e = event.target;
        this.setState({ useSelector: e.checked });
        this.props.onBulkUpdateValueChange("");
    }
    onBulkUpdateValueChange(event) {
        const e = event.target;
        this.props.onBulkUpdateValueChange(e.value);
    }
    onApplyClick() {
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ?
            this.onConfirmWarningCellValidation() :
            this.onApplyBulkUpdate();
    }
    onApplyBulkUpdate() {
        this.props.onApplyBulkUpdate();
    }
    onConfirmWarningCellValidation() {
        let confirmAction = BulkUpdateRedux.BulkUpdateApply(true);
        let cancelAction = BulkUpdateRedux.BulkUpdateApply(false);
        let confirmation = CellValidationHelper_1.CellValidationHelper.createCellValidationUIConfirmation(confirmAction, cancelAction);
        this.props.onConfirmWarningCellValidation(confirmation);
    }
    getButtonStyle() {
        if (this.props.PreviewInfo) {
            if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
                return StyleConstants_1.DEFAULT_BSSTYLE;
            }
            if (this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning || this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) {
                return StyleConstants_1.WARNING_BSSTYLE;
            }
        }
        return "success";
    }
}
function mapStateToProps(state, ownProps) {
    return {
        BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
        PreviewInfo: state.System.BulkUpdatePreviewInfo,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onBulkUpdateValueChange: (value) => dispatch(BulkUpdateRedux.BulkUpdateChangeValue(value)),
        onBulkUpdateCheckSelectedCells: () => dispatch(SystemRedux.BulkUpdateCheckCellSelection()),
        onApplyBulkUpdate: () => dispatch(BulkUpdateRedux.BulkUpdateApply(false)),
        onConfirmWarningCellValidation: (confirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    };
}
exports.BulkUpdatePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(BulkUpdatePopupComponent);
