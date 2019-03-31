"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const _ = require("lodash");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const QuickSearchRedux = require("../../Redux/ActionsReducers/QuickSearchRedux");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const AdaptableBlotterFormControlTextClear_1 = require("../Components/Forms/AdaptableBlotterFormControlTextClear");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
class QuickSearchToolbarControlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.debouncedRunQuickSearch = _.debounce(() => this.props.onRunQuickSearch(this.state.EditedQuickSearchText), 250);
        this.state = { EditedQuickSearchText: this.props.QuickSearchText };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            EditedQuickSearchText: nextProps.QuickSearchText
        });
    }
    render() {
        let cssClassName = this.props.cssClassName + "__quicksearch";
        let content = React.createElement("span", null,
            React.createElement(AdaptableBlotterFormControlTextClear_1.AdaptableBlotterFormControlTextClear, { cssClassName: cssClassName, style: { width: "135px" }, bsSize: this.props.DashboardSize, type: "text", placeholder: "Search Text", value: this.state.EditedQuickSearchText, OnTextChange: (x) => this.onUpdateQuickSearchText(x) }),
            ' ');
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, useDefaultPanelStyle: this.props.UseSingleColourForButtons, headerText: StrategyConstants.QuickSearchStrategyName, glyphicon: StrategyConstants.QuickSearchGlyph, onClose: () => this.props.onClose(StrategyConstants.QuickSearchStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onUpdateQuickSearchText(searchText) {
        this.setState({ EditedQuickSearchText: searchText });
        this.debouncedRunQuickSearch();
    }
}
function mapStateToProps(state, ownProps) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onRunQuickSearch: (newQuickSearchText) => dispatch(QuickSearchRedux.QuickSearchApply(newQuickSearchText)),
        onShowQuickSearchPopup: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.QuickSearchStrategyId, ScreenPopups.QuickSearchPopup)),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.QuickSearchStrategyId, ScreenPopups.QuickSearchPopup)),
    };
}
exports.QuickSearchToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(QuickSearchToolbarControlComponent);
