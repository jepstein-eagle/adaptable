import * as React from "react";
import * as Redux from "redux";
/// <reference path="../../typings/index.d.ts" />

import { Provider, connect } from 'react-redux';
import {  Col, Row, Panel } from 'react-bootstrap';
import {  ICalendarEntry } from '../../Core/Interface/ICalendarStrategy';

interface CalendarEntryItemProps extends React.ClassAttributes<CalendarEntryItem> {
    CalendarEntry: ICalendarEntry;
}

export class CalendarEntryItem extends React.Component<CalendarEntryItemProps, {}> {

    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col md={6} >
                    {this.props.CalendarEntry.HolidayName}
                </Col>
                <Col md={6} >
                    {this.props.CalendarEntry.HolidayDate.toDateString()}
                </Col>
            </Row>
        </li>
    }
}

interface CalendarEntryHeaderProps extends React.ClassAttributes<CalendarEntryHeader> {
}

export class CalendarEntryHeader extends React.Component<CalendarEntryHeaderProps, {}> {
    render(): any {
        return <Panel style={panelHeaderStyle} >
            <Row >
                <Col md={6} style={headerStyle}>Holiday Name</Col>
                <Col md={6} style={headerStyle}>Date</Col>
            </Row>
        </Panel>
    }
}

var headerStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'bold'
};

let panelHeaderStyle: React.CSSProperties = {
    marginBottom: '0px'
}
