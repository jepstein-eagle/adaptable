"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const SmartEditRedux = require("../../Redux/ActionsReducers/SmartEditRedux");
const SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ButtonApply_1 = require("../Components/Buttons/ButtonApply");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
const AdaptablePopover_1 = require("../AdaptablePopover");
const Enums_1 = require("../../Utilities/Enums");
const PreviewResultsPanel_1 = require("../Components/PreviewResultsPanel");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const UIHelper_1 = require("../UIHelper");
class SmartEditToolbarControlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectedColumnId: "",
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
        let cssClassName = this.props.cssClassName + "__SmartEdit";
        let selctedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(this.state.SelectedColumnId, this.props.Columns);
        let previewPanel = React.createElement(PreviewResultsPanel_1.PreviewResultsPanel, { cssClassName: cssClassName, UpdateValue: this.props.SmartEditValue, PreviewInfo: this.props.PreviewInfo, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SelectedColumn: selctedColumn, ShowPanel: true, ShowHeader: false });
        let operationMenuItems = EnumExtensions_1.EnumExtensions.getNames(Enums_1.MathOperation).filter(e => e != Enums_1.MathOperation.Replace).map((mathOperation, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: "index", onClick: () => this.props.onSmartEditOperationChange(mathOperation) }, mathOperation);
        });
        let content = React.createElement("span", null,
            React.createElement("div", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly || !this.props.IsValidSelection ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(react_bootstrap_1.InputGroup, null,
                    React.createElement(react_bootstrap_1.DropdownButton, { style: { marginRight: "3px", width: "75px" }, title: this.props.MathOperation, id: "SmartEdit_Operation", bsSize: "small", componentClass: react_bootstrap_1.InputGroup.Button }, operationMenuItems),
                    React.createElement(react_bootstrap_1.FormControl, { value: this.props.SmartEditValue.toString(), style: { width: "70px" }, type: "number", placeholder: "Enter a Number", bsSize: "small", step: "any", onChange: (e) => this.onSmartEditValueChange(e) })),
                this.props.IsValidSelection &&
                    React.createElement(ButtonApply_1.ButtonApply, { cssClassName: cssClassName, style: { marginLeft: "3px" }, onClick: () => this.onApplyClick(), size: "small", glyph: "ok", bsStyle: UIHelper_1.UIHelper.getStyleNameByStatusColour(statusColour), overrideTooltip: "Apply Smart Edit", overrideDisableButton: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.SmartEditValue) || (this.props.PreviewInfo != null && this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent), DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }),
                this.props.IsValidSelection &&
                    React.createElement("span", { style: { marginLeft: "3px" } },
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Preview Results", tooltipText: "Preview Results", bodyText: [previewPanel], MessageType: UIHelper_1.UIHelper.getMessageTypeByStatusColour(statusColour), useButton: true, triggerAction: "click" }))));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyConstants.SmartEditStrategyName, glyphicon: StrategyConstants.SmartEditGlyph, onClose: () => this.props.onClose(StrategyConstants.SmartEditStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onSmartEditValueChange(event) {
        const e = event.target;
        this.props.onSmartEditValueChange(Number(e.value));
    }
    onSelectionChanged() {
        this.props.onSmartEditCheckSelectedCells();
    }
    getStatusColour() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.SmartEditValue) && this.props.PreviewInfo) {
            if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
                return Enums_1.StatusColour.Red;
            }
            if (this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning || this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) {
                return Enums_1.StatusColour.Amber;
            }
        }
        return Enums_1.StatusColour.Green;
    }
    getMathOperationSymbol(mathOperation) {
        switch (mathOperation) {
            case Enums_1.MathOperation.Add:
                return "+";
            case Enums_1.MathOperation.Subtract:
                return "-";
            case Enums_1.MathOperation.Multiply:
                return "x";
            case Enums_1.MathOperation.Divide:
                return "/";
        }
    }
    onApplyClick() {
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ?
            this.onConfirmWarningCellValidation() :
            this.onApplySmartEdit();
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
    onApplySmartEdit() {
        this.props.onApplySmartEdit();
    }
}
function mapStateToProps(state, ownProps) {
    return {
        SmartEditValue: state.SmartEdit.SmartEditValue,
        MathOperation: state.SmartEdit.MathOperation,
        IsValidSelection: state.System.IsValidSmartEditSelection,
        PreviewInfo: state.System.SmartEditPreviewInfo,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSmartEditValueChange: (value) => dispatch(SmartEditRedux.SmartEditChangeValue(value)),
        onSmartEditOperationChange: (SmartEditOperation) => dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation)),
        onSmartEditCheckSelectedCells: () => dispatch(SystemRedux.SmartEditCheckCellSelection()),
        onApplySmartEdit: () => dispatch(SmartEditRedux.SmartEditApply(false)),
        onConfirmWarningCellValidation: (confirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.SmartEditStrategyId, ScreenPopups.SmartEditPopup))
    };
}
exports.SmartEditToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SmartEditToolbarControlComponent);
