import * as React from "react";
import { ICalendarEntry } from "../../Utilities/Interface/BlotterObjects/ICalendar";
export interface CalendarEntryItemProps extends React.ClassAttributes<CalendarEntryItem> {
    CalendarEntry: ICalendarEntry;
    cssClassName: string;
}
export declare class CalendarEntryItem extends React.Component<CalendarEntryItemProps, {}> {
    render(): any;
}
