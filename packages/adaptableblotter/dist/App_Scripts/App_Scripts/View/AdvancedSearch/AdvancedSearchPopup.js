"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const AdvancedSearchRedux = require("../../Redux/ActionsReducers/AdvancedSearchRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const AdvancedSearchWizard_1 = require("./Wizard/AdvancedSearchWizard");
const AdvancedSearchEntityRow_1 = require("./AdvancedSearchEntityRow");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const StyleConstants_1 = require("../../Core/Constants/StyleConstants");
class AdvancedSearchPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew();
        }
        if (this.props.PopupParams == "Edit") {
            let currentAdvancedSearch = this.props.AdvancedSearches.find(as => as.Name == this.props.CurrentAdvancedSearchName);
            if (currentAdvancedSearch) {
                let index = this.props.AdvancedSearches.findIndex(as => as.Name == currentAdvancedSearch.Name);
                this.onEdit(index, currentAdvancedSearch);
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__advancedsearch";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__advancedsearch";
        let infoBody = ["Build multi-column named searches by creating a Query - which will contain a selection of column values, filters and ranges.", React.createElement("br", null), React.createElement("br", null),
            "Created searches are available in the Advanced Search Toolbar dropdown in the Dashboard."];
        let contentSize = (this.props.TeamSharingActivated) ? 6 : 7;
        let buttonSize = (this.props.TeamSharingActivated) ? 3 : 2;
        let colItems = [
            { Content: "Current", Size: 1 },
            { Content: "Name", Size: 2 },
            { Content: "Query", Size: contentSize },
            { Content: "", Size: buttonSize },
        ];
        let advancedSearchRows = this.props.AdvancedSearches.map((advancedSearch, index) => {
            return React.createElement(AdvancedSearchEntityRow_1.AdvancedSearchEntityRow, { cssClassName: cssClassName, key: index, colItems: colItems, IsCurrentAdvancedSearch: advancedSearch.Name == this.props.CurrentAdvancedSearchName, AdaptableBlotterObject: advancedSearch, Columns: this.props.Columns, UserFilters: this.props.UserFilters, Index: index, onEdit: (index, advancedSearch) => this.onEdit(index, advancedSearch), onShare: () => this.props.onShare(advancedSearch), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: AdvancedSearchRedux.AdvancedSearchDelete(advancedSearch), onSelect: () => this.props.onSelectAdvancedSearch(advancedSearch.Name) });
        });
        let newSearchButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create New Advanced Search", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, headerText: StrategyConstants.AdvancedSearchStrategyName, infoBody: infoBody, button: newSearchButton, glyphicon: StrategyConstants.AdvancedSearchGlyph, className: "ab_main_popup" },
                advancedSearchRows.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: advancedSearchRows }),
                advancedSearchRows.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to start creating advanced searches.")),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(AdvancedSearchWizard_1.AdvancedSearchWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: this.props.AdvancedSearches, Blotter: this.props.Blotter, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyAdvancedSearch(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, advancedSearch) {
        let clonedObject = Helper_1.Helper.cloneObject(advancedSearch);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let searchIndex = this.state.EditedAdaptableBlotterObjectIndex;
        let currentSearchIndex = this.props.AdvancedSearches.findIndex(as => as.Name == this.props.CurrentAdvancedSearchName);
        let clonedObject = Helper_1.Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        this.props.onAddUpdateAdvancedSearch(this.state.EditedAdaptableBlotterObjectIndex, clonedObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
        if (searchIndex == -1 || searchIndex == currentSearchIndex) { // its new so make it the new search or we are editing the current search (but might have changed the name)
            this.props.onSelectAdvancedSearch(clonedObject.Name);
        }
    }
    canFinishWizard() {
        let advancedSearch = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(advancedSearch.Name) && ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(advancedSearch.Expression);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
        CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateAdvancedSearch: (index, advancedSearch) => dispatch(AdvancedSearchRedux.AdvancedSearchAddUpdate(index, advancedSearch)),
        onSelectAdvancedSearch: (selectedSearchName) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(selectedSearchName)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AdvancedSearchStrategyId))
    };
}
exports.AdvancedSearchPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchPopupComponent);
