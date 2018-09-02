"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const PlusMinusRedux = require("../../Redux/ActionsReducers/PlusMinusRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../../Core/Constants/StrategyGlyphs");
const Helper_1 = require("../../Core/Helpers/Helper");
const PlusMinusWizard_1 = require("./Wizard/PlusMinusWizard");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const PlusMinusEntityRow_1 = require("./PlusMinusEntityRow");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
class PlusMinusPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let plusMinus = ObjectFactory_1.ObjectFactory.CreateEmptyPlusMinusRule();
                plusMinus.ColumnId = arrayParams[1];
                this.setState({ EditedAdaptableBlotterObject: plusMinus, EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 1 });
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__plusminus";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__plusminus";
        let infoBody = ["Enables the creation of Plus/Minus 'Nudge' Rules (i.e. how much to increment numeric cells when ", React.createElement("i", null, "'+'"), " or ", React.createElement("i", null, "'-'"), " keys are pressed on the keyboard).", React.createElement("br", null), React.createElement("br", null),
            "Plus/Minus 'Nudge' Rules can be set for any numeric column, with option to specify whether a nudge is always applied or only when a particular condition is met."];
        let colItems = [
            { Content: "Column", Size: 3 },
            { Content: "Nudge Value", Size: 2 },
            { Content: "Row Condition", Size: 5 },
            { Content: "", Size: 2 },
        ];
        let PlusMinusRules = this.props.PlusMinusRules.map((x, index) => {
            let column = this.props.Columns.find(y => y.ColumnId == x.ColumnId);
            return React.createElement(PlusMinusEntityRow_1.PlusMinusEntityRow, { cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: x, key: index, Index: index, UserFilters: this.props.UserFilters, Columns: this.props.Columns, onEdit: (index, customSort) => this.onEdit(index, x), TeamSharingActivated: this.props.TeamSharingActivated, onShare: () => this.props.onShare(x), onDeleteConfirm: PlusMinusRedux.PlusMinusDeleteCondition(index), Column: column, onColumnDefaultNudgeValueChange: (index, event) => this.onColumnDefaultNudgeValueChange(index, event) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.createColumnNudgeValue(), overrideTooltip: "Create Plus / Minus Rule", DisplayMode: "Glyph+Text", size: "small" });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyNames.PlusMinusStrategyName, bsStyle: "primary", cssClassName: cssClassName, button: newButton, glyphicon: StrategyGlyphs.PlusMinusGlyph, infoBody: infoBody },
                PlusMinusRules.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: PlusMinusRules }),
                PlusMinusRules.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" }, "Click 'New' to create new Nudge Value rules for when the '+' or '-' keys are clicked while in a numeric cell."),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(PlusMinusWizard_1.PlusMinusWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, WizardStartIndex: this.state.WizardStartIndex, SelectedColumnId: null, Blotter: this.props.Blotter, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    createColumnNudgeValue() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyPlusMinusRule(), EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 0 });
    }
    onEdit(index, condition) {
        let clonedObject = Helper_1.Helper.cloneObject(condition);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, EditedAdaptableBlotterObjectIndex: index, WizardStartIndex: 1 });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let plusMinus = this.state.EditedAdaptableBlotterObject;
        this.onAddColumnDefaultNudgeValue(this.state.EditedAdaptableBlotterObjectIndex, plusMinus);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let plusMinus = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(plusMinus.ColumnId) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(plusMinus.NudgeValue.toString()) && // check its a number??
            (plusMinus.IsDefaultNudge || ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(plusMinus.Expression));
    }
    onColumnDefaultNudgeValueChange(index, event) {
        let e = event.target;
        this.props.onEditColumnDefaultNudgeValue(index, { ColumnId: this.props.PlusMinusRules[index].ColumnId, DefaultNudge: parseFloat(e.value) });
    }
    onAddColumnDefaultNudgeValue(index, plusMinus) {
        // check if its a default nudge value that there is not one already set for that column
        if (plusMinus.IsDefaultNudge) {
            let existingIndex = this.props.PlusMinusRules.findIndex(p => p.ColumnId == plusMinus.ColumnId && p.IsDefaultNudge);
            if (existingIndex > -1) {
                if (existingIndex == index) { // editing the existing default nudge so just do an edit
                    this.props.onEditColumnDefaultNudgeValue(index, { ColumnId: plusMinus.ColumnId, DefaultNudge: plusMinus.NudgeValue });
                }
                else { // its a new one so need warning that will update
                    this.onConfirmWarningCellValidation(existingIndex, plusMinus);
                }
            }
            else {
                this.props.onAddColumnDefaultNudgeValue(this.state.EditedAdaptableBlotterObjectIndex, plusMinus);
            }
        }
        else {
            this.props.onAddColumnDefaultNudgeValue(this.state.EditedAdaptableBlotterObjectIndex, plusMinus);
        }
    }
    onConfirmWarningCellValidation(index, plusMinus) {
        let confirmation = {
            CancelText: "Cancel Edit",
            ConfirmationTitle: "Existing Default Column Nudge Value for: " + plusMinus.ColumnId,
            ConfirmationMsg: "Do you want to override it with new value: ?",
            ConfirmationText: "Bypass Rule",
            CancelAction: null,
            ConfirmAction: PlusMinusRedux.PlusMinusEditCondition(index, { ColumnId: plusMinus.ColumnId, DefaultNudge: plusMinus.NudgeValue }),
            ShowCommentBox: false
        };
        this.props.onConfirmWarningCellValidation(confirmation);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        PlusMinusRules: state.PlusMinus.PlusMinusRules,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onEditColumnDefaultNudgeValue: (Index, ColumnDefaultNudge) => dispatch(PlusMinusRedux.PlusMinusEditCondition(Index, ColumnDefaultNudge)),
        onAddColumnDefaultNudgeValue: (Index, ColumnsDefaultNudge) => dispatch(PlusMinusRedux.PlusMinusAddUpdateCondition(Index, ColumnsDefaultNudge)),
        onConfirmWarningCellValidation: (confirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.PlusMinusStrategyId))
    };
}
exports.PlusMinusPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PlusMinusPopupComponent);
