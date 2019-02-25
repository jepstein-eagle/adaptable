"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_dom_1 = require("react-dom");
class AdaptableBlotterToolPanelComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // we got agGrid api from props
        // console.log(this.props.api);
        console.log(this.props);
    }
    render() {
        return React.createElement("div", null, "Hello from the Container if it works");
    }
}
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {};
}
exports.ConnectedAdaptableBlotterToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterToolPanelComponent);
exports.AdaptableBlotterToolPanelBuilder = (ctx) => class AdaptableBlotterToolPanel {
    constructor() {
        this.ctx = ctx;
    }
    init(params) {
        this.gui = document.createElement('div');
        react_dom_1.render((React.createElement(react_redux_1.Provider, { store: this.ctx.Blotter.AdaptableBlotterStore.TheStore },
            React.createElement(exports.ConnectedAdaptableBlotterToolPanel, { Blotter: this.ctx.Blotter, TeamSharingActivated: false }))), this.gui);
        if (params && params.api) {
            params.api.addEventListener('modelUpdated', (newModel) => {
                console.log('Model updated', newModel);
            });
        }
    }
    getGui() {
        if (!this.gui) {
            this.init();
        }
        return this.gui;
    }
    refresh() {
        // no refresh logic needed
    }
};
