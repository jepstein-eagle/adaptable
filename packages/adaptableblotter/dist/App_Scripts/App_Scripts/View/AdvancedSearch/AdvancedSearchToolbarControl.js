"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const AdvancedSearchRedux = require("../../Redux/ActionsReducers/AdvancedSearchRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ButtonEdit_1 = require("../Components/Buttons/ButtonEdit");
const ButtonDelete_1 = require("../Components/Buttons/ButtonDelete");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../../Utilities/Enums");
const react_bootstrap_1 = require("react-bootstrap");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
class AdvancedSearchToolbarControlComponent extends React.Component {
    render() {
        const selectSearchString = "Select a Search";
        let cssClassName = this.props.cssClassName + "__advancedsearch";
        let savedSearch = this.props.AdvancedSearches.find(s => s.Name == this.props.CurrentAdvancedSearchName);
        let currentSearchName = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchName) ?
            selectSearchString : this.props.CurrentAdvancedSearchName;
        let sortedAdvancedSearches = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.props.AdvancedSearches, "Name");
        let availableSearches = sortedAdvancedSearches.filter(s => s.Name != this.props.CurrentAdvancedSearchName).map((search, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: index, onClick: () => this.onSelectedSearchChanged(search.Name) }, search.Name);
        });
        let content = React.createElement("span", null,
            React.createElement(react_bootstrap_1.InputGroup, null,
                React.createElement(react_bootstrap_1.DropdownButton, { disabled: availableSearches.length == 0, style: { minWidth: "120px" }, className: cssClassName, bsSize: "small", bsStyle: "default", title: currentSearchName, id: "advancedSearch", componentClass: react_bootstrap_1.InputGroup.Button }, availableSearches),
                currentSearchName != selectSearchString &&
                    React.createElement(react_bootstrap_1.InputGroup.Button, null,
                        React.createElement(ButtonClear_1.ButtonClear, { bsStyle: "default", cssClassName: cssClassName, onClick: () => this.onSelectedSearchChanged(""), size: "small", overrideTooltip: "Clear Search", overrideDisableButton: currentSearchName == selectSearchString, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }))),
            React.createElement("span", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(ButtonEdit_1.ButtonEdit, { style: { marginLeft: "5px" }, onClick: () => this.props.onEditAdvancedSearch(), cssClassName: cssClassName, size: "small", overrideTooltip: "Edit Current Advanced Search", overrideDisableButton: currentSearchName == selectSearchString, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonNew_1.ButtonNew, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.props.onNewAdvancedSearch(), size: "small", overrideTooltip: "Create New Advanced Search", DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonDelete_1.ButtonDelete, { style: { marginLeft: "2px" }, cssClassName: cssClassName, size: "small", overrideTooltip: "Delete Advanced Search", overrideDisableButton: currentSearchName == selectSearchString, DisplayMode: "Glyph", ConfirmAction: AdvancedSearchRedux.AdvancedSearchDelete(savedSearch), ConfirmationMsg: "Are you sure you want to delete '" + !savedSearch ? "" : savedSearch.Name + "'?", ConfirmationTitle: "Delete Advanced Search", AccessLevel: this.props.AccessLevel })));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyConstants.AdvancedSearchStrategyName, glyphicon: StrategyConstants.AdvancedSearchGlyph, onClose: () => this.props.onClose(StrategyConstants.AdvancedSearchStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onSelectedSearchChanged(searchName) {
        this.props.onSelectAdvancedSearch(searchName);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectAdvancedSearch: (advancedSearchName) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName)),
        onNewAdvancedSearch: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.AdvancedSearchStrategyId, ScreenPopups.AdvancedSearchPopup, "New")),
        onEditAdvancedSearch: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.AdvancedSearchStrategyId, ScreenPopups.AdvancedSearchPopup, "Edit")),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.AdvancedSearchStrategyId, ScreenPopups.AdvancedSearchPopup))
    };
}
exports.AdvancedSearchToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchToolbarControlComponent);
