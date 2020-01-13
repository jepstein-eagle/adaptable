import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { DayOfWeek } from '../../../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { Schedule, BaseSchedule } from '../../../PredefinedConfig/Common/Schedule';
import WizardPanel from '../../../components/WizardPanel';
import { Flex, Text, Box } from 'rebass';
import Dropdown from '../../../components/Dropdown';
import Radio from '../../../components/Radio';
import Checkbox from '../../../components/CheckBox';
import Input from '../../../components/Input';
import { SyntheticEvent } from 'react';
import HelpBlock from '../../../components/HelpBlock';

export interface ScheduleScheduleWizardProps extends AdaptableWizardStepProps<BaseSchedule> {}

export interface ScheduleScheduleWizardState {
  IsRecurringDate: boolean;
  Hour: number;
  Minute: number;
  DaysOfWeek: DayOfWeek[];
  OneOffDate: any;
}

export class ScheduleScheduleWizard
  extends React.Component<ScheduleScheduleWizardProps, ScheduleScheduleWizardState>
  implements AdaptableWizardStep {
  constructor(props: ScheduleScheduleWizardProps) {
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
    let hours: any[] = [];
    let i: number;
    for (i = 0; i < 24; i++) {
      hours.push({
        label: i,
        value: i,
      });
    }

    let minutes: any[] = [];
    let j: number;
    for (j = 0; j < 60; j++) {
      minutes.push({
        label: j,
        value: j,
      });
    }

    return (
      <div>
        <WizardPanel>
          <>
            <Flex flexDirection="column" padding={1}>
              <HelpBlock marginBottom={1} marginTop={1}>
                Choose to run the Schedule on a One Off Date or on a series of Recurring Days
              </HelpBlock>
              <Flex flex={7} flexDirection="row" alignItems="center">
                <Radio
                  marginRight={3}
                  marginLeft={2}
                  value="recurring"
                  checked={this.state.IsRecurringDate == true}
                  onChange={(checked: boolean) => this.onRecurringDateChanged(checked)}
                >
                  Recurring Days
                </Radio>
                <Radio
                  value="oneoff"
                  checked={this.state.IsRecurringDate == false}
                  onChange={(checked: boolean) => this.onRecurringDateChanged(!checked)}
                >
                  One Off Date
                </Radio>
              </Flex>
              {this.state.IsRecurringDate ? (
                <Flex flex={7} marginTop={2} flexDirection="row" alignItems="center">
                  <Checkbox
                    marginLeft={2}
                    value={DayOfWeek.Monday}
                    checked={ArrayExtensions.ContainsItem(this.state.DaysOfWeek, DayOfWeek.Monday)}
                    onChange={(checked: boolean, e: SyntheticEvent) => this.onDayChecked(e)}
                  >
                    Monday
                  </Checkbox>

                  <Checkbox
                    marginLeft={3}
                    value={DayOfWeek.Tuesday}
                    checked={ArrayExtensions.ContainsItem(this.state.DaysOfWeek, DayOfWeek.Tuesday)}
                    onChange={(checked: boolean, e: SyntheticEvent) => this.onDayChecked(e)}
                  >
                    Tuesday
                  </Checkbox>

                  <Checkbox
                    marginLeft={3}
                    value={DayOfWeek.Wednesday}
                    checked={ArrayExtensions.ContainsItem(
                      this.state.DaysOfWeek,
                      DayOfWeek.Wednesday
                    )}
                    onChange={(checked: boolean, e: SyntheticEvent) => this.onDayChecked(e)}
                  >
                    Wednesday
                  </Checkbox>

                  <Checkbox
                    marginLeft={3}
                    value={DayOfWeek.Thursday}
                    checked={ArrayExtensions.ContainsItem(
                      this.state.DaysOfWeek,
                      DayOfWeek.Thursday
                    )}
                    onChange={(checked: boolean, e: SyntheticEvent) => this.onDayChecked(e)}
                  >
                    Thursday
                  </Checkbox>

                  <Checkbox
                    marginLeft={3}
                    value={DayOfWeek.Friday}
                    checked={ArrayExtensions.ContainsItem(this.state.DaysOfWeek, DayOfWeek.Friday)}
                    onChange={(checked: boolean, e: SyntheticEvent) => this.onDayChecked(e)}
                  >
                    Friday
                  </Checkbox>

                  <Checkbox
                    marginLeft={3}
                    value={DayOfWeek.Saturday}
                    checked={ArrayExtensions.ContainsItem(
                      this.state.DaysOfWeek,
                      DayOfWeek.Saturday
                    )}
                    onChange={(checked: boolean, e: SyntheticEvent) => this.onDayChecked(e)}
                  >
                    Saturday
                  </Checkbox>

                  <Checkbox
                    marginLeft={3}
                    value={DayOfWeek.Sunday}
                    checked={ArrayExtensions.ContainsItem(this.state.DaysOfWeek, DayOfWeek.Sunday)}
                    onChange={(checked: boolean, e: SyntheticEvent) => this.onDayChecked(e)}
                  >
                    Sunday
                  </Checkbox>
                </Flex>
              ) : (
                <Flex flexDirection="column">
                  <HelpBlock marginBottom={1} marginTop={2}>
                    Select Date
                  </HelpBlock>

                  <Input
                    style={{ maxWidth: 300 }}
                    type="date"
                    placeholder="Date"
                    onChange={(x: SyntheticEvent) => this.onOneOffDateChanged(x)}
                    value={this.state.OneOffDate}
                  />
                </Flex>
              )}{' '}
              <HelpBlock marginBottom={1} marginTop={3}>
                Select Hour of Day
              </HelpBlock>
              <Dropdown
                placeholder="select"
                style={{ minWidth: 300 }}
                value={this.state.Hour}
                onChange={(value: any) => this.onHourChanged(value)}
                options={hours}
              ></Dropdown>
              <HelpBlock marginBottom={1} marginTop={3}>
                Select Minute
              </HelpBlock>
              <Dropdown
                placeholder="select"
                style={{ minWidth: 300 }}
                value={this.state.Minute}
                onChange={(value: any) => this.onMinuteChanged(value)}
                options={minutes}
              ></Dropdown>
            </Flex>
          </>
        </WizardPanel>
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
    this.setState({ DaysOfWeek: daysOfWeek } as ScheduleScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onOneOffDateChanged = (event: React.FormEvent<any>) => {
    let e = event.target as HTMLInputElement;
    this.setState({ OneOffDate: e.value } as ScheduleScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onRecurringDateChanged(checked: boolean) {
    this.setState({ IsRecurringDate: checked } as ScheduleScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onHourChanged(value: any) {
    this.setState({ Hour: Number(value) } as ScheduleScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMinuteChanged(value: any) {
    this.setState({ Minute: Number(value) } as ScheduleScheduleWizardState, () =>
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
