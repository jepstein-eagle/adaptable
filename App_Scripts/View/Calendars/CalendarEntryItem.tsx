import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Col, Row, Panel } from 'react-bootstrap';
import { ICalendarEntry } from '../../Core/Interface/ICalendarStrategy';
import { ConfigEntityRow, IColItem } from '../Components/ConfigEntityRow';

export interface CalendarEntryItemProps extends React.ClassAttributes<CalendarEntryItem> {
    CalendarEntry: ICalendarEntry;
}

export class CalendarEntryItem extends React.Component<CalendarEntryItemProps, {}> {

    render(): any {
        let myCols: IColItem[] = []
        myCols.push({ size: 6, content: this.props.CalendarEntry.HolidayName });
        myCols.push({ size: 6, content: new Date(this.props.CalendarEntry.HolidayDate).toDateString() });
        return <ConfigEntityRow items={myCols} />
    }
}
