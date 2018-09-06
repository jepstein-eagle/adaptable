"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const CellValidationRedux = require("../../Redux/ActionsReducers/CellValidationRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const Helper_1 = require("../../Core/Helpers/Helper");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const CellValidationWizard_1 = require("./Wizard/CellValidationWizard");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const CellValidationEntityRow_1 = require("./CellValidationEntityRow");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
class CellValidationPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let cellValitdation = ObjectFactory_1.ObjectFactory.CreateEmptyCellValidation();
                cellValitdation.ColumnId = arrayParams[1];
                this.setState({ EditedAdaptableBlotterObject: cellValitdation, EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 1 });
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__cellValidation";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__cellvalidation";
        let infoBody = ["Cell Validation Rules determine whether an edit is valid.", React.createElement("br", null), React.createElement("br", null),
            "Rules can disallow all edits for a specified column, or only those that fail to meet specified criteria.", React.createElement("br", null), React.createElement("br", null),
            "When a rule is broken, you can choose whether to prevent the edit outright, or allow it after a warning is displayed."];
        let colItems = [
            { Content: "Validation Rule", Size: 4 },
            { Content: "Expression", Size: 4 },
            { Content: "Action", Size: 2 },
            { Content: "", Size: 2 },
        ];
        let CellValidationItems = this.props.CellValidations.map((x, index) => {
            let column = this.props.Columns.find(c => c.ColumnId == x.ColumnId);
            return React.createElement(CellValidationEntityRow_1.CellValidationEntityRow, { key: index, cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: x, Column: column, Columns: this.props.Columns, UserFilters: this.props.UserFilters, Index: index, onEdit: (index, x) => this.onEdit(index, x), onShare: () => this.props.onShare(x), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: CellValidationRedux.CellValidationDelete(index), onChangeActionMode: (index, x) => this.onActionModeChanged(index, x) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.createCellValidation(), overrideTooltip: "Create Cell Validation Rule", DisplayMode: "Glyph+Text", size: "small" });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyIds.CellValidationStrategyName, bsStyle: "primary", cssClassName: cssClassName, button: newButton, glyphicon: StrategyIds.CellValidationGlyph, infoBody: infoBody },
                CellValidationItems.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: CellValidationItems }),
                CellValidationItems.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to start creating rules for valid cell edits."),
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Edits that fail validation can be either prevented altogether or allowed (after over-riding a warning and providing a reason).")),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(CellValidationWizard_1.CellValidationWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, Blotter: this.props.Blotter, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    createCellValidation() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyCellValidation(), EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 0 });
    }
    onEdit(index, CellValidation) {
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(CellValidation), EditedAdaptableBlotterObjectIndex: index, WizardStartIndex: 1 });
    }
    onActionModeChanged(index, ActionMode) {
        this.props.onChangeActionMode(index, ActionMode);
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        this.props.onAddEditCellValidation(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let cellValidationRule = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(cellValidationRule.ColumnId) &&
            (ExpressionHelper_1.ExpressionHelper.IsEmptyOrValidExpression(cellValidationRule.Expression)) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(cellValidationRule.Description);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CellValidations: state.CellValidation.CellValidations
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddEditCellValidation: (index, CellValidation) => dispatch(CellValidationRedux.CellValidationAddUpdate(index, CellValidation)),
        onChangeActionMode: (index, ActionMode) => dispatch(CellValidationRedux.CellValidationChangeMode(index, ActionMode)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CellValidationStrategyId))
    };
}
exports.CellValidationPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CellValidationPopupComponent);
