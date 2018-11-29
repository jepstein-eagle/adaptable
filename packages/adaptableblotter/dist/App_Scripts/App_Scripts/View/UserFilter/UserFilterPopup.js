"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const UserFilterRedux = require("../../Redux/ActionsReducers/UserFilterRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const UserFilterWizard_1 = require("./Wizard/UserFilterWizard");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const UserFilterEntityRow_1 = require("./UserFilterEntityRow");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
class UserFilterPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let userFilter = ObjectFactory_1.ObjectFactory.CreateEmptyUserFilter();
                userFilter.ColumnId = arrayParams[1];
                this.setState({ EditedAdaptableBlotterObject: userFilter, WizardStartIndex: 1 });
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__userfilter";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__userfilter";
        let infoBody = ["User Filters are named, reusable Column Queries.", React.createElement("br", null), React.createElement("br", null),
            "Once created, User Filters are available in the column's filter dropdown as if a single colum value.", React.createElement("br", null), React.createElement("br", null),
            "Additionally they are available when creating other Queries (e.g. for Advanced Search)", React.createElement("br", null), React.createElement("br", null),
            "A User Filter Query can contain only one Column Condition; but that condition may contain as many column values, filter or ranges as required."];
        let selectedColumnId = "";
        if (this.state.EditedAdaptableBlotterObject != null) {
            let filter = this.state.EditedAdaptableBlotterObject;
            let editedColumn = filter.ColumnId;
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(editedColumn)) {
                selectedColumnId = editedColumn;
            }
            else if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
                let arrayParams = this.props.PopupParams.split("|");
                if (arrayParams.length == 2) {
                    selectedColumnId = arrayParams[1];
                }
            }
        }
        let colItems = [
            { Content: "Name", Size: 2 },
            { Content: "Column", Size: 2 },
            { Content: "Description", Size: 6 },
            { Content: "", Size: 2 },
        ];
        let UserFilterItems = this.props.UserFilters.map((userFilter, index) => {
            return React.createElement(UserFilterEntityRow_1.UserFilterEntityRow, { cssClassName: cssClassName, AdaptableBlotterObject: userFilter, colItems: colItems, key: "CS" + index, Index: index, onShare: () => this.props.onShare(userFilter), TeamSharingActivated: this.props.TeamSharingActivated, UserFilters: this.props.UserFilters, Columns: this.props.Columns, onEdit: (index, userFilter) => this.onEdit(index, userFilter), onDeleteConfirm: UserFilterRedux.UserFilterDelete(userFilter) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create User Filter", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.UserFilterStrategyName, bsStyle: "primary", cssClassName: cssClassName, infoBody: infoBody, button: newButton, glyphicon: StrategyConstants.UserFilterGlyph },
                UserFilterItems.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: UserFilterItems }),
                UserFilterItems.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                        "Click 'New' to start creating user filters.",
                        React.createElement("p", null),
                        "Once created, user filters are accessible both when filtering columns and creating queries (e.g. Advanced Search, Plus / Minus, Conditional Style etc.)."),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(UserFilterWizard_1.UserFilterWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, Columns: this.props.Columns, ConfigEntities: null, ModalContainer: this.props.ModalContainer, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, WizardStartIndex: this.state.WizardStartIndex, SelectedColumnId: selectedColumnId, Blotter: this.props.Blotter, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyUserFilter(), WizardStartIndex: 0 });
    }
    onEdit(index, userFilter) {
        let clonedObject = Helper_1.Helper.cloneObject(userFilter);
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(clonedObject), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let userFilter = this.state.EditedAdaptableBlotterObject;
        this.props.onAddUpdateUserFilter(this.state.EditedAdaptableBlotterObjectIndex, userFilter);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let userFilter = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(userFilter.Name) && StringExtensions_1.StringExtensions.IsNotEmpty(userFilter.ColumnId) && ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(userFilter.Expression);
    }
}
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateUserFilter: (index, userFilter) => dispatch(UserFilterRedux.UserFilterAddUpdate(index, userFilter)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.UserFilterStrategyId))
    };
}
exports.UserFilterPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(UserFilterPopupComponent);
