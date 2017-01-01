import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Modal, MenuItem, Checkbox, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { ShortcutAction } from '../../Core/Enums'
import { ICalendar } from '../../Core/Interface/ICalendarStrategy';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';

interface CalendarsConfigItemProps extends React.ClassAttributes<CalendarsConfigItem> {
    Calendar: ICalendar;
    AdaptableBlotter: IAdaptableBlotter;
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
                        checked={this.props.Calendar.CalendarName == this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Calendars.CurrentCalendar}></Checkbox>
                </Col>
                <Col md={5} >
                    {this.props.Calendar.CalendarName}
                </Col>

                <Col md={4} >
                    <ButtonToolbar>
                        <OverlayTrigger  overlay={ <Tooltip id="tooltipShowInformation">Show Calendar Dates</Tooltip>}>
                            <Button onClick={() => this.props.onShowInformation(this.props.Calendar) } > {"Calendar Details "}<Glyphicon glyph="info-sign"/></Button>
                        </OverlayTrigger>
                    </ButtonToolbar>
                </Col>
            </Row>
        </li>
    }
}


var headerStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'bold'
};

let panelHeaderStyle: React.CSSProperties = {
    marginBottom: '0px'
}
