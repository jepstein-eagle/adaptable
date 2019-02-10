"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
class AdaptableBlotterToolPanelComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
exports.AdaptableBlotterToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterToolPanelComponent);
exports.AdaptableBlotterToolPanelReact = (toolPanelContext) => React.createElement(react_redux_1.Provider, { store: toolPanelContext.Blotter.AdaptableBlotterStore.TheStore },
    React.createElement(exports.AdaptableBlotterToolPanel, { Blotter: toolPanelContext.Blotter, TeamSharingActivated: false }));
