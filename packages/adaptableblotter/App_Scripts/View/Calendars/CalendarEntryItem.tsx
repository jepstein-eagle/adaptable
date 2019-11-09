import * as React from 'react';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from '../UIInterfaces';
import { CalendarEntry } from '../../PredefinedConfig/CalendarState';

export interface CalendarEntryItemProps extends React.ClassAttributes<CalendarEntryItem> {
  CalendarEntry: CalendarEntry;
}

export class CalendarEntryItem extends React.Component<CalendarEntryItemProps, {}> {
  render(): any {
    let colItems: IColItem[] = [];
    colItems.push({ Size: 6, Content: this.props.CalendarEntry.HolidayName });
    colItems.push({
      Size: 6,
      Content: new Date(this.props.CalendarEntry.HolidayDate).toDateString(),
    });
    return <AdaptableObjectRow colItems={colItems} />;
  }
}
