import * as React from 'react';

import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from '../UIInterfaces';
import { Calendar } from '../../PredefinedConfig/RunTimeState/CalendarState';
import SimpleButton from '../../components/SimpleButton';
import Radio from '../../components/Radio';

export interface CalendarsEntryRowProps extends React.ClassAttributes<CalendarsEntryRow> {
  Calendar: Calendar;
  CurrentCalendar: string;
  onSelect: (calendar: Calendar) => void;
  onShowInformation: (calendar: Calendar) => void;
}

export class CalendarsEntryRow extends React.Component<CalendarsEntryRowProps, {}> {
  render(): any {
    let colItems: IColItem[] = [];
    colItems.push({
      Size: 3,
      Content: (
        <Radio name="calendar" checked={this.props.Calendar.Name == this.props.CurrentCalendar} />
      ),
    });
    colItems.push({ Size: 5, Content: this.props.Calendar.Name });

    colItems.push({
      Size: 3,
      Content: (
        <SimpleButton
          onClick={(e: React.SyntheticEvent) => {
            e.stopPropagation();
            this.props.onShowInformation(this.props.Calendar);
          }}
          tooltip="Show Calendar Dates"
          iconPosition="end"
          icon="info"
          tone="accent"
          variant="raised"
        >
          {'Calendar Details '}
        </SimpleButton>
      ),
    });
    return (
      <AdaptableObjectRow
        colItems={colItems}
        style={{ width: '100%', cursor: 'pointer' }}
        onClick={() => this.props.onSelect(this.props.Calendar)}
      />
    );
  }
}
