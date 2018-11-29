"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ColumnCategoryRedux = require("../../Redux/ActionsReducers/ColumnCategoryRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
//import { ColumnCategoryWizard } from './Wizard/ColumnCategoryWizard'
//import { ColumnCategoryEntityRow } from './ColumnCategoryEntityRow'
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const ColumnCategoryEntityRow_1 = require("./ColumnCategoryEntityRow");
const ColumnCategoryWizard_1 = require("./Wizard/ColumnCategoryWizard");
class ColumnCategoryPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew();
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__ColumnCategory";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__ColumnCategory";
        let infoBody = ["Column Categories allow you to link different columns, primarily for use in Conditional Styles.", React.createElement("br", null), React.createElement("br", null),
            "They are also used in Column Chooser to make it easier to find and manage large column sets."];
        let colItems = [
            { Content: "Categry", Size: 2 },
            { Content: "Columns", Size: 7 },
            { Content: "", Size: 3 },
        ];
        let ColumnCategoryRows = this.props.ColumnCategorys.map((x, index) => {
            return React.createElement(ColumnCategoryEntityRow_1.ColumnCategoryEntityRow, { key: index, cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: x, Columns: this.props.Columns, UserFilters: this.props.UserFilters, Index: index, onEdit: (index, x) => this.onEdit(index, x), onShare: () => this.props.onShare(x), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: ColumnCategoryRedux.ColumnCategoryDelete(x) });
        });
        let newSearchButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create New Advanced Search", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, bsStyle: "primary", headerText: StrategyConstants.ColumnCategoryStrategyName, infoBody: infoBody, button: newSearchButton, glyphicon: StrategyConstants.ColumnCategoryGlyph, className: "ab_main_popup" },
                ColumnCategoryRows.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: ColumnCategoryRows }),
                ColumnCategoryRows.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to start creating ColumnCategorys.")),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(ColumnCategoryWizard_1.ColumnCategoryWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: this.props.ColumnCategorys, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, ColumnCategorys: this.props.ColumnCategorys, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyColumnCategory(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, ColumnCategory) {
        let clonedObject = Helper_1.Helper.cloneObject(ColumnCategory);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let ColumnCategory = this.state.EditedAdaptableBlotterObject;
        if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
            this.props.onEditColumnCategory(this.state.EditedAdaptableBlotterObjectIndex, ColumnCategory);
        }
        else {
            this.props.onAddColumnCategory(ColumnCategory);
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
    }
    canFinishWizard() {
        let ColumnCategory = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotEmpty(ColumnCategory.ColumnCategoryId) && ArrayExtensions_1.ArrayExtensions.IsNotEmpty(ColumnCategory.ColumnIds);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ColumnCategorys: state.ColumnCategory.ColumnCategories,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddColumnCategory: (ColumnCategory) => dispatch(ColumnCategoryRedux.ColumnCategoryAdd(ColumnCategory)),
        onEditColumnCategory: (Index, ColumnCategory) => dispatch(ColumnCategoryRedux.ColumnCategoryEdit(Index, ColumnCategory)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnCategoryStrategyId))
    };
}
exports.ColumnCategoryPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnCategoryPopupComponent);
