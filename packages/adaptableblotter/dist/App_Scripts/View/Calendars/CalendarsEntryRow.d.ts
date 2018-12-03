import * as React from "react";
import { ICalendar } from "../../api/Interface/IAdaptableBlotterObjects";
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
