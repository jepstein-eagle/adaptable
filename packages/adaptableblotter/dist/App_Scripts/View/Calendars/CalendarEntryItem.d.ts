import * as React from "react";
import { ICalendarEntry } from "../../api/Interface/IAdaptableBlotterObjects";
export interface CalendarEntryItemProps extends React.ClassAttributes<CalendarEntryItem> {
    CalendarEntry: ICalendarEntry;
    cssClassName: string;
}
export declare class CalendarEntryItem extends React.Component<CalendarEntryItemProps, {}> {
    render(): any;
}
