/// <reference path="../../../typings/index.d.ts" />
import { ICalendar, ICalendarEntry } from '../../Core/Interface/ICalendarStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CalendarsRedux from '../../Redux/ActionsReducers/CalendarRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { ButtonToolbar, ControlLabel, Button, Form, Col, Panel, Row, Modal } from 'react-bootstrap';
import { CalendarsConfigItem } from './CalendarsConfigItem'
import { CalendarEntryItem } from './CalendarEntryItem'
import { PanelWithRow } from '../PanelWithRow';
import { PanelWithImage } from '../PanelWithImage';
import { Helper } from '../../Core/Helper';
import { SortOrder } from '../../Core/Enums';

interface CalendarsConfigProps extends IStrategyViewPopupProps<CalendarsConfigComponent> {
    CurrentCalendar: string
    onSelectCalendar: (selectedCalendar: ICalendar) => CalendarsRedux.CalendarSetDefaultCalendarAction,
}

interface CalendarsConfigInternalState {
    DisplayedCalendar: ICalendar
}

class CalendarsConfigComponent extends React.Component<CalendarsConfigProps, CalendarsConfigInternalState> {

    constructor() {
        super();
        this.state = { DisplayedCalendar: null }
    }

    render() {

        let allCalendars = this.props.AdaptableBlotter.CalendarService.AvailableCalendars.map((calendar: ICalendar) => {
            return <CalendarsConfigItem
                Calendar={calendar}
                key={calendar.CalendarName}
                onSelect={(calendar) => this.props.onSelectCalendar(calendar)}
                onShowInformation={(calendar) => this.onShowInformation(calendar)}
                CurrentCalendar={this.props.CurrentCalendar}>
            </CalendarsConfigItem>
        });

        let cellInfo: [string, number][] = [["Current", 3], ["Calendar", 5], ["Details", 4]];
        let calendarEntryCellInfo: [string, number][] = [["Holiday Name", 6], ["Date", 6]];
        let sortedCalendarEntries = (this.state.DisplayedCalendar != null) ?
            Helper.sortArrayWithProperty(SortOrder.Ascending, this.state.DisplayedCalendar.CalendarEntries, "HolidayDate")
            : null;

        let calendarEntryItems = (this.state.DisplayedCalendar != null) ? sortedCalendarEntries.map((calendarEntry: ICalendarEntry) => {
            return <CalendarEntryItem
                CalendarEntry={calendarEntry}
                key={calendarEntry.HolidayName + calendarEntry.HolidayDate}>
            </CalendarEntryItem>
        }) : null;

        return <PanelWithImage header={"Calendars"} bsStyle="primary" glyphicon="calendar">
            <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            <ListGroup style={divStyle}>
                {allCalendars}
            </ListGroup>

            {this.state.DisplayedCalendar ?

                <Modal show={this.state.DisplayedCalendar != null} onHide={() => this.closeInformationModal()} className="adaptable_blotter_style">
                    <Modal.Header closeButton>
                        <Modal.Title>Calendar Details: {this.state.DisplayedCalendar.CalendarName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <PanelWithRow CellInfo={calendarEntryCellInfo} bsStyle="info" />
                        <ListGroup style={divStyle}>
                            {calendarEntryItems}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={buttonFloatRightStyle} onClick={() => this.closeInformationModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
                : null}
        </PanelWithImage>
    }

    closeInformationModal() {
        this.setState({ DisplayedCalendar: null });
    }

    private onShowInformation(calendar: ICalendar) {
        this.setState({ DisplayedCalendar: calendar });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentCalendar: state.Calendars.CurrentCalendar
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectCalendar: (calendar: ICalendar) => dispatch(CalendarsRedux.CalendarSetDefaultCalendar(calendar.CalendarName)),
    };
}

export let CalendarsConfig = connect(mapStateToProps, mapDispatchToProps)(CalendarsConfigComponent);



let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let buttonFloatRightStyle = {
    float: 'right'
};