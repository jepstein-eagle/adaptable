import * as React from "react";
import { ButtonToolbar, Button,  Checkbox, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { ICalendar } from '../../Strategy/Interface/ICalendarStrategy';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';

export interface CalendarsEntryRowProps extends React.ClassAttributes<CalendarsEntryRow> {
    Calendar: ICalendar;
    CurrentCalendar: string;
    onSelect: (calendar: ICalendar) => void;
    onShowInformation: (calendar: ICalendar) => void;
}

export class CalendarsEntryRow extends React.Component<CalendarsEntryRowProps, {}> {

    render(): any {
        let myCols: IColItem[] = []
        myCols.push({
            size: 3, content: <Checkbox onChange={() => this.props.onSelect(this.props.Calendar)} checked={this.props.Calendar.CalendarName == this.props.CurrentCalendar} />
        });
        myCols.push({ size: 5, content: this.props.Calendar.CalendarName });

        myCols.push({
            size: 3, content:
                <ButtonToolbar>
                    <OverlayTrigger overlay={<Tooltip id="tooltipShowInformation">Show Calendar Dates</Tooltip>}>
                        <Button onClick={() => this.props.onShowInformation(this.props.Calendar)} > {"Calendar Details "}<Glyphicon glyph="info-sign" /></Button>
                    </OverlayTrigger>
                </ButtonToolbar>
        });
        return <ConfigEntityRowItem items={myCols} />
    }
}

