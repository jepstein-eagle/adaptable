"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const CustomSortRedux = require("../../Redux/ActionsReducers/CustomSortRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const Helper_1 = require("../../Core/Helpers/Helper");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const CustomSortEntityRow_1 = require("./CustomSortEntityRow");
const CustomSortWizard_1 = require("./Wizard/CustomSortWizard");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const ArrayExtensions_1 = require("../../Core/Extensions/ArrayExtensions");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
class CustomSortPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let newCustomSort = ObjectFactory_1.ObjectFactory.CreateEmptyCustomSort();
                newCustomSort.ColumnId = arrayParams[1];
                this.onEdit(newCustomSort);
            }
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let editCustomSort = this.props.CustomSorts.find(x => x.ColumnId == arrayParams[1]);
                this.onEdit(editCustomSort);
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__customsort";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__customsort";
        let infoBody = ["Custom Sorts enable you to create your own sort orders for columns where the default (alphabetical ascending or descending) is insufficient.", React.createElement("br", null), React.createElement("br", null),
            "Use the Wizard to specify and order the column values in the Sort.", React.createElement("br", null), React.createElement("br", null),
            "A Custom Sort can contain as many column values as required; any values not contained in the Custom Sort will be sorted alphabetically ", React.createElement("strong", null, "after"), " the sort order has been applied."];
        let colItems = [
            { Content: "Column", Size: 3 },
            { Content: "Sort Order", Size: 7 },
            { Content: "", Size: 2 },
        ];
        let customSorts = this.props.CustomSorts.map((customSort, index) => {
            return React.createElement(CustomSortEntityRow_1.CustomSortEntityRow, { cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: customSort, key: customSort.ColumnId, Index: index, onEdit: (index, customSort) => this.onEdit(customSort), TeamSharingActivated: this.props.TeamSharingActivated, onShare: () => this.props.onShare(customSort), onDeleteConfirm: CustomSortRedux.CustomSortDelete(customSort), ColumnLabel: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(customSort.ColumnId, this.props.Columns) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create Custom Sort", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstants.CustomSortStrategyName, className: "ab_main_popup", infoBody: infoBody, button: newButton, bsStyle: "primary", glyphicon: StrategyConstants.CustomSortGlyph },
                customSorts.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: customSorts }),
                customSorts.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" }, "Click 'New' to create a bespoke sort order for a selected column."),
                this.state.EditedAdaptableBlotterObject &&
                    React.createElement(CustomSortWizard_1.CustomSortWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: this.props.CustomSorts, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onEdit(customSort) {
        //so we dont mutate original object
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(customSort), WizardStartIndex: 1 });
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyCustomSort(), WizardStartIndex: 0 });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let customSort = this.state.EditedAdaptableBlotterObject;
        if (this.props.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
            this.props.onEditCustomSort(customSort);
        }
        else {
            this.props.onAddCustomSort(customSort);
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let customSort = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(customSort.ColumnId) && ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CustomSorts: state.CustomSort.CustomSorts,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddCustomSort: (customSort) => dispatch(CustomSortRedux.CustomSortAdd(customSort)),
        onEditCustomSort: (customSort) => dispatch(CustomSortRedux.CustomSortEdit(customSort)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CustomSortStrategyId))
    };
}
exports.CustomSortPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CustomSortPopupComponent);
