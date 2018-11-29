"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const ConditionalStyleRedux = require("../../Redux/ActionsReducers/ConditionalStyleRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../Utilities/Enums");
const ConditionalStyleEntityRow_1 = require("./ConditionalStyleEntityRow");
const ConditionalStyleWizard_1 = require("./Wizard/ConditionalStyleWizard");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
class ConditionalStylePopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let _editedConditionalStyle = ObjectFactory_1.ObjectFactory.CreateEmptyConditionalStyle();
                _editedConditionalStyle.ColumnId = arrayParams[1];
                _editedConditionalStyle.ConditionalStyleScope = Enums_1.ConditionalStyleScope.Column;
                this.setState({ EditedAdaptableBlotterObject: _editedConditionalStyle, WizardStartIndex: 1 });
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__conditionalstyle";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__conditionalstyle";
        let infoBody = ["Conditional Styles enable columns and rows to be given distinct styles according to user rules.", React.createElement("br", null), React.createElement("br", null),
            "Styles include selection of fore and back colours, and font properties."];
        let colItems = [
            { Content: "Target", Size: 2 },
            { Content: "Style", Size: 2 },
            { Content: "Query", Size: 6 },
            { Content: "", Size: 2 },
        ];
        let conditionalStyles = this.props.ConditionalStyles.map((conditionalStyle, index) => {
            return React.createElement(ConditionalStyleEntityRow_1.ConditionalStyleEntityRow, { cssClassName: cssClassName, AdaptableBlotterObject: conditionalStyle, colItems: colItems, key: "CS" + index, Index: index, onShare: () => this.props.onShare(conditionalStyle), TeamSharingActivated: this.props.TeamSharingActivated, UserFilters: this.props.UserFilters, Columns: this.props.Columns, onEdit: (index, conditionalStyle) => this.onEdit(index, conditionalStyle), onDeleteConfirm: ConditionalStyleRedux.ConditionalStyleDelete(index, conditionalStyle) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create Conditional Style", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.ConditionalStyleStrategyName, button: newButton, bsStyle: StyleConstants.PRIMARY_BSSTYLE, cssClassName: cssClassName, glyphicon: StrategyConstants.ConditionalStyleGlyph, infoBody: infoBody },
                this.props.ConditionalStyles.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" }, "Click 'New' to create a new conditional style to be applied at row or column level."),
                conditionalStyles.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: conditionalStyles }),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(ConditionalStyleWizard_1.ConditionalStyleWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, ColorPalette: this.props.ColorPalette, ColumnCategories: this.props.ColumnCategories, StyleClassNames: this.props.StyleClassNames, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyConditionalStyle(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, condition) {
        let clonedObject = Helper_1.Helper.cloneObject(condition);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let conditionalStyle = this.state.EditedAdaptableBlotterObject;
        this.props.onAddUpdateConditionalStyle(this.state.EditedAdaptableBlotterObjectIndex, conditionalStyle);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let conditionalStyle = this.state.EditedAdaptableBlotterObject;
        if (conditionalStyle.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column && StringExtensions_1.StringExtensions.IsNullOrEmpty(conditionalStyle.ColumnId)) {
            return false;
        }
        if (conditionalStyle.ConditionalStyleScope == Enums_1.ConditionalStyleScope.ColumnCategory && StringExtensions_1.StringExtensions.IsNullOrEmpty(conditionalStyle.ColumnCategoryId)) {
            return false;
        }
        return ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(conditionalStyle.Expression) && UIHelper_1.UIHelper.IsNotEmptyStyle(conditionalStyle.Style);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
        StyleClassNames: state.UserInterface.StyleClassNames,
        ColumnCategories: state.ColumnCategory.ColumnCategories
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateConditionalStyle: (index, conditionalStyle) => dispatch(ConditionalStyleRedux.ConditionalStyleAddUpdate(index, conditionalStyle)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ConditionalStyleStrategyId))
    };
}
exports.ConditionalStylePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ConditionalStylePopupComponent);
