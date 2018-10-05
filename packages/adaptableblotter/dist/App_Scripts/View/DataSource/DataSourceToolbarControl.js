"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const DataSourceRedux = require("../../Redux/ActionsReducers/DataSourceRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const ScreenPopups = require("../../Core/Constants/ScreenPopups");
const react_bootstrap_1 = require("react-bootstrap");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
class DataSourceToolbarControlComponent extends React.Component {
    render() {
        const selectDataSourceString = "Select Data Source";
        let cssClassName = this.props.cssClassName + "__DataSource";
        let currentDataSource = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentDataSource) ?
            selectDataSourceString : this.props.CurrentDataSource;
        let availableSearches = this.props.DataSources.filter(s => s != this.props.CurrentDataSource).map((dataSource, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: index, onClick: () => this.onSelectedDataSourceChanged(dataSource) }, dataSource);
        });
        let content = React.createElement("span", null,
            React.createElement(react_bootstrap_1.InputGroup, null,
                React.createElement(react_bootstrap_1.DropdownButton, { disabled: availableSearches.length == 0, style: { minWidth: "140px" }, className: cssClassName, bsSize: "small", bsStyle: "default", title: currentDataSource, id: "DataSource", componentClass: react_bootstrap_1.InputGroup.Button }, availableSearches),
                React.createElement(react_bootstrap_1.InputGroup.Button, null,
                    React.createElement(ButtonClear_1.ButtonClear, { bsStyle: "default", cssClassName: cssClassName, onClick: () => this.onSelectedDataSourceChanged(""), size: "small", overrideTooltip: "Clear Search", overrideDisableButton: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentDataSource), DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }))));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyIds.DataSourceStrategyName, glyphicon: StrategyIds.DataSourceGlyph, onClose: () => this.props.onClose(StrategyIds.DataSourceStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onSelectedDataSourceChanged(searchName) {
        this.props.onSelectDataSource(searchName);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CurrentDataSource: state.DataSource.CurrentDataSource,
        DataSources: state.DataSource.DataSources,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectDataSource: (DataSourceName) => dispatch(DataSourceRedux.DataSourceSelect(DataSourceName)),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyIds.DataSourceStrategyId, ScreenPopups.DataSourcePopup))
    };
}
exports.DataSourceToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DataSourceToolbarControlComponent);
