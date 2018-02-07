import { ICalendar, ICalendarEntry } from '../../Strategy/Interface/ICalendarStrategy';
import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CalendarsRedux from '../../Redux/ActionsReducers/CalendarRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColItem } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup } from 'react-bootstrap';
import { Button, Row, Modal, Collapse, Glyphicon } from 'react-bootstrap';
import { CalendarsEntryRow } from './CalendarsEntryRow'
import { CalendarEntryItem } from './CalendarEntryItem'
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { Helper } from '../../Core/Helpers/Helper';
import { SortOrder } from '../../Core/Enums';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'

interface CalendarsPopupProps extends IStrategyViewPopupProps<CalendarsPopupComponent> {
    CurrentCalendar: string
    AvailableCalendars: ICalendar[]
    onSelectCalendar: (selectedCalendar: ICalendar) => CalendarsRedux.CalendarSelectAction,
}

interface CalendarsPopupInternalState {
    DisplayedCalendar: ICalendar
    DisplayedYear: Number
}

class CalendarsPopupComponent extends React.Component<CalendarsPopupProps, CalendarsPopupInternalState> {

    constructor() {
        super();
        this.state = { DisplayedCalendar: null, DisplayedYear: 2017 }
    }

    render() {
        let infoBody: any[] = ["Choose which region Holiday Calendars you wish to use.", <br />, <br />,
            "These are used primarily when calculating Working Days."]

        let allCalenderColItems: IColItem[] = [
            { Content: "Current", Size: 3 },
            { Content: "Calendar", Size: 5 },
            { Content: "Details", Size: 4 },
        ]

        let allCalendars = this.props.AvailableCalendars.map((calendar: ICalendar) => {
            return <CalendarsEntryRow
                Calendar={calendar}
                key={calendar.CalendarName}
                onSelect={(calendar) => this.props.onSelectCalendar(calendar)}
                onShowInformation={(calendar) => this.onShowInformation(calendar)}
                CurrentCalendar={this.props.CurrentCalendar}>
            </CalendarsEntryRow>
        });

        let calenderEntryColItems: IColItem[] = [
            { Content: "Holiday Name", Size: 6 },
            { Content: "Date", Size: 6 },
        ]

        let displayedCalendarModalBody = this.state.DisplayedCalendar == null ? null :
            this.state.DisplayedCalendar.CalendarEntries.map((calendarEntry: ICalendarEntry) => {
                return <CalendarEntryItem
                    CalendarEntry={calendarEntry}
                    key={calendarEntry.HolidayName + calendarEntry.HolidayDate}>
                </CalendarEntryItem>
            });




        return <PanelWithImage header={StrategyNames.CalendarStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.CalendarGlyph} infoBody={infoBody}>

            <PanelWithRow ColItems={allCalenderColItems} bsStyle="info" />
            <ListGroup style={divStyle}>
                {allCalendars}
            </ListGroup>

            {this.state.DisplayedCalendar &&

                <Modal show={this.state.DisplayedCalendar != null} onHide={() => this.closeInformationModal()} className="adaptable_blotter_style">
                    <Modal.Header closeButton>
                        <Modal.Title>Calendar Details: {this.state.DisplayedCalendar.CalendarName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                    <PanelWithRow ColItems={calenderEntryColItems} bsStyle="info" />
                      {displayedCalendarModalBody}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={buttonFloatRightStyle} onClick={() => this.closeInformationModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            }
        </PanelWithImage>
    }

    closeInformationModal() {
        this.setState({ DisplayedCalendar: null });
    }

    private onShowInformation(calendar: ICalendar) {
        this.setState({ DisplayedCalendar: calendar });
    }

    private onClickCalendarYear(calendarYear: Number) {
        if (this.state.DisplayedYear == calendarYear) {
            this.setState({ DisplayedYear: 0 });
        } else {
            this.setState({ DisplayedYear: calendarYear });
        }
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentCalendar: state.Calendars.CurrentCalendar,
        AvailableCalendars: state.Calendars.AvailableCalendars
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectCalendar: (calendar: ICalendar) => dispatch(CalendarsRedux.CalendarSelect(calendar.CalendarName)),
    };
}

export let CalendarsPopup = connect(mapStateToProps, mapDispatchToProps)(CalendarsPopupComponent);



let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let buttonFloatRightStyle = {
    float: 'right'
};