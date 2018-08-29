"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableViewFactory_1 = require("../../AdaptableViewFactory");
const UIHelper_1 = require("../../UIHelper");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
class AdaptableBlotterChart extends React.Component {
    render() {
        let cssClassName = StyleConstants.AB_STYLE;
        let modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);
        let bodyElement = AdaptableViewFactory_1.AdaptableViewFactory["ChartDisplayPopup"];
        let commonProps = {
            getColumnValueDisplayValuePairDistinctList: (columnId, distinctCriteria) => this.props.AdaptableBlotter ? this.props.AdaptableBlotter.getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria) : null,
            Columns: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns,
            ModalContainer: modalContainer,
            cssClassName: cssClassName + StyleConstants.MODAL_BODY,
            BlotterOptions: this.props.AdaptableBlotter.BlotterOptions,
            BlotterApi: this.props.AdaptableBlotter.api,
            ChartService: this.props.AdaptableBlotter.ChartService
        };
        var body = React.createElement(bodyElement, commonProps);
        return (React.createElement(react_bootstrap_1.Modal, { show: this.props.showChart, onHide: this.props.onClose, className: cssClassName + StyleConstants.BASE, container: modalContainer },
            React.createElement("div", { className: cssClassName + StyleConstants.MODAL_BASE },
                React.createElement(react_bootstrap_1.Modal.Body, { className: cssClassName + StyleConstants.MODAL_BODY },
                    React.createElement("div", { className: "ab_main_chart" }, body)),
                React.createElement(react_bootstrap_1.Modal.Footer, { className: cssClassName + StyleConstants.MODAL_FOOTER },
                    React.createElement(react_bootstrap_1.Button, { className: cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON, onClick: () => this.props.onClose() }, "Close")))));
    }
}
exports.AdaptableBlotterChart = AdaptableBlotterChart;
