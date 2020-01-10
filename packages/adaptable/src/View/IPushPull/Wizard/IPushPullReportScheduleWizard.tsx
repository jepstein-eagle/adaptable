import { AutoExport } from '../../../PredefinedConfig/ExportState';
import * as React from 'react';
import WizardPanel from '../../../components/WizardPanel';
import Radio from '../../../components/Radio';
import Checkbox from '../../../components/CheckBox';
import Dropdown from '../../../components/Dropdown';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import {
  ExportDestination,
  DayOfWeek,
  ReportRowScope,
} from '../../../PredefinedConfig/Common/Enums';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { Schedule } from '../../../PredefinedConfig/Common/Schedule';
import { Flex, Box, Text } from 'rebass';
import Input from '../../../components/Input';
import { IPushPullReport } from '../../../PredefinedConfig/IPushPullState';

export interface IPushPullReportScheduleWizardProps
  extends AdaptableWizardStepProps<IPushPullReport> {}

export interface IPushPullReportScheduleWizardState {
  HasAutoExport: boolean;
  IsRecurringDate: boolean;
  Hour: number;
  Minute: number;
  DaysOfWeek: DayOfWeek[];
  OneOffDate: any;
  ScheduleType?: 'Snapsot' | 'Live';
}

export class IPushPullReportScheduleWizard
  extends React.Component<IPushPullReportScheduleWizardProps, IPushPullReportScheduleWizardState>
  implements AdaptableWizardStep {
  constructor(props: IPushPullReportScheduleWizardProps) {
    super(props);
    let autoExport: AutoExport = this.props.Data!.Report.AutoExport
      ? this.props.Data!.Report.AutoExport
      : ObjectFactory.CreateEmptyAutoExport();

    this.state = {
      HasAutoExport: this.props.Data!.Report.AutoExport != null,
      IsRecurringDate: autoExport.Schedule.OneOffDate == null ? true : false,
      Hour: autoExport.Schedule.Hour,
      Minute: autoExport.Schedule.Minute,
      DaysOfWeek: autoExport.Schedule.DaysOfWeek,
      OneOffDate:
        autoExport.Schedule.OneOffDate == null ? new Date() : autoExport.Schedule.OneOffDate,
      ScheduleType: this.props.Data.ScheduleType ? this.props.Data.ScheduleType : 'Snapsot',
    };
  }
  render(): any {
    let hours: any[] = [];
    let i: number;
    for (i = 0; i < 24; i++) {
      hours.push({
        value: i,
        label: i,
      });
    }

    let minutes: any[] = [];
    let j: number;
    for (j = 0; j < 60; j++) {
      minutes.push({
        value: j,
        label: j,
      });
    }

    return (
      <WizardPanel>
        <Checkbox
          marginLeft={2}
          checked={this.state.HasAutoExport == true}
          onChange={(checked: boolean) => this.onHasAutoExportChanged(checked)}
        >
          Create a Schedule
        </Checkbox>

        {this.state.HasAutoExport == true && (
          <Box marginTop={1}>
            <Flex flexDirection="row" alignItems="center" marginTop={3}>
              <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
                Export As:
              </Text>
              <Flex flex={7} flexDirection="row" alignItems="center">
                <Radio
                  marginRight={3}
                  value="Snapsot"
                  checked={this.state.ScheduleType === 'Snapsot'}
                  onChange={(_, e: any) => this.onScheduleTypeChanged(e)}
                >
                  Snapshot (one off report)
                </Radio>
                <Radio
                  value="Live"
                  checked={this.state.ScheduleType === 'Live'}
                  onChange={(_, e: any) => this.onScheduleTypeChanged(e)}
                >
                  Live Data (real-time updates)
                </Radio>
              </Flex>
            </Flex>
            <Flex flexDirection="row" alignItems="center" marginTop={3}>
              <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
                Hour:
              </Text>
              <Flex flex={7}>
                <Dropdown
                  placeholder="select"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.state.Hour}
                  onChange={(x: any) => this.onHourChanged(x)}
                  options={hours}
                ></Dropdown>
              </Flex>
            </Flex>
            <Flex flexDirection="row" alignItems="center" marginTop={3}>
              <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
                Minute:
              </Text>
              <Flex flex={7}>
                <Dropdown
                  showEmptyItem={false}
                  showClearButton={false}
                  placeholder="select"
                  value={this.state.Minute}
                  onChange={(x: any) => this.onMinuteChanged(x)}
                  options={minutes}
                />
              </Flex>
            </Flex>
            <Flex flexDirection="row" alignItems="center" marginTop={3}>
              <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
                Date:
              </Text>
              <Flex flex={7} flexDirection="row" alignItems="center">
                <Radio
                  marginRight={3}
                  value="recurring"
                  checked={this.state.IsRecurringDate == true}
                  onChange={(_, e: any) => this.onRecurringDateChanged(e)}
                >
                  Recurring Days
                </Radio>
                <Radio
                  value="oneoff"
                  checked={this.state.IsRecurringDate == false}
                  onChange={(_, e: any) => this.onRecurringDateChanged(e)}
                >
                  One Off Date
                </Radio>
              </Flex>
            </Flex>

            {this.state.IsRecurringDate ? (
              <Flex flexDirection="row" alignItems="center" marginTop={3}>
                <Flex flex={3} />
                <Flex flex={7}>
                  <Flex flexDirection="column">
                    <Checkbox
                      marginLeft={2}
                      value={DayOfWeek.Monday}
                      checked={ArrayExtensions.ContainsItem(
                        this.state.DaysOfWeek,
                        DayOfWeek.Monday
                      )}
                      onChange={(_, e: any) => this.onDayChecked(e)}
                    >
                      Monday
                    </Checkbox>

                    <Checkbox
                      marginLeft={2}
                      marginTop={2}
                      value={DayOfWeek.Tuesday}
                      checked={ArrayExtensions.ContainsItem(
                        this.state.DaysOfWeek,
                        DayOfWeek.Tuesday
                      )}
                      onChange={(_, e: any) => this.onDayChecked(e)}
                    >
                      Tuesday
                    </Checkbox>

                    <Checkbox
                      marginLeft={2}
                      marginTop={2}
                      value={DayOfWeek.Wednesday}
                      checked={ArrayExtensions.ContainsItem(
                        this.state.DaysOfWeek,
                        DayOfWeek.Wednesday
                      )}
                      onChange={(_, e: any) => this.onDayChecked(e)}
                    >
                      Wednesday
                    </Checkbox>

                    <Checkbox
                      marginLeft={2}
                      marginTop={2}
                      value={DayOfWeek.Thursday}
                      checked={ArrayExtensions.ContainsItem(
                        this.state.DaysOfWeek,
                        DayOfWeek.Thursday
                      )}
                      onChange={(_, e: any) => this.onDayChecked(e)}
                    >
                      Thursday
                    </Checkbox>

                    <Checkbox
                      marginLeft={2}
                      value={DayOfWeek.Friday}
                      checked={ArrayExtensions.ContainsItem(
                        this.state.DaysOfWeek,
                        DayOfWeek.Friday
                      )}
                      marginTop={2}
                      onChange={(_, e: any) => this.onDayChecked(e)}
                    >
                      Friday
                    </Checkbox>

                    <Checkbox
                      marginLeft={2}
                      marginTop={2}
                      value={DayOfWeek.Saturday}
                      checked={ArrayExtensions.ContainsItem(
                        this.state.DaysOfWeek,
                        DayOfWeek.Saturday
                      )}
                      onChange={(_, e: any) => this.onDayChecked(e)}
                    >
                      Saturday
                    </Checkbox>

                    <Checkbox
                      marginLeft={2}
                      marginTop={2}
                      value={DayOfWeek.Sunday}
                      checked={ArrayExtensions.ContainsItem(
                        this.state.DaysOfWeek,
                        DayOfWeek.Sunday
                      )}
                      onChange={(_, e: any) => this.onDayChecked(e)}
                    >
                      Sunday
                    </Checkbox>
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <Flex flexDirection="row" alignItems="center" marginTop={3}>
                <Flex flex={3} />

                <Flex flex={7}>
                  <Input
                    type="date"
                    placeholder="Date"
                    onChange={(x: any) => this.onOneOffDateChanged(x)}
                    value={this.state.OneOffDate}
                  />
                </Flex>
              </Flex>
            )}
          </Box>
        )}
      </WizardPanel>
    );
  }

  private onHasAutoExportChanged(checked: boolean) {
    if (checked) {
      this.setState({ HasAutoExport: true } as IPushPullReportScheduleWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ HasAutoExport: false } as IPushPullReportScheduleWizardState, () =>
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
    this.setState({ DaysOfWeek: daysOfWeek } as IPushPullReportScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onOneOffDateChanged = (event: React.FormEvent<any>) => {
    let e = event.target as HTMLInputElement;
    this.setState({ OneOffDate: e.value } as IPushPullReportScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onScheduleTypeChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;

    this.setState({ ScheduleType: e.value } as IPushPullReportScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onRecurringDateChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;

    this.setState(
      { IsRecurringDate: e.value == 'recurring' } as IPushPullReportScheduleWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onHourChanged(value: any) {
    this.setState({ Hour: Number(value) } as IPushPullReportScheduleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMinuteChanged(value: any) {
    this.setState({ Minute: Number(value) } as IPushPullReportScheduleWizardState, () =>
      this.props.UpdateGoBackState()
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
    if (this.state.HasAutoExport) {
      let schedule: Schedule = {
        Hour: this.state.Hour,
        Minute: this.state.Minute,
        OneOffDate: this.state.IsRecurringDate ? null : this.state.OneOffDate,
        DaysOfWeek: this.state.IsRecurringDate ? this.state.DaysOfWeek : [],
      };

      let autoExport: AutoExport = {
        Schedule: schedule,
        ExportDestination: ExportDestination.iPushPull,
      };
      this.props.Data!.Report.AutoExport = autoExport;
      this.props.Data.ScheduleType = this.state.ScheduleType;
    } else {
      this.props.Data!.Report.AutoExport = undefined;
    }
  }

  public Back(): void {
    //todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    // todo : i think wrong as we changed the order :(
    return this.props.Data!.Report.ReportRowScope == ReportRowScope.ExpressionRows ? 1 : 2;
  }
}
