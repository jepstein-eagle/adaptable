import * as React from "react";
import { ICalendarEntry } from "../../Core/Api/Interface/AdaptableBlotterObjects";
export interface CalendarEntryItemProps extends React.ClassAttributes<CalendarEntryItem> {
    CalendarEntry: ICalendarEntry;
    cssClassName: string;
}
export declare class CalendarEntryItem extends React.Component<CalendarEntryItemProps, {}> {
    render(): any;
}
