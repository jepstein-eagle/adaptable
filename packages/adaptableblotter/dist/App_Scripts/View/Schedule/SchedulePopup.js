"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
class SchedulePopupComponent extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { EditedScheduleText: "", EditedStyle: null }
    }
    componentDidMount() {
        //    this.setState({ EditedScheduleText: this.props.ScheduleText, EditedStyle: this.props.ScheduleStyle });
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Schedule";
        let infoBody = ["Run schedules.", React.createElement("br", null), React.createElement("br", null), "Use it.",];
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyConstants.ScheduleStrategyName, bsStyle: "primary", glyphicon: StrategyConstants.ScheduleGlyph, infoBody: infoBody },
                React.createElement("span", null, "Schedules here...")));
    }
}
function mapStateToProps() {
    return {};
}
function mapDispatchToProps() {
    return {};
}
exports.SchedulePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SchedulePopupComponent);
