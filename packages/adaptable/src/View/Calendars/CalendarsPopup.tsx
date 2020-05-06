import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as CalendarsRedux from '../../Redux/ActionsReducers/CalendarRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { IColItem } from '../UIInterfaces';

import { CalendarsEntryRow } from './CalendarsEntryRow';
import { CalendarEntryItem } from './CalendarEntryItem';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { Calendar, CalendarEntry } from '../../PredefinedConfig/CalendarState';
import ListGroup from '../../components/List/ListGroup';
import SimpleButton from '../../components/SimpleButton';
import { Flex } from 'rebass';
import Panel from '../../components/Panel';
import Dialog from '../../components/Dialog';
import { CalculatedColumnSummaryProps } from '../CalculatedColumn/CalculatedColumnSummary';

interface CalendarsPopupProps extends StrategyViewPopupProps<CalendarsPopupComponent> {
  CurrentCalendar: string;
  AvailableCalendars: Calendar[];
  onSelectCalendar: (selectedCalendar: Calendar) => CalendarsRedux.CalendarSelectAction;
}

interface CalendarsPopupInternalState {
  DisplayedCalendar: Calendar;
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
    let infoBody: any[] = [
      'Choose which region Holiday Calendars you wish to use.',
      <br />,
      <br />,
      'These are used primarily when calculating Working Days.',
    ];

    let allCalenderColItems: IColItem[] = [
      { Content: 'Current', Size: 3 },
      { Content: 'Calendar', Size: 5 },
      { Content: 'Details', Size: 3 },
    ];

    let allCalendars = this.props.AvailableCalendars.map((calendar: Calendar) => {
      return (
        <CalendarsEntryRow
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
        : this.state.DisplayedCalendar.CalendarEntries.map((calendarEntry: CalendarEntry) => {
            return (
              <CalendarEntryItem
                CalendarEntry={calendarEntry}
                key={calendarEntry.HolidayName + calendarEntry.HolidayDate}
              />
            );
          });

    return (
      <PanelWithImage
        header={StrategyConstants.CalendarStrategyFriendlyName}
        variant="primary"
        glyphicon={StrategyConstants.CalendarGlyph}
        infoBody={infoBody}
      >
        <PanelWithRow
          colItems={allCalenderColItems}
          borderRadius="none"
          border="none"
          className="ab_preview_panel"
        />
        <ListGroup>{allCalendars}</ListGroup>

        {this.state.DisplayedCalendar && (
          <Dialog
            modal
            isOpen={this.state.DisplayedCalendar != null}
            onDismiss={() => this.closeInformationModal()}
          >
            <Panel
              bodyProps={{ padding: 0 }}
              bodyScroll
              border="none"
              borderRadius="none"
              header={<div>Calendar Details: {this.state.DisplayedCalendar.Name}</div>}
            >
              <Flex
                flexDirection="column"
                flex={1}
                style={{ overflow: 'auto', maxHeight: '60vh', minWidth: '300px' }}
              >
                <PanelWithRow
                  style={{ flex: 1 }}
                  bodyProps={{ padding: 0 }}
                  bodyScroll
                  border="none"
                  borderRadius="none"
                  colItems={calenderEntryColItems}
                  variant="primary"
                />
                {displayedCalendarModalBody}
              </Flex>
              <Flex flexDirection="row" padding={2}>
                <div style={{ flex: 1 }} />
                <SimpleButton
                  className="ab_right_modal_button"
                  onClick={() => this.closeInformationModal()}
                >
                  Close
                </SimpleButton>
              </Flex>
            </Panel>
          </Dialog>
        )}
      </PanelWithImage>
    );
  }

  closeInformationModal() {
    this.setState({ DisplayedCalendar: null });
  }

  private onShowInformation(calendar: Calendar) {
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

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<CalendarsPopupProps> {
  return {
    CurrentCalendar: state.Calendar.CurrentCalendar,
    AvailableCalendars: state.System.AvailableCalendars,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<CalendarsPopupProps> {
  return {
    onSelectCalendar: (calendar: Calendar) =>
      dispatch(CalendarsRedux.CalendarSelect(calendar.Name)),
  };
}

export let CalendarsPopup = connect(mapStateToProps, mapDispatchToProps)(CalendarsPopupComponent);
