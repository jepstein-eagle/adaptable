import * as React from 'react';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from '../UIInterfaces';
import { ICalendarEntry } from '../../PredefinedConfig/IUserState Interfaces/CalendarState';

export interface CalendarEntryItemProps extends React.ClassAttributes<CalendarEntryItem> {
  CalendarEntry: ICalendarEntry;
  cssClassName: string;
}

export class CalendarEntryItem extends React.Component<CalendarEntryItemProps, {}> {
  render(): any {
    let colItems: IColItem[] = [];
    colItems.push({ Size: 6, Content: this.props.CalendarEntry.HolidayName });
    colItems.push({
      Size: 6,
      Content: new Date(this.props.CalendarEntry.HolidayDate).toDateString(),
    });
    return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />;
  }
}
