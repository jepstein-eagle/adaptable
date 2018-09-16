"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const react_bootstrap_1 = require("react-bootstrap");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const DualListBoxEditor_1 = require("../Components/ListBox/DualListBoxEditor");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
class DashboardPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { CurrentDashboardPopup: "", EditedZoomFactor: props.Zoom };
    }
    render() {
        let cssClassName = this.props.cssClassName + "__dashboard";
        let availableToolbarNames = this.props.AvailableToolbars.map(at => {
            return StrategyIds.getNameForStrategyId(at);
        });
        let visibleToolbarNames = this.props.VisibleToolbars.map(vt => {
            return StrategyIds.getNameForStrategyId(vt);
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: "Dashboard Toolbars", bsStyle: "primary", glyphicon: StrategyIds.FunctionsGlyph, className: "ab_main_popup" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                    React.createElement(react_bootstrap_1.ControlLabel, null, "Dashboard Zoom Factor : "),
                    ' ',
                    React.createElement(react_bootstrap_1.FormControl, { value: this.state.EditedZoomFactor.toString(), type: "number", min: "0.5", step: "0.05", max: "1", placeholder: "Enter a Number", onChange: (e) => this.onSetFactorChange(e) })),
                ' ',
                React.createElement("div", null,
                    React.createElement("br", null)),
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableToolbarNames, cssClassName: cssClassName, SelectedValues: visibleToolbarNames, HeaderAvailable: "Available Toolbars", HeaderSelected: "Visible Toolbars", onChange: (SelectedValues) => this.ListChange(SelectedValues), ReducedDisplay: true })));
    }
    ListChange(selectedValues) {
        let selectedColumnIds = selectedValues.map(sv => {
            return StrategyIds.getIdForStrategyName(sv);
        });
        this.props.onDashboardSetToolbars(selectedColumnIds);
    }
    onSetFactorChange(event) {
        const e = event.target;
        let factor = Number(e.value);
        if (factor > 1) {
            factor = 1;
        }
        if (factor < 0.5 && factor != 0) {
            factor = 0.5;
        }
        this.setState({ EditedZoomFactor: factor });
        if (factor != 0) {
            this.props.onSetDashboardZoom(factor);
        }
    }
}
function mapStateToProps(state, ownProps) {
    return {
        AvailableToolbars: state.Dashboard.AvailableToolbars,
        VisibleToolbars: state.Dashboard.VisibleToolbars,
        Zoom: state.Dashboard.Zoom,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onDashboardSetToolbars: (strategyIds) => dispatch(DashboardRedux.DashboardSetToolbars(strategyIds)),
        onSetDashboardZoom: (zoom) => dispatch(DashboardRedux.DashboardSetZoom(zoom)),
        onMoveControl: (controlName, NewIndex) => dispatch(DashboardRedux.DashboardMoveItem(controlName, NewIndex)),
    };
}
exports.DashboardPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DashboardPopupComponent);
