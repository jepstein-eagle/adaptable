"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
class CalendarEntryItem extends React.Component {
    render() {
        let colItems = [];
        colItems.push({ Size: 6, Content: this.props.CalendarEntry.HolidayName });
        colItems.push({ Size: 6, Content: new Date(this.props.CalendarEntry.HolidayDate).toDateString() });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.CalendarEntryItem = CalendarEntryItem;
