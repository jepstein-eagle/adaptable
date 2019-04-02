"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const ScheduleRedux = require("../../Redux/ActionsReducers/ScheduleRedux");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const Enums_1 = require("../../Utilities/Enums");
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
        let clearButton1 = React.createElement(ButtonClear_1.ButtonClear, { cssClassName: cssClassName, onClick: () => this.onClear1(), bsStyle: "default", overrideText: "Alert schedule", overrideTooltip: "Create Test schedule", DisplayMode: "Text", size: "small", AccessLevel: Enums_1.AccessLevel.Full });
        let clearButton2 = React.createElement(ButtonClear_1.ButtonClear, { cssClassName: cssClassName, onClick: () => this.onClear2(), bsStyle: "default", overrideText: "REport schedule", overrideTooltip: "Create Test schedule", DisplayMode: "Text", size: "small", AccessLevel: Enums_1.AccessLevel.Full });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyConstants.ScheduleStrategyName, bsStyle: "primary", glyphicon: StrategyConstants.ScheduleGlyph, infoBody: infoBody },
                React.createElement("span", null, "Schedules here..."),
                clearButton1,
                clearButton2));
    }
    onClear1() {
        let schedule = this.CreateTestSchedule1();
        this.props.onAddSchedule(schedule);
    }
    onClear2() {
        let schedule = this.CreateTestSchedule2();
        this.props.onAddSchedule(schedule);
    }
    CreateTestSchedule1() {
        let scheduleRule = {
            DayOfWeek: 2,
            Hour: 22,
            Minute: 12
        };
        let scheduleTime = {
            RecurringDate: scheduleRule
        };
        let alertScheduleItem = {
            Alert: {
                Header: "Test Schedule",
                Msg: "This alert has worked",
                MessageType: Enums_1.MessageType.Success,
                ShowAsPopup: true
            }
        };
        let alertSchedule = {
            ScheduleItem: alertScheduleItem,
            ScheduleTime: scheduleTime,
            ScheduleType: Enums_1.ScheduleType.Alert
        };
        //console.log(alertSchedule);
        return alertSchedule;
    }
    CreateTestSchedule2() {
        let scheduleRule = {
            DayOfWeek: 2,
            Hour: 21,
            Minute: 45
        };
        let scheduleTime = {
            RecurringDate: scheduleRule
        };
        let reportSchedule = {
            ScheduleItem: {
                Name: "All Data",
                ExportDestination: Enums_1.ExportDestination.CSV
            },
            ScheduleTime: scheduleTime,
            ScheduleType: Enums_1.ScheduleType.Report
        };
        //console.log(alertSchedule);
        return reportSchedule;
    }
}
function mapStateToProps() {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        onAddSchedule: (schedule) => dispatch(ScheduleRedux.ScheduleAdd(schedule)),
    };
}
exports.SchedulePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SchedulePopupComponent);
