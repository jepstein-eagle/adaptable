import * as React from "react";
import { ICalendarEntry } from '../../Strategy/Interface/ICalendarStrategy';
import { ConfigEntityRowItem } from '../Components/ConfigEntityRowItem';
import { IColItem } from "../Interfaces";

export interface CalendarEntryItemProps extends React.ClassAttributes<CalendarEntryItem> {
    CalendarEntry: ICalendarEntry;
}

export class CalendarEntryItem extends React.Component<CalendarEntryItemProps, {}> {

    render(): any {
       
       let colItems: IColItem[] = []
        colItems.push({ Size: 6, Content: this.props.CalendarEntry.HolidayName });
        colItems.push({ Size: 6, Content: new Date(this.props.CalendarEntry.HolidayDate).toDateString() });
        return <ConfigEntityRowItem ColItems={colItems} />
    }
}
