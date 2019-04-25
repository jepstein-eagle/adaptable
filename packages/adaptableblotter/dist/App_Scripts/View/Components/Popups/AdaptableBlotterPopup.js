"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Utilities/Enums");
const AdaptableViewFactory_1 = require("../../AdaptableViewFactory");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
const GeneralConstants = require("../../../Utilities/Constants/GeneralConstants");
const StrategyHelper_1 = require("../../../Utilities/Helpers/StrategyHelper");
const BlotterHelper_1 = require("../../../Utilities/Helpers/BlotterHelper");
const UIHelper_1 = require("../../UIHelper");
class AdaptableBlotterPopup extends React.Component {
    render() {
        let cssClassName = StyleConstants.AB_STYLE;
        let modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.Blotter.blotterOptions, document);
        let accessLevel = StrategyHelper_1.StrategyHelper.getEntitlementAccessLevelForStrategy(this.props.Blotter.adaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements, this.props.ComponentStrategy);
        if (this.props.ComponentName) {
            let bodyElement = AdaptableViewFactory_1.AdaptableViewFactory[this.props.ComponentName];
            //Warning : FilterForm needs to be changed if we add properties since it uses the same interface
            let commonProps = {
                PopupParams: this.props.PopupParams,
                onClearPopupParams: () => this.props.onClearPopupParams(),
                TeamSharingActivated: BlotterHelper_1.BlotterHelper.isConfigServerEnabled(this.props.Blotter.blotterOptions),
                Columns: this.props.Blotter.adaptableBlotterStore.TheStore.getState().Grid.Columns,
                UserFilters: this.props.Blotter.adaptableBlotterStore.TheStore.getState().UserFilter.UserFilters,
                SystemFilters: this.props.Blotter.adaptableBlotterStore.TheStore.getState().SystemFilter.SystemFilters,
                ColumnFilters: this.props.Blotter.adaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters,
                ModalContainer: modalContainer,
                ColorPalette: this.props.Blotter.adaptableBlotterStore.TheStore.getState().UserInterface.ColorPalette,
                GridSorts: this.props.Blotter.adaptableBlotterStore.TheStore.getState().Grid.GridSorts,
                cssClassName: cssClassName + StyleConstants.MODAL_BODY,
                AccessLevel: accessLevel,
                Blotter: this.props.Blotter
            };
            var body = React.createElement(bodyElement, commonProps);
        }
        return (React.createElement(react_bootstrap_1.Modal, { show: this.props.showModal, onHide: this.props.onHide, className: cssClassName + StyleConstants.BASE, container: modalContainer, enforceFocus: null },
            React.createElement("div", { className: cssClassName + StyleConstants.MODAL_BASE },
                React.createElement(react_bootstrap_1.Modal.Body, { className: cssClassName + StyleConstants.MODAL_BODY },
                    React.createElement("div", { className: "ab_main_popup" },
                        React.createElement("div", { className: accessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" }, body))),
                React.createElement(react_bootstrap_1.Modal.Footer, { className: cssClassName + StyleConstants.MODAL_FOOTER },
                    React.createElement(react_bootstrap_1.Button, { className: cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON, onClick: () => this.props.onHide() }, "Close")))));
    }
}
exports.AdaptableBlotterPopup = AdaptableBlotterPopup;
