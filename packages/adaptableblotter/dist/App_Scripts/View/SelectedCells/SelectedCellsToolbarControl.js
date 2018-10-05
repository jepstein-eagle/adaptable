"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const SelectedCellsRedux = require("../../Redux/ActionsReducers/SelectedCellsRedux");
const GridRedux = require("../../Redux/ActionsReducers/GridRedux");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const ScreenPopups = require("../../Core/Constants/ScreenPopups");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const Enums_1 = require("../../Core/Enums");
const react_bootstrap_1 = require("react-bootstrap");
const EnumExtensions_1 = require("../../Core/Extensions/EnumExtensions");
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
class SelectedCellsToolbarControlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SubFunc: (sender, event) => {
                this.onSelectionChanged();
            }
        };
    }
    componentDidMount() {
        if (this.props.Blotter) {
            this.props.Blotter.onSelectedCellsChanged().Subscribe(this.state.SubFunc);
        }
    }
    componentWillUnmount() {
        if (this.props.Blotter) {
            this.props.Blotter.onSelectedCellsChanged().Unsubscribe(this.state.SubFunc);
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__SelectedCells";
        let operationMenuItems = EnumExtensions_1.EnumExtensions.getNames(Enums_1.SelectedCellOperation).map((selectedCellOperation, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: "index", onClick: () => this.props.onSelectedCellsOperationChange(selectedCellOperation) }, selectedCellOperation);
        });
        let content = React.createElement("span", null,
            React.createElement("div", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(react_bootstrap_1.InputGroup, null,
                    React.createElement(react_bootstrap_1.DropdownButton, { style: { marginRight: "3px", width: "75px" }, title: this.props.SelectedCellOperation, id: "SelectedCells_Operation", bsSize: "small", componentClass: react_bootstrap_1.InputGroup.Button }, operationMenuItems),
                    this.props.SelectedCellSummary != null &&
                        React.createElement(react_bootstrap_1.ControlLabel, { style: { marginTop: "5px", marginLeft: "3px" } },
                            this.getOperationValue(),
                            " "))));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyIds.SelectedCellsStrategyName, glyphicon: StrategyIds.SelectedCellsGlyph, onClose: () => this.props.onClose(StrategyIds.SelectedCellsStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onSelectionChanged() {
        this.props.onSelectedCellsCreateSummary();
        //     this.setState({ SelectedCellSummmary: selectedCellSummary } as SelectedCellsToolbarControlComponentState);
    }
    getOperationValue() {
        switch (this.props.SelectedCellOperation) {
            case Enums_1.SelectedCellOperation.Sum:
                return this.props.SelectedCellSummary.Sum;
            case Enums_1.SelectedCellOperation.Average:
                return this.props.SelectedCellSummary.Average;
            case Enums_1.SelectedCellOperation.Median:
                return this.props.SelectedCellSummary.Median;
            case Enums_1.SelectedCellOperation.Max:
                return this.props.SelectedCellSummary.Max;
            case Enums_1.SelectedCellOperation.Min:
                return this.props.SelectedCellSummary.Min;
            case Enums_1.SelectedCellOperation.Distinct:
                return this.props.SelectedCellSummary.Distinct;
            case Enums_1.SelectedCellOperation.Count:
                return this.props.SelectedCellSummary.Count;
            case Enums_1.SelectedCellOperation.Only:
                return this.props.SelectedCellSummary.Only;
            case Enums_1.SelectedCellOperation.VWAP:
                return this.props.SelectedCellSummary.VWAP;
        }
    }
}
function mapStateToProps(state, ownProps) {
    return {
        SelectedCellInfo: state.Grid.SelectedCellInfo,
        SelectedCellOperation: state.SelectedCells.SelectedCellOperation,
        SelectedCellSummary: state.Grid.SelectedCellSummary,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectedCellsOperationChange: (SelectedCellOperation) => dispatch(SelectedCellsRedux.SelectedCellsChangeOperation(SelectedCellOperation)),
        onSelectedCellsCreateSummary: () => dispatch(GridRedux.GridCreateSelectedCellSummary()),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyIds.SelectedCellsStrategyId, ScreenPopups.SelectedCellsPopup))
    };
}
exports.SelectedCellsToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SelectedCellsToolbarControlComponent);
