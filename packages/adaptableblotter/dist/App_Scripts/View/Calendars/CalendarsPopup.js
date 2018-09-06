"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const CalendarsRedux = require("../../Redux/ActionsReducers/CalendarRedux");
const react_bootstrap_1 = require("react-bootstrap");
const react_bootstrap_2 = require("react-bootstrap");
const CalendarsEntryRow_1 = require("./CalendarsEntryRow");
const CalendarEntryItem_1 = require("./CalendarEntryItem");
const PanelWithRow_1 = require("../Components/Panels/PanelWithRow");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const StrategyIds = require("../../Core/Constants/StrategyIds");
class CalendarsPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { DisplayedCalendar: null, DisplayedYear: 2017 };
    }
    render() {
        let cssClassName = this.props.cssClassName + "__calendars";
        let infoBody = ["Choose which region Holiday Calendars you wish to use.", React.createElement("br", null), React.createElement("br", null),
            "These are used primarily when calculating Working Days."];
        let allCalenderColItems = [
            { Content: "Current", Size: 3 },
            { Content: "Calendar", Size: 5 },
            { Content: "Details", Size: 4 },
        ];
        let allCalendars = this.props.AvailableCalendars.map((calendar) => {
            return React.createElement(CalendarsEntryRow_1.CalendarsEntryRow, { cssClassName: cssClassName, Calendar: calendar, key: calendar.Name, onSelect: (calendar) => this.props.onSelectCalendar(calendar), onShowInformation: (calendar) => this.onShowInformation(calendar), CurrentCalendar: this.props.CurrentCalendar });
        });
        let calenderEntryColItems = [
            { Content: "Holiday Name", Size: 6 },
            { Content: "Date", Size: 6 },
        ];
        let displayedCalendarModalBody = this.state.DisplayedCalendar == null ? null :
            this.state.DisplayedCalendar.CalendarEntries.map((calendarEntry) => {
                return React.createElement(CalendarEntryItem_1.CalendarEntryItem, { cssClassName: cssClassName, CalendarEntry: calendarEntry, key: calendarEntry.HolidayName + calendarEntry.HolidayDate });
            });
        return React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyIds.CalendarStrategyName, bsStyle: "primary", glyphicon: StrategyIds.CalendarGlyph, infoBody: infoBody },
            React.createElement(PanelWithRow_1.PanelWithRow, { cssClassName: cssClassName, colItems: allCalenderColItems, bsStyle: "info", className: "ab_preview_panel" }),
            React.createElement(react_bootstrap_1.ListGroup, null, allCalendars),
            this.state.DisplayedCalendar &&
                React.createElement(react_bootstrap_2.Modal, { show: this.state.DisplayedCalendar != null, onHide: () => this.closeInformationModal(), className: cssClassName },
                    React.createElement(react_bootstrap_2.Modal.Header, { closeButton: true },
                        React.createElement(react_bootstrap_2.Modal.Title, null,
                            "Calendar Details: ",
                            this.state.DisplayedCalendar.Name)),
                    React.createElement(react_bootstrap_2.Modal.Body, null,
                        React.createElement(PanelWithRow_1.PanelWithRow, { cssClassName: cssClassName, colItems: calenderEntryColItems, bsStyle: "info" }),
                        displayedCalendarModalBody),
                    React.createElement(react_bootstrap_2.Modal.Footer, null,
                        React.createElement(react_bootstrap_2.Button, { className: "ab_right_modal_button", onClick: () => this.closeInformationModal() }, "Close"))));
    }
    closeInformationModal() {
        this.setState({ DisplayedCalendar: null });
    }
    onShowInformation(calendar) {
        this.setState({ DisplayedCalendar: calendar });
    }
    onClickCalendarYear(calendarYear) {
        if (this.state.DisplayedYear == calendarYear) {
            this.setState({ DisplayedYear: 0 });
        }
        else {
            this.setState({ DisplayedYear: calendarYear });
        }
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CurrentCalendar: state.Calendar.CurrentCalendar,
        AvailableCalendars: state.Calendar.AvailableCalendars
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectCalendar: (calendar) => dispatch(CalendarsRedux.CalendarSelect(calendar.Name)),
    };
}
exports.CalendarsPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CalendarsPopupComponent);
