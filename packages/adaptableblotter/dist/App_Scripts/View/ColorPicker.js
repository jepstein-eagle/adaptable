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
class ColorPicker extends React.Component {
    render() {
        // let cssClassName: string= this.props.cssClassName + StyleConstants.COLOR_PICKER
        const _a = this.props, { ColorPalette } = _a, restProps = __rest(_a, ["ColorPalette"]);
        let ABcolorChoicesOptions = ColorPalette.map(x => React.createElement("option", { key: x }, x));
        let ABcolorChoices = React.createElement("datalist", { id: 'ABcolorChoices' }, ABcolorChoicesOptions);
        return React.createElement("div", { className: "ColorPicker" },
            React.createElement(react_bootstrap_1.FormControl, Object.assign({}, restProps, { type: "color", style: { width: '70px' }, list: 'ABcolorChoices' })),
            ABcolorChoices);
    }
}
exports.ColorPicker = ColorPicker;
