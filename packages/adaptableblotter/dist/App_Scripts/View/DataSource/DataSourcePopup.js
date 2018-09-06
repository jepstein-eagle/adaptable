"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const DataSourceRedux = require("../../Redux/ActionsReducers/DataSourceRedux");
const react_bootstrap_1 = require("react-bootstrap");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
class DataSourcePopupComponent extends React.Component {
    render() {
        const selectDataSourceString = "Select Data Source";
        let cssClassName = this.props.cssClassName + "__dataSource";
        let infoBody = ["Select a datasource from the dropdown to be evaluated on the server."];
        let currentDataSource = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentDataSource) ?
            selectDataSourceString : this.props.CurrentDataSource;
        let availableSearches = this.props.DataSources.filter(s => s != this.props.CurrentDataSource).map((dataSource, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: index, onClick: () => this.onSelectedDataSourceChanged(dataSource) }, dataSource);
        });
        let content = React.createElement("div", null,
            React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                React.createElement(react_bootstrap_1.HelpBlock, null, "Choose a Data Source from the dropdown."),
                React.createElement(react_bootstrap_1.HelpBlock, null, "Data Sources run on your server and supply data to the Grid.")),
            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName" },
                    React.createElement(react_bootstrap_1.InputGroup, null,
                        React.createElement(react_bootstrap_1.DropdownButton, { disabled: availableSearches.length == 0, style: { minWidth: "500px" }, className: cssClassName, bsStyle: "default", title: currentDataSource, id: "DataSource", componentClass: react_bootstrap_1.InputGroup.Button }, availableSearches),
                        React.createElement(react_bootstrap_1.InputGroup.Button, null,
                            React.createElement(ButtonClear_1.ButtonClear, { bsStyle: "default", cssClassName: cssClassName, onClick: () => this.onSelectedDataSourceChanged(""), overrideTooltip: "Clear Data Source", overrideDisableButton: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentDataSource), ConfigEntity: null, DisplayMode: "Text+Glyph" }))))));
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyIds.DataSourceStrategyName, bsStyle: "primary", infoBody: infoBody, glyphicon: StrategyIds.DataSourceGlyph }, content));
    }
    onSelectedDataSourceChanged(dataSource) {
        this.props.onSelectDataSource(dataSource);
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
        onSelectDataSource: (dataSource) => dispatch(DataSourceRedux.DataSourceSelect(dataSource)),
    };
}
exports.DataSourcePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DataSourcePopupComponent);
