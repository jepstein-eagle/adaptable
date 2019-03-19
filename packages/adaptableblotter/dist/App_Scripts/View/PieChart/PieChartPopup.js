"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../Utilities/Enums");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
const PieChartComponent_1 = require("./PieChartComponent");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const ColumnSelector_1 = require("../Components/Selectors/ColumnSelector");
class PieChartPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectedColumnId: "",
            ShowVisibleRowsOnly: false
        };
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            this.setState({ SelectedColumnId: this.props.PopupParams });
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__PieChart";
        let infoBody = ["Run a simple text search across all visible cells in the Blotter.", React.createElement("br", null), React.createElement("br", null), "Use Quick Search Options to set search operator, behaviour and back colour (all automatically saved).", React.createElement("br", null), React.createElement("br", null), "For a more powerful, multi-column, saveable search with a wide range of options, use ", React.createElement("i", null, "Advanced Search"), "."];
        let pieChartData = (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)) ?
            this.props.Blotter.ChartService.BuildPieChartData(this.state.SelectedColumnId, this.state.ShowVisibleRowsOnly) // do something around visible...
            :
                [];
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyConstants.PieChartStrategyName, bsStyle: "primary", glyphicon: StrategyConstants.PieChartGlyph, infoBody: infoBody },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "pieChartSettings", style: { marginBottom: '0px' } },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                ' ',
                                " "),
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Selected Column")),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.SelectedColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onColumnSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single })),
                            React.createElement(react_bootstrap_1.Col, { xs: 2 },
                                ' ',
                                " ")),
                        ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(pieChartData) &&
                            React.createElement(react_bootstrap_1.Row, null,
                                React.createElement(PieChartComponent_1.PieChartComponent, { PieData: pieChartData, LabelMember: "ColumnValue", ValueMember: "ColumnCount", Width: 475, Height: 475, ShowVisibleRows: this.state.ShowVisibleRowsOnly, showAllClick: () => this.onShowAllClick(), showVisibleClick: () => this.onShowVisibleClick() }))))));
    }
    onColumnSelectedChanged(columns) {
        this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : null });
    }
    onShowVisibleClick() {
        this.setState({ ShowVisibleRowsOnly: true });
    }
    onShowAllClick() {
        this.setState({ ShowVisibleRowsOnly: false });
    }
}
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps() {
    return {};
}
exports.PieChartPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PieChartPopupComponent);
