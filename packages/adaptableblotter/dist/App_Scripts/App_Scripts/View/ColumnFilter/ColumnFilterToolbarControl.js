"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const ColumnFilterRedux = require("../../Redux/ActionsReducers/ColumnFilterRedux");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const AdaptablePopover_1 = require("../AdaptablePopover");
const Enums_1 = require("../../Utilities/Enums");
const GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
const react_bootstrap_1 = require("react-bootstrap");
const ColumnFilterHelper_1 = require("../../Utilities/Helpers/ColumnFilterHelper");
class ColumnFilterToolbarControlComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__columnfilter";
        let collapsedText = this.props.ColumnFilters.length == 0 ?
            "No Filters" :
            this.props.ColumnFilters.length == 1 ?
                "1 Column" :
                this.props.ColumnFilters.length + " Columns";
        let filterStrings = ColumnFilterHelper_1.ColumnFilterHelper.ConvertColumnFiltersToKVPArray(this.props.ColumnFilters, this.props.Columns);
        let infoBody = [];
        filterStrings.forEach(fs => {
            infoBody.push(React.createElement("b", null,
                " ",
                fs.Key,
                " "));
            infoBody.push(fs.Value, React.createElement("br", null));
        });
        let content = React.createElement("span", null,
            React.createElement("div", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", style: { width: "80px" }, value: collapsedText, disabled: true, type: "string" }),
                ' ',
                infoBody.length > 0 &&
                    React.createElement("span", null,
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Active Filters", bodyText: infoBody, tooltipText: "Show Filter Details", MessageType: Enums_1.MessageType.Info, useButton: true, triggerAction: "click" }),
                        ' ',
                        React.createElement(ButtonClear_1.ButtonClear, { onClick: () => this.onClearFilters(), bsStyle: "primary", cssClassName: cssClassName, size: "small", overrideTooltip: "Clear Column Filters", DisplayMode: "Text+Glyph", overrideDisableButton: this.props.ColumnFilters.length == 0, AccessLevel: this.props.AccessLevel }))));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyConstants.ColumnFilterStrategyName, glyphicon: StrategyConstants.ColumnFilterGlyph, onClose: () => this.props.onClose(StrategyConstants.ColumnFilterStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onClearFilters() {
        // better to put in store but lets test first...
        this.props.onClearAllFilters();
        this.props.Blotter.clearGridFiltering();
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClearAllFilters: () => dispatch(ColumnFilterRedux.ColumnFilterClearAll()),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ColumnFilterStrategyId, ScreenPopups.ColumnFilterPopup))
    };
}
exports.ColumnFilterToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnFilterToolbarControlComponent);
