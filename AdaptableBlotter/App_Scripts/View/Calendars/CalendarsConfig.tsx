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


interface CalendarsConfigProps extends IStrategyViewPopupProps<CalendarsConfigComponent> {
    onSelectCalendar: (selectedCalendar: ICalendar) => CalendarsRedux.CalendarSetDefaultCalendarAction,
}

interface CalendarsConfigInternalState {
    isShowingInformation: boolean
}

class CalendarsConfigComponent extends React.Component<CalendarsConfigProps, CalendarsConfigInternalState> {

    constructor() {
        super();
        this.state = { isShowingInformation: false }
        this._displayedCalendar = null;
    }

    render() {

        let allCalendars = this.props.AdaptableBlotter.CalendarService.AvailableCalendars.map((calendar: ICalendar) => {
            return <CalendarsConfigItem
                Calendar={calendar}
                key={calendar.CalendarName}
                AdaptableBlotter={this.props.AdaptableBlotter}
                onSelect={(calendar) => this.props.onSelectCalendar(calendar)}
                onShowInformation={(calendar) => this.onShowInformation(calendar)}>
            </CalendarsConfigItem>
        });

        let cellInfo: [string, number][] = [["Current", 3], ["Calendar", 5], ["Details", 4]];
        let calendarEntryCellInfo: [string, number][] = [["Holiday Name", 6], ["Date", 6]];
        let sortedCalendarEntries = (this._displayedCalendar != null) ? this._displayedCalendar.CalendarEntries.sort(compareCalendarEntries) : null;

        let calendarEntryItems = (this._displayedCalendar != null) ? sortedCalendarEntries.map((calendarEntry: ICalendarEntry) => {
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

            {this.state.isShowingInformation ?

                <Modal show={this.state.isShowingInformation} onHide={() => this.closeInformationModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Calendar Details: {this._displayedCalendar.CalendarName}</Modal.Title>
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

    private _displayedCalendar: ICalendar;

    closeInformationModal() {
        this.setState({ isShowingInformation: false });
    }

    private onShowInformation(calendar: ICalendar) {
        this._displayedCalendar = calendar;
        this.setState({ isShowingInformation: true });
    }

}

function compareCalendarEntries(a: ICalendarEntry, b: ICalendarEntry) {
    if (a.HolidayDate < b.HolidayDate)
        return -1;
    if (a.HolidayDate > b.HolidayDate)
        return 1;
    return 0;
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
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