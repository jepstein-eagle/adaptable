"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const factory_1 = require("adaptableblotter/factory");
class AdaptableBlotter extends React.Component {
    componentWillMount() {
        this.setState({
            AdaptableBlotter: factory_1.BlotterFactory.CreateAdaptableBlotter(this.props.AdaptableBlotterOptions, this.props.VendorGridName)
        });
    }
    render() {
        return (React.createElement("div", { id: "adaptableBlotter" },
            React.createElement(factory_1.AdaptableBlotterApp, { AdaptableBlotter: this.state.AdaptableBlotter })));
    }
}
exports.default = AdaptableBlotter;
//# sourceMappingURL=AdaptableBlotter.js.map