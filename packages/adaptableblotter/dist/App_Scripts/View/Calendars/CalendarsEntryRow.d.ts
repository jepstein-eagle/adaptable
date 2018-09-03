import * as React from "react";
import { ICalendar } from "../../Core/Api/Interface/AdaptableBlotterObjects";
export interface CalendarsEntryRowProps extends React.ClassAttributes<CalendarsEntryRow> {
    Calendar: ICalendar;
    CurrentCalendar: string;
    onSelect: (calendar: ICalendar) => void;
    onShowInformation: (calendar: ICalendar) => void;
    cssClassName: string;
}
export declare class CalendarsEntryRow extends React.Component<CalendarsEntryRowProps, {}> {
    render(): any;
}
