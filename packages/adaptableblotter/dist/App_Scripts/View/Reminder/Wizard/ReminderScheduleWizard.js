"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Utilities/Enums");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
class ReminderScheduleWizard extends React.Component {
    constructor(props) {
        super(props);
        this.onOneOffDateChanged = (event) => {
            let e = event.target;
            this.setState({ OneOffDate: e.value }, () => this.props.UpdateGoBackState());
        };
        this.state = {
            IsRecurringDate: (this.props.Data.Schedule.OneOffDate == null) ? true : false,
            Hour: this.props.Data.Schedule.Hour,
            Minute: this.props.Data.Schedule.Minute,
            DaysOfWeek: this.props.Data.Schedule.DaysOfWeek,
            OneOffDate: this.props.Data.Schedule.OneOffDate ? this.props.Data.Schedule.OneOffDate : new Date(),
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-Schedule";
        let hours = [];
        let i;
        for (i = 0; i < 24; i++) {
            hours.push(React.createElement("option", { key: i, value: i }, i));
        }
        let minutes = [];
        let j;
        for (j = 0; j < 60; j++) {
            minutes.push(React.createElement("option", { key: j, value: j }, j));
        }
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Schedule Reminder", bsStyle: "primary" },
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "frmHour" },
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: 3 },
                            React.createElement(react_bootstrap_1.ControlLabel, null, "Hour")),
                        React.createElement(react_bootstrap_1.Col, { xs: 6 },
                            React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.Hour, onChange: (x) => this.onHourChanged(x) }, hours)))),
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "frmMinute" },
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: 3 },
                            React.createElement(react_bootstrap_1.ControlLabel, null, "Minute:")),
                        React.createElement(react_bootstrap_1.Col, { xs: 6 },
                            React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.Minute, onChange: (x) => this.onMinuteChanged(x) }, minutes)))),
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineDateType" },
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: 3 },
                            React.createElement(react_bootstrap_1.ControlLabel, null, "Date:")),
                        React.createElement(react_bootstrap_1.Col, { xs: 6 },
                            React.createElement(react_bootstrap_1.Radio, { inline: true, value: "recurring", checked: this.state.IsRecurringDate == true, onChange: (e) => this.onRecurringDateChanged(e) }, "Recurring Days"),
                            React.createElement(react_bootstrap_1.Radio, { inline: true, value: "oneoff", checked: this.state.IsRecurringDate == false, onChange: (e) => this.onRecurringDateChanged(e) }, "One Off Date")))),
                this.state.IsRecurringDate ?
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: 3 }),
                        React.createElement(react_bootstrap_1.Col, { xs: 6 },
                            React.createElement(react_bootstrap_1.Panel, null,
                                React.createElement(react_bootstrap_1.Checkbox, { className: cssClassName + "__checkbox", inline: true, value: Enums_1.DayOfWeek.Monday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Monday), onChange: (e) => this.onDayChecked(e) }, "Monday"),
                                React.createElement("br", null),
                                React.createElement(react_bootstrap_1.Checkbox, { className: cssClassName + "__checkbox", inline: true, value: Enums_1.DayOfWeek.Tuesday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Tuesday), onChange: (e) => this.onDayChecked(e) }, "Tuesday"),
                                React.createElement("br", null),
                                React.createElement(react_bootstrap_1.Checkbox, { className: cssClassName + "__checkbox", inline: true, value: Enums_1.DayOfWeek.Wednesday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Wednesday), onChange: (e) => this.onDayChecked(e) }, "Wednesday"),
                                React.createElement("br", null),
                                React.createElement(react_bootstrap_1.Checkbox, { className: cssClassName + "__checkbox", inline: true, value: Enums_1.DayOfWeek.Thursday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Thursday), onChange: (e) => this.onDayChecked(e) }, "Thursday"),
                                React.createElement("br", null),
                                React.createElement(react_bootstrap_1.Checkbox, { className: cssClassName + "__checkbox", inline: true, value: Enums_1.DayOfWeek.Friday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Friday), onChange: (e) => this.onDayChecked(e) }, "Friday"),
                                React.createElement("br", null),
                                React.createElement(react_bootstrap_1.Checkbox, { className: cssClassName + "__checkbox", inline: true, value: Enums_1.DayOfWeek.Saturday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Saturday), onChange: (e) => this.onDayChecked(e) }, "Saturday"),
                                React.createElement("br", null),
                                React.createElement(react_bootstrap_1.Checkbox, { className: cssClassName + "__checkbox", inline: true, value: Enums_1.DayOfWeek.Sunday, checked: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.DaysOfWeek, Enums_1.DayOfWeek.Sunday), onChange: (e) => this.onDayChecked(e) }, "Sunday"))))
                    :
                        React.createElement(react_bootstrap_1.FormGroup, { controlId: "frmOneOffDate" },
                            React.createElement(react_bootstrap_1.Row, null,
                                React.createElement(react_bootstrap_1.Col, { xs: 3 }),
                                React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                    React.createElement(react_bootstrap_1.FormControl, { type: "date", placeholder: "Date", onChange: (x) => this.onOneOffDateChanged(x), value: this.state.OneOffDate }))))));
    }
    onDayChecked(event) {
        let e = event.target;
        let dayOfWeek = Number(e.value);
        let daysOfWeek = this.state.DaysOfWeek;
        if (e.checked) {
            daysOfWeek.push(dayOfWeek);
        }
        else {
            let index = daysOfWeek.indexOf(dayOfWeek);
            daysOfWeek.splice(index, 1);
        }
        this.setState({ DaysOfWeek: daysOfWeek }, () => this.props.UpdateGoBackState());
    }
    onRecurringDateChanged(event) {
        let e = event.target;
        this.setState({ IsRecurringDate: (e.value == "recurring") }, () => this.props.UpdateGoBackState());
    }
    onHourChanged(event) {
        let e = event.target;
        this.setState({ Hour: Number(e.value) }, () => this.props.UpdateGoBackState());
    }
    onMinuteChanged(event) {
        let e = event.target;
        this.setState({ Minute: Number(e.value) }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        if (this.state.Hour == null || this.state.Minute == null) {
            return false;
        }
        if (this.state.IsRecurringDate && ArrayExtensions_1.ArrayExtensions.IsEmpty(this.state.DaysOfWeek)) {
            return false;
        }
        if (!this.state.IsRecurringDate && this.state.OneOffDate == null) {
            return false;
        }
        return true;
    }
    canBack() { return true; }
    Next() {
        let schedule = {
            Hour: this.state.Hour,
            Minute: this.state.Minute,
            OneOffDate: (this.state.IsRecurringDate) ? null : this.state.OneOffDate,
            DaysOfWeek: (this.state.IsRecurringDate) ? this.state.DaysOfWeek : []
        };
        this.props.Data.Schedule = schedule;
    }
    Back() {
        //todo
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ReminderScheduleWizard = ReminderScheduleWizard;
