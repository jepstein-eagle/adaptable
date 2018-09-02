"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const FilterRedux = require("../../Redux/ActionsReducers/FilterRedux");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../../Core/Constants/ScreenPopups");
const AdaptablePopover_1 = require("../AdaptablePopover");
const Enums_1 = require("../../Core/Enums");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
const react_bootstrap_1 = require("react-bootstrap");
class ColumnFilterToolbarControlComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__columnfilter";
        let collapsedText = this.props.ColumnFilters.length == 0 ?
            "No Filters" :
            this.props.ColumnFilters.length == 1 ?
                "1 Column" :
                this.props.ColumnFilters.length + " Columns";
        let infoBody = [];
        this.props.ColumnFilters.forEach(x => {
            let column = this.props.Columns.find(c => c.ColumnId == x.ColumnId);
            if (column) {
                let expression = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(x.Filter, this.props.Columns, this.props.UserFilters);
                infoBody.push(React.createElement("b", null,
                    " ",
                    ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(x.ColumnId, this.props.Columns),
                    " "));
                infoBody.push(expression, React.createElement("br", null));
            }
        });
        let content = React.createElement("span", null,
            React.createElement("div", { className: this.props.IsReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", style: { width: "80px" }, value: collapsedText, disabled: true, type: "string" }),
                ' ',
                infoBody.length > 0 &&
                    React.createElement("span", null,
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Active Filters", bodyText: infoBody, tooltipText: "Show Filter Details", MessageType: Enums_1.MessageType.Info, useButton: true, triggerAction: "click" }),
                        ' ',
                        React.createElement(ButtonClear_1.ButtonClear, { onClick: () => this.props.onClearAllFilters(), bsStyle: "primary", cssClassName: cssClassName, size: "small", overrideTooltip: "Clear Column Filters", DisplayMode: "Text+Glyph", overrideDisableButton: this.props.ColumnFilters.length == 0 }))));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyNames.ColumnFilterStrategyName, glyphicon: StrategyGlyphs.ColumnFilterGlyph, onClose: () => this.props.onClose(StrategyIds.ColumnFilterStrategyId), onConfigure: () => this.props.onConfigure(this.props.IsReadOnly) }, content);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ColumnFilters: state.Filter.ColumnFilters,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClearAllFilters: () => dispatch(FilterRedux.ColumnFilterClearAll()),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: (isReadOnly) => dispatch(PopupRedux.PopupShowScreen(ScreenPopups.ColumnFilterPopup, isReadOnly))
    };
}
exports.ColumnFilterToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnFilterToolbarControlComponent);
