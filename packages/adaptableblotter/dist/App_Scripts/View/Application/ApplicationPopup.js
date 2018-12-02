"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
class ApplicationPopupComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__Application";
        return React.createElement("div", { className: cssClassName });
    }
}
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {};
}
exports.ApplicationPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ApplicationPopupComponent);
