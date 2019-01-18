"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const ColumnFilterRedux = require("../../Redux/ActionsReducers/ColumnFilterRedux");
const SummaryRowItem_1 = require("../Components/StrategySummary/SummaryRowItem");
const StrategyProfile_1 = require("../Components/StrategyProfile");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
class ColumnFilterSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.getEmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__columnfilter";
        let columnFilter = this.props.ColumnFilters.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId);
        let description = this.getDescription(columnFilter);
        let summaryItems = [];
        summaryItems.push(React.createElement("b", null, React.createElement(StrategyProfile_1.StrategyProfile, { cssClassName: this.props.cssClassName, StrategyId: StrategyConstants.ColumnFilterStrategyId })));
        summaryItems.push(description);
        summaryItems.push(React.createElement(ButtonClear_1.ButtonClear, { cssClassName: this.props.cssClassName, bsStyle: StyleConstants.PRIMARY_BSSTYLE, size: "xs", onClick: () => this.props.onClearFilter(columnFilter.ColumnId), overrideTooltip: "Clear Column Filter", DisplayMode: "Glyph", overrideDisableButton: columnFilter == null, AccessLevel: this.props.AccessLevel }));
        return React.createElement(SummaryRowItem_1.SummaryRowItem, { cssClassName: cssWizardClassName, SummaryItems: summaryItems });
    }
    getDescription(columnFilter) {
        if (this.props.SummarisedColumn && !this.props.SummarisedColumn.Filterable) {
            return "Column is not filterable";
        }
        if (columnFilter == null) {
            return "No Column Filter Active";
        }
        return ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns);
    }
}
exports.ColumnFilterSummaryComponent = ColumnFilterSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClearFilter: (columnId) => dispatch(ColumnFilterRedux.ColumnFilterClear(columnId)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnFilterStrategyId))
    };
}
exports.ColumnFilterSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnFilterSummaryComponent);
