import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as CalendarsRedux from '../../Redux/ActionsReducers/CalendarRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { IColItem } from '../UIInterfaces';

import { CalendarsEntryRow } from './CalendarsEntryRow';
import { CalendarEntryItem } from './CalendarEntryItem';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { Calendar, CalendarEntry } from '../../PredefinedConfig/RunTimeState/CalendarState';
import ListGroup from '../../components/List/ListGroup';
import SimpleButton from '../../components/SimpleButton';
import { Flex } from 'rebass';
import Panel from '../../components/Panel';
import Dialog from '../../components/Dialog';

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
      { Content: 'Details', Size: 3 },
    ];

    let allCalendars = this.props.AvailableCalendars.map((calendar: Calendar) => {
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
        : this.state.DisplayedCalendar.CalendarEntries.map((calendarEntry: CalendarEntry) => {
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
            className={cssClassName}
          >
            <Panel
              bodyProps={{ padding: 0 }}
              border="none"
              borderRadius="none"
              header={<div>Calendar Details: {this.state.DisplayedCalendar.Name}</div>}
            >
              <Flex flexDirection="column" flex={1} style={{ overflow: 'auto', maxHeight: '60vh' }}>
                <PanelWithRow
                  style={{ flex: 1 }}
                  bodyProps={{ padding: 0 }}
                  border="none"
                  borderRadius="none"
                  cssClassName={cssClassName}
                  colItems={calenderEntryColItems}
                  bsStyle="info"
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

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    CurrentCalendar: state.Calendar.CurrentCalendar,
    AvailableCalendars: state.System.AvailableCalendars,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onSelectCalendar: (calendar: Calendar) =>
      dispatch(CalendarsRedux.CalendarSelect(calendar.Name)),
  };
}

export let CalendarsPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarsPopupComponent);
