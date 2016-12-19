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
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Modal, MenuItem, FormControl, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { CalendarsConfigItem, CalendarConfigHeader } from './CalendarsConfigItem'
import { CalendarEntryItem, CalendarEntryHeader } from './CalendarEntryItem'


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

        let sortedCalendarEntries = (this._displayedCalendar != null) ? this._displayedCalendar.CalendarEntries.sort(compareCalendarEntries) : null;

        let calendarEntryItems = (this._displayedCalendar != null) ? sortedCalendarEntries.map((calendarEntry: ICalendarEntry) => {
            return <CalendarEntryItem
                CalendarEntry={calendarEntry}
                key={calendarEntry.HolidayName + calendarEntry.HolidayDate}>
            </CalendarEntryItem>
        }) : null;

        let header = <Form horizontal>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={9}>Calendars</Col>
                <Col xs={3}></Col>
            </Row>
        </Form>;

        return <Panel header={header} bsStyle="primary" style={panelStyle}>
            <CalendarConfigHeader />
            <ListGroup style={divStyle}>
                {allCalendars}
            </ListGroup>

            {this.state.isShowingInformation ?

                <Modal show={this.state.isShowingInformation} onHide={() => this.closeInformationModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Calendar Details: {this._displayedCalendar.CalendarName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <CalendarEntryHeader />
                        <ListGroup style={divStyle}>
                            {calendarEntryItems}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={buttonLeftStyle} onClick={() => this.closeInformationModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
                : null}
        </Panel>
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

var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height': '300px'
};

let panelStyle = {
    width: '800px'
}

let rowStyle = {
    height: '50px',
    margin: '2px'
}

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let buttonLeftStyle = {
    float: 'right'
};