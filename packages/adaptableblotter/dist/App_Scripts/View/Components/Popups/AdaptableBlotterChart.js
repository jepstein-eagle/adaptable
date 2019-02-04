"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableViewFactory_1 = require("../../AdaptableViewFactory");
const UIHelper_1 = require("../../UIHelper");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../../Utilities/Constants/ScreenPopups");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const StrategyHelper_1 = require("../../../Utilities/Helpers/StrategyHelper");
class AdaptableBlotterChart extends React.Component {
    render() {
        let cssClassName = StyleConstants.AB_STYLE;
        let chartContainer = UIHelper_1.UIHelper.getChartContainer(this.props.AdaptableBlotter.BlotterOptions, document, this.props.showModal);
        let accessLevel = StrategyHelper_1.StrategyHelper.getEntitlementAccessLevelForStrategy(this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements, StrategyConstants.ChartStrategyId);
        let commonProps = {
            Columns: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns,
            ModalContainer: chartContainer,
            cssClassName: cssClassName + StyleConstants.MODAL_BODY,
            onClose: this.props.onClose,
            ShowModal: this.props.showModal,
            Blotter: this.props.AdaptableBlotter,
            UserFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters,
            SystemFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().SystemFilter.SystemFilters,
            ColumnFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters,
            ColorPalette: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().UserInterface.ColorPalette,
            AccessLevel: accessLevel
        };
        // if we have a chart container property in Blotter Options then lets get that and put the chart there
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.AdaptableBlotter.BlotterOptions.containerOptions.chartContainer)) {
            // Want to be able to get show the chart in this DIV  - but no idea how
            // do we do this here?  or in adaptableBlotterView?
            //  console.log(chartContainer);
            //ReactDOM.render(body, chartContainer);
        }
        let bodyElement = AdaptableViewFactory_1.AdaptableViewFactory[ScreenPopups.ChartDisplayPopup];
        var body = React.createElement(bodyElement, commonProps);
        // only do this if its NOT default I guess...
        return (React.createElement("div", null, this.props.showModal ?
            React.createElement(react_bootstrap_1.Modal, { show: this.props.showChart, onHide: this.props.onClose, className: cssClassName + StyleConstants.BASE, container: chartContainer },
                React.createElement("div", { className: cssClassName + StyleConstants.MODAL_BASE },
                    React.createElement(react_bootstrap_1.Modal.Body, { className: cssClassName + StyleConstants.MODAL_BODY },
                        React.createElement("div", { className: "ab_main_chart" }, body)),
                    React.createElement(react_bootstrap_1.Modal.Footer, { className: cssClassName + StyleConstants.MODAL_FOOTER },
                        React.createElement(react_bootstrap_1.Button, { className: cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON, onClick: () => this.props.onClose() }, "Close"))))
            :
                React.createElement("div", { style: { marginLeft: '25px', marginBottom: '25px' } }, body)));
    }
}
exports.AdaptableBlotterChart = AdaptableBlotterChart;
