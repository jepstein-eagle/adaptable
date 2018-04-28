import * as React from "react";
import { ButtonToolbar, Button,  Checkbox, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { AdaptableObjectRow, } from '../Components/AdaptableObjectRow';
import { IColItem } from "../UIInterfaces";
import { ICalendar } from "../../Core/Api/AdaptableBlotterObjects";

export interface CalendarsEntryRowProps extends React.ClassAttributes<CalendarsEntryRow> {
    Calendar: ICalendar;
    CurrentCalendar: string;
    onSelect: (calendar: ICalendar) => void;
    onShowInformation: (calendar: ICalendar) => void;
     cssClassName: string
}

export class CalendarsEntryRow extends React.Component<CalendarsEntryRowProps, {}> {

    render(): any {
        let colItems: IColItem[] = []
        colItems.push({
            Size: 3, Content: <Checkbox onChange={() => this.props.onSelect(this.props.Calendar)} checked={this.props.Calendar.CalendarName == this.props.CurrentCalendar} />
        });
        colItems.push({ Size: 5, Content: this.props.Calendar.CalendarName });

        colItems.push({
            Size: 3, Content:
                <ButtonToolbar>
                    <OverlayTrigger overlay={<Tooltip id="tooltipShowInformation">Show Calendar Dates</Tooltip>}>
                        <Button onClick={() => this.props.onShowInformation(this.props.Calendar)} > {"Calendar Details "}<Glyphicon glyph="info-sign" /></Button>
                    </OverlayTrigger>
                </ButtonToolbar>
        });
        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }
}

