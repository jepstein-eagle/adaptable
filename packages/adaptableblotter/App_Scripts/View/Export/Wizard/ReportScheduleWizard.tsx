import { IReport, IAutoExport } from '../../../PredefinedConfig/IUserState/ExportState';
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
import {
  ExportDestination,
  DayOfWeek,
  ReportRowScope,
} from '../../../PredefinedConfig/Common/Enums';
import { EnumExtensions } from '../../../Utilities/Extensions/EnumExtensions';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { ISchedule } from '../../../PredefinedConfig/Common/ISchedule';

export interface ReportScheduleWizardProps extends AdaptableWizardStepProps<IReport> {}

export interface ReportScheduleWizardState {
  HasAutoExport: boolean;
  IsRecurringDate: boolean;
  Hour: number;
  Minute: number;
  DaysOfWeek: DayOfWeek[];
  OneOffDate: any;
  ExportDestination: ExportDestination;
}

export class ReportScheduleWizard
  extends React.Component<ReportScheduleWizardProps, ReportScheduleWizardState>
  implements AdaptableWizardStep {
  constructor(props: ReportScheduleWizardProps) {
    super(props);
    let autoExport: IAutoExport = this.props.Data.AutoExport
      ? this.props.Data.AutoExport
      : ObjectFactory.CreateEmptyAutoExport();

    this.state = {
      HasAutoExport: this.props.Data.AutoExport != null,
      IsRecurringDate: autoExport.Schedule.OneOffDate == null ? true : false,
      Hour: autoExport.Schedule.Hour,
      Minute: autoExport.Schedule.Minute,
      DaysOfWeek: autoExport.Schedule.DaysOfWeek,
      OneOffDate:
        autoExport.Schedule.OneOffDate == null ? new Date() : autoExport.Schedule.OneOffDate,
      ExportDestination: autoExport.ExportDestination,
    };
  }
  render(): any {
    let cssClassName: string = this.props.cssClassName + '-Schedule';

    let destinations = EnumExtensions.getNames(ExportDestination).map(type => {
      return (
        <option key={type} value={type}>
          {type}
        </option>
      );
    });

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
        <Panel header="Schedule Report" bsStyle="primary">
          <Checkbox
            className={cssClassName + '__checkbox'}
            inline
            checked={this.state.HasAutoExport == true}
            onChange={e => this.onHasAutoExportChanged(e)}
          >
            Create a Schedule
          </Checkbox>

          {this.state.HasAutoExport == true && (
            <div style={{ marginTop: '30px' }}>
              <FormGroup controlId="frmDestination">
                <Row>
                  <Col xs={3}>
                    <ControlLabel>Export To:</ControlLabel>
                  </Col>
                  <Col xs={6}>
                    <FormControl
                      componentClass="select"
                      placeholder="select"
                      value={this.state.ExportDestination}
                      onChange={x => this.onExportDestinationChanged(x)}
                    >
                      {destinations}
                    </FormControl>
                  </Col>
                </Row>
              </FormGroup>
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
                        checked={ArrayExtensions.ContainsItem(
                          this.state.DaysOfWeek,
                          DayOfWeek.Monday
                        )}
                        onChange={e => this.onDayChecked(e)}
                      >
                        Monday
                      </Checkbox>
                      <br />
                      <Checkbox
                        className={cssClassName + '__checkbox'}
                        inline
                        value={DayOfWeek.Tuesday}
                        checked={ArrayExtensions.ContainsItem(
                          this.state.DaysOfWeek,
                          DayOfWeek.Tuesday
                        )}
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
                        checked={ArrayExtensions.ContainsItem(
                          this.state.DaysOfWeek,
                          DayOfWeek.Friday
                        )}
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
                        checked={ArrayExtensions.ContainsItem(
                          this.state.DaysOfWeek,
                          DayOfWeek.Sunday
                        )}
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
            </div>
          )}
        </Panel>
      </div>
    );
  }

  private onHasAutoExportChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.checked) {
      this.setState({ HasAutoExport: true } as ReportScheduleWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ HasAutoExport: false } as ReportScheduleWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
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
    this.setState({ DaysOfWeek: daysOfWeek } as ReportScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onOneOffDateChanged = (event: React.FormEvent<any>) => {
    let e = event.target as HTMLInputElement;
    this.setState({ OneOffDate: e.value } as ReportScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onRecurringDateChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;

    this.setState({ IsRecurringDate: e.value == 'recurring' } as ReportScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onHourChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Hour: Number(e.value) } as ReportScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMinuteChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Minute: Number(e.value) } as ReportScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onExportDestinationChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      { ExportDestination: e.value as ExportDestination } as ReportScheduleWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (this.state.HasAutoExport) {
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
    } else {
      return true;
    }
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    // TODO:  need to build up the object ;(
    if (this.state.HasAutoExport) {
      let schedule: ISchedule = {
        Hour: this.state.Hour,
        Minute: this.state.Minute,
        OneOffDate: this.state.IsRecurringDate ? null : this.state.OneOffDate,
        DaysOfWeek: this.state.IsRecurringDate ? this.state.DaysOfWeek : [],
      };

      let autoExport: IAutoExport = {
        Schedule: schedule,
        ExportDestination: this.state.ExportDestination,
      };
      this.props.Data.AutoExport = autoExport;
    } else {
      this.props.Data.AutoExport = null;
    }
  }

  public Back(): void {
    //todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return this.props.Data.ReportRowScope == ReportRowScope.ExpressionRows ? 1 : 2;
  }
}
