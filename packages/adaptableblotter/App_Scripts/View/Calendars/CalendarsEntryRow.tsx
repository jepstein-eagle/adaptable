import * as React from 'react';
import {
  ButtonToolbar,
  Button,
  Checkbox,
  OverlayTrigger,
  Tooltip,
  Glyphicon,
} from 'react-bootstrap';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from '../UIInterfaces';
import { Calendar } from '../../PredefinedConfig/RunTimeState/CalendarState';

export interface CalendarsEntryRowProps extends React.ClassAttributes<CalendarsEntryRow> {
  Calendar: Calendar;
  CurrentCalendar: string;
  onSelect: (calendar: Calendar) => void;
  onShowInformation: (calendar: Calendar) => void;
  cssClassName: string;
}

export class CalendarsEntryRow extends React.Component<CalendarsEntryRowProps, {}> {
  render(): any {
    let colItems: IColItem[] = [];
    colItems.push({
      Size: 3,
      Content: (
        <Checkbox
          onChange={() => this.props.onSelect(this.props.Calendar)}
          checked={this.props.Calendar.Name == this.props.CurrentCalendar}
        />
      ),
    });
    colItems.push({ Size: 5, Content: this.props.Calendar.Name });

    colItems.push({
      Size: 3,
      Content: (
        <ButtonToolbar>
          <OverlayTrigger
            overlay={<Tooltip id="tooltipShowInformation">Show Calendar Dates</Tooltip>}
          >
            <Button onClick={() => this.props.onShowInformation(this.props.Calendar)}>
              {' '}
              {'Calendar Details '}
              <Glyphicon glyph="info-sign" />
            </Button>
          </OverlayTrigger>
        </ButtonToolbar>
      ),
    });
    return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />;
  }
}
