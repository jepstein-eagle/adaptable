"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
class AdaptableBlotterForm extends React.Component {
    render() {
        const _a = this.props, { children } = _a, attrs = __rest(_a, ["children"]);
        return React.createElement(react_bootstrap_1.Form, Object.assign({}, attrs, { onSubmit: (e) => this.CancelOnFormSubmit(e) }), this.props.children);
    }
    CancelOnFormSubmit(e) {
        e.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(null);
        }
    }
}
exports.AdaptableBlotterForm = AdaptableBlotterForm;
