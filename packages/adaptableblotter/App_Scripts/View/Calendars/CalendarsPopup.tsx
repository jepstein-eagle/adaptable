import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as CalendarsRedux from '../../Redux/ActionsReducers/CalendarRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { IColItem } from '../UIInterfaces';
import { ListGroup, Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { CalendarsEntryRow } from './CalendarsEntryRow';
import { CalendarEntryItem } from './CalendarEntryItem';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import {
  ICalendar,
  ICalendarEntry,
} from '../../PredefinedConfig/IUserState Interfaces/CalendarState';

interface CalendarsPopupProps extends StrategyViewPopupProps<CalendarsPopupComponent> {
  CurrentCalendar: string;
  AvailableCalendars: ICalendar[];
  onSelectCalendar: (selectedCalendar: ICalendar) => CalendarsRedux.CalendarSelectAction;
}

interface CalendarsPopupInternalState {
  DisplayedCalendar: ICalendar;
  DisplayedYear: Number;
}

class CalendarsPopupComponent extends React.Component<
  CalendarsPopupProps,
  CalendarsPopupInternalState
> {
  constructor(props: CalendarsPopupProps) {
    super(props);
    this.state = { DisplayedCalendar: null, DisplayedYear: 2017 };
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__calendars';

    let infoBody: any[] = [
      'Choose which region Holiday Calendars you wish to use.',
      <br />,
      <br />,
      'These are used primarily when calculating Working Days.',
    ];

    let allCalenderColItems: IColItem[] = [
      { Content: 'Current', Size: 3 },
      { Content: 'Calendar', Size: 5 },
      { Content: 'Details', Size: 4 },
    ];

    let allCalendars = this.props.AvailableCalendars.map((calendar: ICalendar) => {
      return (
        <CalendarsEntryRow
          cssClassName={cssClassName}
          Calendar={calendar}
          key={calendar.Name}
          onSelect={calendar => this.props.onSelectCalendar(calendar)}
          onShowInformation={calendar => this.onShowInformation(calendar)}
          CurrentCalendar={this.props.CurrentCalendar}
        />
      );
    });

    let calenderEntryColItems: IColItem[] = [
      { Content: 'Holiday Name', Size: 6 },
      { Content: 'Date', Size: 6 },
    ];

    let displayedCalendarModalBody =
      this.state.DisplayedCalendar == null
        ? null
        : this.state.DisplayedCalendar.CalendarEntries.map((calendarEntry: ICalendarEntry) => {
            return (
              <CalendarEntryItem
                cssClassName={cssClassName}
                CalendarEntry={calendarEntry}
                key={calendarEntry.HolidayName + calendarEntry.HolidayDate}
              />
            );
          });

    return (
      <PanelWithImage
        cssClassName={cssClassName}
        header={StrategyConstants.CalendarStrategyName}
        bsStyle="primary"
        glyphicon={StrategyConstants.CalendarGlyph}
        infoBody={infoBody}
      >
        <PanelWithRow
          cssClassName={cssClassName}
          colItems={allCalenderColItems}
          bsStyle="info"
          className="ab_preview_panel"
        />
        <ListGroup>{allCalendars}</ListGroup>

        {this.state.DisplayedCalendar && (
          <Modal
            show={this.state.DisplayedCalendar != null}
            onHide={() => this.closeInformationModal()}
            className={cssClassName}
          >
            <Modal.Header closeButton>
              <Modal.Title>Calendar Details: {this.state.DisplayedCalendar.Name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PanelWithRow
                cssClassName={cssClassName}
                colItems={calenderEntryColItems}
                bsStyle="info"
              />
              {displayedCalendarModalBody}
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="ab_right_modal_button"
                onClick={() => this.closeInformationModal()}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </PanelWithImage>
    );
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
    CurrentCalendar: state.Calendar.CurrentCalendar,
    AvailableCalendars: state.System.AvailableCalendars,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onSelectCalendar: (calendar: ICalendar) =>
      dispatch(CalendarsRedux.CalendarSelect(calendar.Name)),
  };
}

export let CalendarsPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarsPopupComponent);
