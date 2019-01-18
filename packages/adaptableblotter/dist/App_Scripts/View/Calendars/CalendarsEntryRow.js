"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
class CalendarsEntryRow extends React.Component {
    render() {
        let colItems = [];
        colItems.push({
            Size: 3, Content: React.createElement(react_bootstrap_1.Checkbox, { onChange: () => this.props.onSelect(this.props.Calendar), checked: this.props.Calendar.Name == this.props.CurrentCalendar })
        });
        colItems.push({ Size: 5, Content: this.props.Calendar.Name });
        colItems.push({
            Size: 3, Content: React.createElement(react_bootstrap_1.ButtonToolbar, null,
                React.createElement(react_bootstrap_1.OverlayTrigger, { overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipShowInformation" }, "Show Calendar Dates") },
                    React.createElement(react_bootstrap_1.Button, { onClick: () => this.props.onShowInformation(this.props.Calendar) },
                        " ",
                        "Calendar Details ",
                        React.createElement(react_bootstrap_1.Glyphicon, { glyph: "info-sign" }))))
        });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.CalendarsEntryRow = CalendarsEntryRow;
