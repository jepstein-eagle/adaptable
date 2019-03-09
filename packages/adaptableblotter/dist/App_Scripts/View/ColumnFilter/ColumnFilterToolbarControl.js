"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const UserFilterRedux = require("../../Redux/ActionsReducers/UserFilterRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const GridRedux = require("../../Redux/ActionsReducers/GridRedux");
const ColumnFilterRedux = require("../../Redux/ActionsReducers/ColumnFilterRedux");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const AdaptablePopover_1 = require("../AdaptablePopover");
const Enums_1 = require("../../Utilities/Enums");
const GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
const react_bootstrap_1 = require("react-bootstrap");
const ActiveFiltersPanel_1 = require("./ActiveFiltersPanel");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const StyleConstants_1 = require("../../Utilities/Constants/StyleConstants");
const ButtonHide_1 = require("../Components/Buttons/ButtonHide");
const ButtonShow_1 = require("../Components/Buttons/ButtonShow");
class ColumnFilterToolbarControlComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__columnfilter";
        let collapsedText = ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.props.ColumnFilters) ?
            "No Filters" :
            ArrayExtensions_1.ArrayExtensions.HasOneItem(this.props.ColumnFilters) ?
                "1 Filter" :
                this.props.ColumnFilters.length + " Filters";
        let activeFiltersPanel = React.createElement(ActiveFiltersPanel_1.ActiveFiltersPanel, { cssClassName: cssClassName, Columns: this.props.Columns, ColumnFilters: this.props.ColumnFilters, AccessLevel: this.props.AccessLevel, onClear: (columnFilter) => this.onClearColumnFilter(columnFilter), onSaveColumnFilterasUserFilter: (columnFilter) => this.onSaveColumnFilterasUserFilter(columnFilter) });
        let content = React.createElement("span", null,
            React.createElement("div", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(react_bootstrap_1.Label, { bsSize: "large", bsStyle: this.getStyleForLabel() }, collapsedText),
                ' ',
                ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters) &&
                    React.createElement("span", null,
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { showDefaultStyle: this.props.UseSingleColourForButtons, size: this.props.DashboardSize, cssClassName: cssClassName, headerText: "", bodyText: [activeFiltersPanel], tooltipText: "Show Filter Details", useButton: true, triggerAction: "click", popoverMinWidth: 400 }),
                        ' ',
                        React.createElement(ButtonClear_1.ButtonClear, { onClick: () => this.onClearFilters(), bsStyle: "primary", cssClassName: cssClassName, size: this.props.DashboardSize, overrideTooltip: "Clear Column Filters", DisplayMode: "Text", overrideDisableButton: this.props.ColumnFilters.length == 0, AccessLevel: this.props.AccessLevel, showDefaultStyle: this.props.UseSingleColourForButtons })),
                this.props.IsFloatingFilterActive ?
                    React.createElement(ButtonHide_1.ButtonHide, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.props.onHideFloatingFilterBar(), size: this.props.DashboardSize, overrideTooltip: "Hide Floating Filter", DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel, overrideDisableButton: !this.props.Blotter.BlotterOptions.filterOptions.useAdaptableBlotterFloatingFilter, showDefaultStyle: this.props.UseSingleColourForButtons })
                    :
                        React.createElement(ButtonShow_1.ButtonShow, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.props.onShowFloatingFilterBar(), size: this.props.DashboardSize, overrideTooltip: "Show Floating Filter", DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel, overrideDisableButton: !this.props.Blotter.BlotterOptions.filterOptions.useAdaptableBlotterFloatingFilter, showDefaultStyle: this.props.UseSingleColourForButtons })));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyConstants.ColumnFilterStrategyName, glyphicon: StrategyConstants.ColumnFilterGlyph, onClose: () => this.props.onClose(StrategyConstants.ColumnFilterStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onClearFilters() {
        // better to put in store but lets test first...
        this.props.onClearAllFilters();
        this.props.Blotter.clearGridFiltering();
    }
    onClearColumnFilter(columnFilter) {
        this.props.onClearColumnFilter(columnFilter.ColumnId);
        this.props.Blotter.clearColumnFiltering([columnFilter.ColumnId]);
    }
    onSaveColumnFilterasUserFilter(columnFilter) {
        let prompt = {
            Header: "Enter name for User Filter",
            Msg: "",
            ConfirmAction: UserFilterRedux.CreateUserFilterFromColumnFilter(columnFilter, "")
        };
        this.props.onShowPrompt(prompt);
    }
    getStyleForLabel() {
        return (this.props.UseSingleColourForButtons == false && ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters)) ?
            StyleConstants_1.SUCCESS_BSSTYLE :
            StyleConstants_1.DEFAULT_BSSTYLE;
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
        IsFloatingFilterActive: state.Grid.IsFloatingFilterActive,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClearColumnFilter: (columnId) => dispatch(ColumnFilterRedux.ColumnFilterClear(columnId)),
        onShowPrompt: (prompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
        onClearAllFilters: () => dispatch(ColumnFilterRedux.ColumnFilterClearAll()),
        onHideFloatingFilterBar: () => dispatch(GridRedux.FloatingFilterBarHide()),
        onShowFloatingFilterBar: () => dispatch(GridRedux.FloatingilterBarShow()),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ColumnFilterStrategyId, ScreenPopups.ColumnFilterPopup))
    };
}
exports.ColumnFilterToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnFilterToolbarControlComponent);
