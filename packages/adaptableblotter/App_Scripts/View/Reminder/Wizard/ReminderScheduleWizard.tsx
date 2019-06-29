import { Reminder } from '../../../PredefinedConfig/RunTimeState/ReminderState';
import * as React from 'react';
import {
  Panel,
  FormControl,
  Checkbox,
  FormGroup,
  Radio,
  Col,
  ControlLabel,
  Row,
} from 'react-bootstrap';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { DayOfWeek, StateChangedTrigger } from '../../../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { Schedule } from '../../../PredefinedConfig/Common/Schedule';

export interface ReminderScheduleWizardProps extends AdaptableWizardStepProps<Reminder> {}

export interface ReminderScheduleWizardState {
  IsRecurringDate: boolean;
  Hour: number;
  Minute: number;
  DaysOfWeek: DayOfWeek[];
  OneOffDate: any;
}

export class ReminderScheduleWizard
  extends React.Component<ReminderScheduleWizardProps, ReminderScheduleWizardState>
  implements AdaptableWizardStep {
  constructor(props: ReminderScheduleWizardProps) {
    super(props);

    this.state = {
      IsRecurringDate: this.props.Data.Schedule.OneOffDate == null ? true : false,
      Hour: this.props.Data.Schedule.Hour,
      Minute: this.props.Data.Schedule.Minute,
      DaysOfWeek: this.props.Data.Schedule.DaysOfWeek,
      OneOffDate: this.props.Data.Schedule.OneOffDate
        ? this.props.Data.Schedule.OneOffDate
        : new Date(),
    };
  }
  render(): any {
    let cssClassName: string = this.props.cssClassName + '-Schedule';

    let hours: any[] = [];
    let i: number;
    for (i = 0; i < 24; i++) {
      hours.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    let minutes: any[] = [];
    let j: number;
    for (j = 0; j < 60; j++) {
      minutes.push(
        <option key={j} value={j}>
          {j}
        </option>
      );
    }

    return (
      <div className={cssClassName}>
        <Panel header="Schedule Reminder" bsStyle="primary">
          <FormGroup controlId="frmHour">
            <Row>
              <Col xs={3}>
                <ControlLabel>Hour</ControlLabel>
              </Col>
              <Col xs={6}>
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  value={this.state.Hour}
                  onChange={x => this.onHourChanged(x)}
                >
                  {hours}
                </FormControl>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="frmMinute">
            <Row>
              <Col xs={3}>
                <ControlLabel>Minute:</ControlLabel>
              </Col>
              <Col xs={6}>
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  value={this.state.Minute}
                  onChange={x => this.onMinuteChanged(x)}
                >
                  {minutes}
                </FormControl>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formInlineDateType">
            <Row>
              <Col xs={3}>
                <ControlLabel>Date:</ControlLabel>
              </Col>
              <Col xs={6}>
                <Radio
                  inline
                  value="recurring"
                  checked={this.state.IsRecurringDate == true}
                  onChange={e => this.onRecurringDateChanged(e)}
                >
                  Recurring Days
                </Radio>
                <Radio
                  inline
                  value="oneoff"
                  checked={this.state.IsRecurringDate == false}
                  onChange={e => this.onRecurringDateChanged(e)}
                >
                  One Off Date
                </Radio>
              </Col>
            </Row>
          </FormGroup>

          {this.state.IsRecurringDate ? (
            <Row>
              <Col xs={3} />
              <Col xs={6}>
                <Panel>
                  <Checkbox
                    className={cssClassName + '__checkbox'}
                    inline
                    value={DayOfWeek.Monday}
                    checked={ArrayExtensions.ContainsItem(this.state.DaysOfWeek, DayOfWeek.Monday)}
                    onChange={e => this.onDayChecked(e)}
                  >
                    Monday
                  </Checkbox>
                  <br />
                  <Checkbox
                    className={cssClassName + '__checkbox'}
                    inline
                    value={DayOfWeek.Tuesday}
                    checked={ArrayExtensions.ContainsItem(this.state.DaysOfWeek, DayOfWeek.Tuesday)}
                    onChange={e => this.onDayChecked(e)}
                  >
                    Tuesday
                  </Checkbox>
                  <br />
                  <Checkbox
                    className={cssClassName + '__checkbox'}
                    inline
                    value={DayOfWeek.Wednesday}
                    checked={ArrayExtensions.ContainsItem(
                      this.state.DaysOfWeek,
                      DayOfWeek.Wednesday
                    )}
                    onChange={e => this.onDayChecked(e)}
                  >
                    Wednesday
                  </Checkbox>
                  <br />
                  <Checkbox
                    className={cssClassName + '__checkbox'}
                    inline
                    value={DayOfWeek.Thursday}
                    checked={ArrayExtensions.ContainsItem(
                      this.state.DaysOfWeek,
                      DayOfWeek.Thursday
                    )}
                    onChange={e => this.onDayChecked(e)}
                  >
                    Thursday
                  </Checkbox>
                  <br />
                  <Checkbox
                    className={cssClassName + '__checkbox'}
                    inline
                    value={DayOfWeek.Friday}
                    checked={ArrayExtensions.ContainsItem(this.state.DaysOfWeek, DayOfWeek.Friday)}
                    onChange={e => this.onDayChecked(e)}
                  >
                    Friday
                  </Checkbox>
                  <br />
                  <Checkbox
                    className={cssClassName + '__checkbox'}
                    inline
                    value={DayOfWeek.Saturday}
                    checked={ArrayExtensions.ContainsItem(
                      this.state.DaysOfWeek,
                      DayOfWeek.Saturday
                    )}
                    onChange={e => this.onDayChecked(e)}
                  >
                    Saturday
                  </Checkbox>
                  <br />
                  <Checkbox
                    className={cssClassName + '__checkbox'}
                    inline
                    value={DayOfWeek.Sunday}
                    checked={ArrayExtensions.ContainsItem(this.state.DaysOfWeek, DayOfWeek.Sunday)}
                    onChange={e => this.onDayChecked(e)}
                  >
                    Sunday
                  </Checkbox>
                </Panel>
              </Col>
            </Row>
          ) : (
            <FormGroup controlId="frmOneOffDate">
              <Row>
                <Col xs={3} />
                <Col xs={6}>
                  <FormControl
                    type="date"
                    placeholder="Date"
                    onChange={x => this.onOneOffDateChanged(x)}
                    value={this.state.OneOffDate}
                  />
                </Col>
              </Row>
            </FormGroup>
          )}
        </Panel>
      </div>
    );
  }

  private onDayChecked(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let dayOfWeek: DayOfWeek = Number(e.value) as DayOfWeek;
    let daysOfWeek = this.state.DaysOfWeek;
    if (e.checked) {
      daysOfWeek.push(dayOfWeek);
    } else {
      let index: number = daysOfWeek.indexOf(dayOfWeek);
      daysOfWeek.splice(index, 1);
    }
    this.setState({ DaysOfWeek: daysOfWeek } as ReminderScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onOneOffDateChanged = (event: React.FormEvent<any>) => {
    let e = event.target as HTMLInputElement;
    this.setState({ OneOffDate: e.value } as ReminderScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onRecurringDateChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;

    this.setState({ IsRecurringDate: e.value == 'recurring' } as ReminderScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onHourChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Hour: Number(e.value) } as ReminderScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMinuteChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Minute: Number(e.value) } as ReminderScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (this.state.Hour == null || this.state.Minute == null) {
      return false;
    }
    if (this.state.IsRecurringDate && ArrayExtensions.IsEmpty(this.state.DaysOfWeek)) {
      return false;
    }
    if (!this.state.IsRecurringDate && this.state.OneOffDate == null) {
      return false;
    }
    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    let schedule: Schedule = {
      Hour: this.state.Hour,
      Minute: this.state.Minute,
      OneOffDate: this.state.IsRecurringDate ? null : this.state.OneOffDate,
      DaysOfWeek: this.state.IsRecurringDate ? this.state.DaysOfWeek : [],
    };
    this.props.Data.Schedule = schedule;
  }

  public Back(): void {
    //todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
