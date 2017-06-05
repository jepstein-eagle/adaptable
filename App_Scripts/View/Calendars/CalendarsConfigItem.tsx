import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, ControlLabel, Button, Form, Col, Panel, Row, Checkbox, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { ShortcutAction } from '../../Core/Enums'
import { ICalendar } from '../../Core/Interface/ICalendarStrategy';

export interface CalendarsConfigItemProps extends React.ClassAttributes<CalendarsConfigItem> {
    Calendar: ICalendar;
    CurrentCalendar: string;
    onSelect: (calendar: ICalendar) => void;
    onShowInformation: (calendar: ICalendar) => void;
}

export class CalendarsConfigItem extends React.Component<CalendarsConfigItemProps, {}> {

    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col md={3} >
                    <Checkbox onChange={() => this.props.onSelect(this.props.Calendar)}
                        checked={this.props.Calendar.CalendarName == this.props.CurrentCalendar}></Checkbox>
                </Col>
                <Col md={5} >
                    {this.props.Calendar.CalendarName}
                </Col>

                <Col md={4} >
                    <ButtonToolbar>
                        <OverlayTrigger overlay={<Tooltip id="tooltipShowInformation">Show Calendar Dates</Tooltip>}>
                            <Button onClick={() => this.props.onShowInformation(this.props.Calendar)} > {"Calendar Details "}<Glyphicon glyph="info-sign" /></Button>
                        </OverlayTrigger>
                    </ButtonToolbar>
                </Col>
            </Row>
        </li>
    }
}

