"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const AdaptableViewFactory_1 = require("../../AdaptableViewFactory");
const UIHelper_1 = require("../../UIHelper");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
const GeneralConstants = require("../../../Core/Constants/GeneralConstants");
const EntitlementHelper_1 = require("../../../Core/Helpers/EntitlementHelper");
class AdaptableBlotterPopup extends React.Component {
    render() {
        let cssClassName = StyleConstants.AB_STYLE;
        let modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.Blotter.BlotterOptions, document);
        let accessLevel = EntitlementHelper_1.EntitlementHelper.getEntitlementAccessLevelForStrategy(this.props.Blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements, this.props.ComponentStrategy);
        if (this.props.ComponentName) {
            let bodyElement = AdaptableViewFactory_1.AdaptableViewFactory[this.props.ComponentName];
            //Warning : FilterForm needs to be changed if we add properties since it uses the same interface
            let commonProps = {
                PopupParams: this.props.PopupParams,
                onClearPopupParams: () => this.props.onClearPopupParams(),
                TeamSharingActivated: this.props.Blotter.BlotterOptions.enableRemoteConfigServer,
                Columns: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns,
                UserFilters: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters,
                SystemFilters: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().SystemFilter.SystemFilters,
                ColumnFilters: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters,
                ModalContainer: modalContainer,
                ColorPalette: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().UserInterface.ColorPalette,
                GridSorts: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().Grid.GridSorts,
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
