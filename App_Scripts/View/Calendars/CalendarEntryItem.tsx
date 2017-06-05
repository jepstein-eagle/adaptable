import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {  Col, Row, Panel } from 'react-bootstrap';
import {  ICalendarEntry } from '../../Core/Interface/ICalendarStrategy';

export interface CalendarEntryItemProps extends React.ClassAttributes<CalendarEntryItem> {
    CalendarEntry: ICalendarEntry;
}

export class CalendarEntryItem extends React.Component<CalendarEntryItemProps, {}> {

    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col md={6} >{this.props.CalendarEntry.HolidayName}</Col>
                <Col md={6} >{new Date(this.props.CalendarEntry.HolidayDate).toDateString()}</Col>
            </Row>
        </li>
    }
}
