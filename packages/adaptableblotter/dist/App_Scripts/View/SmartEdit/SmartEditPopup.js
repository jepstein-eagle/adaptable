"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const SmartEditRedux = require("../../Redux/ActionsReducers/SmartEditRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const Enums_1 = require("../../Core/Enums");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const AdaptablePopover_1 = require("../AdaptablePopover");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const EnumExtensions_1 = require("../../Core/Extensions/EnumExtensions");
const PreviewResultsPanel_1 = require("../Components/PreviewResultsPanel");
const PreviewHelper_1 = require("../../Core/Helpers/PreviewHelper");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
class SmartEditPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isShowingError: false, errorText: "" };
    }
    componentDidMount() {
        this.props.onSmartEditCheckSelectedCells();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__smartedit";
        let infoBody = ["Click ", React.createElement("i", null,
                React.createElement("b", null, "Apply to Grid")),
            " button to update all selected cells with the values showing in the Preview Results grid.", React.createElement("br", null), React.createElement("br", null),
            "This value will be calculated based on the Maths operation selected in the dropdown", React.createElement("br", null), React.createElement("br", null),
            "Smart Edits that break Cell Validation Rules will be flagged and prevented."];
        let col;
        if (this.props.PreviewInfo) {
            col = this.props.Columns.find(c => c.ColumnId == this.props.PreviewInfo.ColumnId);
        }
        let globalValidationMessage = PreviewHelper_1.PreviewHelper.GetValidationMessage(this.props.PreviewInfo, this.props.SmartEditValue);
        let showPanel = this.props.PreviewInfo && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.SmartEditValue);
        let previewPanel = showPanel ?
            React.createElement(PreviewResultsPanel_1.PreviewResultsPanel, { cssClassName: cssClassName, UpdateValue: this.props.SmartEditValue, PreviewInfo: this.props.PreviewInfo, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SelectedColumn: col, ShowPanel: showPanel, ShowHeader: true }) :
            null;
        let operationMenuItems = EnumExtensions_1.EnumExtensions.getNames(Enums_1.MathOperation).filter(e => e != Enums_1.MathOperation.Replace).map((mathOperation, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: "index", onClick: () => this.props.onSmartEditOperationChange(mathOperation) }, mathOperation);
        });
        return (React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyIds.SmartEditStrategyName, bsStyle: "primary", glyphicon: StrategyIds.SmartEditGlyph, infoBody: infoBody },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true, onSubmit: () => this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplySmartEdit() },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName" },
                        React.createElement(react_bootstrap_1.InputGroup, null,
                            React.createElement(react_bootstrap_1.DropdownButton, { title: Enums_1.MathOperation[this.props.MathOperation], id: "SmartEdit_Operation", componentClass: react_bootstrap_1.InputGroup.Button }, operationMenuItems),
                            React.createElement(react_bootstrap_1.FormControl, { value: this.props.SmartEditValue.toString(), type: "number", placeholder: "Enter a Number", step: "any", onChange: (e) => this.onSmartEditValueChange(e) }))),
                    ' ',
                    React.createElement(react_bootstrap_1.Button, { bsStyle: this.getButtonStyle(), disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.SmartEditValue) || (this.props.PreviewInfo && this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent), onClick: () => { this.props.PreviewInfo && this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplySmartEdit(); } }, "Apply to Grid"),
                    ' ',
                    (this.props.PreviewInfo && this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning) &&
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Validation Error", bodyText: [globalValidationMessage], MessageType: Enums_1.MessageType.Warning }),
                    (this.props.PreviewInfo && !this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning && this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) &&
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Validation Error", bodyText: [globalValidationMessage], MessageType: Enums_1.MessageType.Error }))),
            previewPanel));
    }
    onSmartEditValueChange(event) {
        const e = event.target;
        this.props.onSmartEditValueChange(Number(e.value));
    }
    getValidationErrorMessage(CellValidations) {
        let returnString = [];
        for (let CellValidation of CellValidations) {
            let expressionDescription = (ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(CellValidation.Expression)) ?
                " when " + ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, this.props.Columns) :
                "";
            returnString.push(CellValidation.Description + expressionDescription);
        }
        return returnString.join("\n");
    }
    onApplySmartEdit() {
        this.props.onApplySmartEdit();
    }
    onConfirmWarningCellValidation() {
        let confirmation = {
            CancelText: "Cancel Edit",
            ConfirmationTitle: "Cell Validation Failed",
            ConfirmationMsg: "Do you want to continue?",
            ConfirmationText: "Bypass Rule",
            CancelAction: SmartEditRedux.SmartEditApply(false),
            ConfirmAction: SmartEditRedux.SmartEditApply(true),
            ShowCommentBox: true
        };
        this.props.onConfirmWarningCellValidation(confirmation);
    }
    getButtonStyle() {
        if (this.props.PreviewInfo) {
            if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
                return "default";
            }
            if (this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning || this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) {
                return "warning";
            }
        }
        return "success";
    }
}
function mapStateToProps(state, ownProps) {
    return {
        SmartEditValue: state.SmartEdit.SmartEditValue,
        MathOperation: state.SmartEdit.MathOperation,
        PreviewInfo: state.SmartEdit.PreviewInfo,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSmartEditValueChange: (value) => dispatch(SmartEditRedux.SmartEditChangeValue(value)),
        onSmartEditOperationChange: (SmartEditOperation) => dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation)),
        onSmartEditCheckSelectedCells: () => dispatch(SmartEditRedux.SmartEditCheckCellSelection()),
        onApplySmartEdit: () => dispatch(SmartEditRedux.SmartEditApply(false)),
        onConfirmWarningCellValidation: (confirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    };
}
exports.SmartEditPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SmartEditPopupComponent);
