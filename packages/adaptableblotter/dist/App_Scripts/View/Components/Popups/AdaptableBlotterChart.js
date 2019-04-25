"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableViewFactory_1 = require("../../AdaptableViewFactory");
const UIHelper_1 = require("../../UIHelper");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../../Utilities/Constants/ScreenPopups");
const StrategyHelper_1 = require("../../../Utilities/Helpers/StrategyHelper");
class AdaptableBlotterChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartContainer: UIHelper_1.UIHelper.getChartContainer(this.props.AdaptableBlotter.blotterOptions, document, this.props.showModal),
            accessLevel: StrategyHelper_1.StrategyHelper.getEntitlementAccessLevelForStrategy(this.props.AdaptableBlotter.adaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements, StrategyConstants.ChartStrategyId),
            isValidUserChartContainer: UIHelper_1.UIHelper.isValidUserChartContainer(this.props.AdaptableBlotter.blotterOptions, document),
        };
    }
    render() {
        let cssClassName = StyleConstants.AB_STYLE;
        let commonProps = {
            Columns: this.props.AdaptableBlotter.api.gridApi.getColumns(),
            ModalContainer: this.state.chartContainer,
            cssClassName: cssClassName + StyleConstants.MODAL_BODY,
            onClose: this.props.onClose,
            ShowModal: this.props.showModal,
            Blotter: this.props.AdaptableBlotter,
            UserFilters: this.props.AdaptableBlotter.adaptableBlotterStore.TheStore.getState().UserFilter.UserFilters,
            SystemFilters: this.props.AdaptableBlotter.adaptableBlotterStore.TheStore.getState().SystemFilter.SystemFilters,
            ColumnFilters: this.props.AdaptableBlotter.api.columnFilterApi.GetAll(),
            ColorPalette: this.props.AdaptableBlotter.adaptableBlotterStore.TheStore.getState().UserInterface.ColorPalette,
            AccessLevel: this.state.accessLevel
        };
        let bodyElement = AdaptableViewFactory_1.AdaptableViewFactory[ScreenPopups.ChartDisplayPopup];
        var body = React.createElement(bodyElement, commonProps);
        return (React.createElement("span", null, this.props.showModal ?
            React.createElement(react_bootstrap_1.Modal, { show: this.props.showChart, onHide: this.props.onClose, className: cssClassName + StyleConstants.BASE, container: this.state.chartContainer },
                React.createElement("div", { className: cssClassName + StyleConstants.MODAL_BASE },
                    React.createElement(react_bootstrap_1.Modal.Body, { className: cssClassName + StyleConstants.MODAL_BODY },
                        React.createElement("div", { className: "ab_main_chart" }, body)),
                    React.createElement(react_bootstrap_1.Modal.Footer, { className: cssClassName + StyleConstants.MODAL_FOOTER },
                        React.createElement(react_bootstrap_1.Button, { className: cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON, onClick: () => this.props.onClose() }, "Close"))))
            :
                React.createElement("span", null, this.state.isValidUserChartContainer ?
                    ReactDOM.createPortal((React.createElement("div", { id: "ad", style: { marginLeft: '25px', marginBottom: '25px' } }, body)), this.state.chartContainer)
                    :
                        React.createElement("div", { style: { marginLeft: '25px', marginBottom: '25px' } }, body))));
    }
}
exports.AdaptableBlotterChart = AdaptableBlotterChart;
