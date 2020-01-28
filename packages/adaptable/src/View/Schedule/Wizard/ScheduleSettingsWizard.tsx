import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import {
  MessageType,
  ScheduleType,
  ExportDestination,
} from '../../../PredefinedConfig/Common/Enums';
import { EnumExtensions } from '../../../Utilities/Extensions/EnumExtensions';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import Dropdown from '../../../components/Dropdown';
import { Flex, Box, Text } from 'rebass';
import WizardPanel from '../../../components/WizardPanel';
import Input from '../../../components/Input';
import Checkbox from '../../../components/CheckBox';
import { BaseSchedule } from '../../../PredefinedConfig/Common/Schedule';
import { ReminderSchedule } from '../../../PredefinedConfig/ReminderState';
import { ReportSchedule, Report } from '../../../PredefinedConfig/ExportState';
import { IPushPullSchedule, IPushPullDomain } from '../../../PredefinedConfig/IPushPullState';
import { EMPTY_STRING } from '../../../Utilities/Constants/GeneralConstants';
import Radio from '../../../components/Radio';
import HelpBlock from '../../../components/HelpBlock';
import { Glue42Schedule } from '../../../PredefinedConfig/Glue42State';

/**
 * The setttings page for the Base Schedule  - will vary based on what type of schedule it is  - but should only be 1 page to keep it simple
 */
export interface ScheduleSettingsWizardProps extends AdaptableWizardStepProps<BaseSchedule> {}

export interface ScheduleSettingsWizardState {
  // Message Related Settings
  Header: string;
  Msg: string;
  MessageType: MessageType;
  ShowPopup: boolean;

  // Report related Settings
  ReportName: string;
  ExportDestination: 'CSV' | 'Clipboard' | 'JSON';

  // ipushpull Related Settings
  IPushPullReportName: string; // not different name to avod a conflict...
  Page: string;
  Folder: string;
  AvailablePages: string[];
  IPushPullTransmission?: 'Snapshot' | 'Live Data';

  // Glue42 Related Settings
  Glue42ReportName: string; // not different name to avod a conflict...
  Glue42Transmission?: 'Snapshot' | 'Live Data';
}

export class ScheduleSettingsWizard
  extends React.Component<ScheduleSettingsWizardProps, ScheduleSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: ScheduleSettingsWizardProps) {
    super(props);

    this.state = {
      // Reminder
      Header:
        this.props.Data!.ScheduleType == ScheduleType.Reminder
          ? (this.props.Data as ReminderSchedule)!.Alert.Header
          : undefined,
      Msg:
        this.props.Data!.ScheduleType == ScheduleType.Reminder
          ? (this.props.Data as ReminderSchedule)!.Alert.Msg
          : undefined,
      MessageType:
        this.props.Data!.ScheduleType == ScheduleType.Reminder
          ? ((this.props.Data as ReminderSchedule)!.Alert.AlertDefinition
              .MessageType as MessageType)
          : undefined,
      ShowPopup:
        this.props.Data!.ScheduleType == ScheduleType.Reminder
          ? (this.props.Data as ReminderSchedule)!.Alert.AlertDefinition.AlertProperties.ShowPopup
          : undefined,

      // Report
      ReportName:
        this.props.Data!.ScheduleType == ScheduleType.Report
          ? (this.props.Data as ReportSchedule)!.ReportName
          : undefined,
      ExportDestination:
        this.props.Data!.ScheduleType == ScheduleType.Report
          ? (this.props.Data as ReportSchedule)!.ExportDestination
          : undefined,

      // ipushpull
      IPushPullReportName:
        this.props.Data!.ScheduleType === ScheduleType.iPushPull
          ? (this.props.Data as IPushPullSchedule)!.IPushPullReport.ReportName
          : undefined,
      Page:
        this.props.Data!.ScheduleType === ScheduleType.iPushPull
          ? (this.props.Data as IPushPullSchedule)!.IPushPullReport.Page
          : undefined,
      Folder:
        this.props.Data!.ScheduleType === ScheduleType.iPushPull
          ? (this.props.Data as IPushPullSchedule)!.IPushPullReport.Folder
          : undefined,
      IPushPullTransmission:
        this.props.Data!.ScheduleType === ScheduleType.iPushPull
          ? (this.props.Data as IPushPullSchedule)!.Transmission
          : undefined,
      AvailablePages:
        this.props.Data!.ScheduleType === ScheduleType.iPushPull
          ? StringExtensions.IsNotNullOrEmpty(
              (this.props.Data as IPushPullSchedule)!.IPushPullReport.Folder
            )
            ? this.props.Adaptable.api.iPushPullApi.getPagesForIPushPullDomain(
                (this.props.Data as IPushPullSchedule)!.IPushPullReport.Folder
              )
            : []
          : [],
      // Glue42
      Glue42ReportName:
        this.props.Data!.ScheduleType === ScheduleType.Glue42
          ? (this.props.Data as Glue42Schedule)!.Glue42Report.ReportName
          : undefined,
      Glue42Transmission:
        this.props.Data!.ScheduleType === ScheduleType.Glue42
          ? (this.props.Data as Glue42Schedule)!.Transmission
          : undefined,
    };
  }

  render(): any {
    // Reminder Stuff
    let messageTypes = EnumExtensions.getNames(MessageType).map(type => {
      return {
        label: type,
        value: type,
      };
    });

    // Report Stuff
    let allReports: Report[] = this.props.Adaptable.api.exportApi.getAllReports();
    let availableReports: any[] = allReports.map(report => {
      return {
        label: report.Name,
        value: report.Name,
      };
    });

    let destinations = ['CSV', 'Clipboard', 'JSON'].map(type => {
      return {
        label: type,
        value: type,
      };
    });

    // ipushpull Stuff
    let allFolders: IPushPullDomain[] = this.props.Adaptable.api.iPushPullApi.getIPushPullDomains();
    let availableFolders: any[] = allFolders.map((iPushPullDomain: IPushPullDomain) => {
      return {
        label: iPushPullDomain.Name,
        value: iPushPullDomain.Name,
      };
    });

    return (
      <div style={{ height: '100%' }}>
        <WizardPanel>
          {this.props.Data!.ScheduleType === ScheduleType.Reminder && (
            <Flex flexDirection="column">
              <Flex marginTop={2} alignItems="center">
                <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
                  Header:
                </Text>

                <Input
                  style={{ flex: 7 }}
                  value={this.state.Header}
                  type="string"
                  placeholder="Enter Reminder Header (optional)"
                  onChange={(e: React.SyntheticEvent) => this.onHeaderChanged(e)}
                />
              </Flex>
              <Flex marginTop={2} alignItems="center">
                <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
                  Message:
                </Text>

                <Input
                  value={this.state.Msg}
                  style={{ flex: 7 }}
                  type="string"
                  placeholder="Enter Reminder Message"
                  onChange={(e: React.SyntheticEvent) => this.onMessageChanged(e)}
                />
              </Flex>
              <Flex marginTop={2} alignItems="center">
                <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
                  Message Type:
                </Text>

                <Box style={{ flex: 7 }}>
                  <Dropdown
                    style={{ maxWidth: '100%' }}
                    placeholder="select"
                    value={this.state.MessageType}
                    onChange={(value: any) => this.onMessageTypeChanged(value)}
                    options={messageTypes}
                  >
                    {messageTypes}
                  </Dropdown>
                </Box>
              </Flex>
              <Flex marginTop={2}>
                <div style={{ flex: 2 }} />
                <Box style={{ flex: 7 }}>
                  <Checkbox
                    marginLeft={2}
                    checked={this.state.ShowPopup == true}
                    onChange={(checked: boolean) => this.onShowAsPopupChanged(checked)}
                  >
                    Show the Reminder as a Popup
                  </Checkbox>{' '}
                </Box>
              </Flex>
            </Flex>
          )}

          {this.props.Data!.ScheduleType === ScheduleType.Report && (
            <>
              <Flex flexDirection="column" padding={1}>
                <HelpBlock marginBottom={1}>Select a Report to Export</HelpBlock>

                <Dropdown
                  disabled={allReports.length == 0}
                  style={{ minWidth: 300 }}
                  options={availableReports}
                  className="ab-DashboardToolbar__Export__select"
                  placeholder="Select Report"
                  onChange={(reportName: string) => this.onSelectedReportChanged(reportName)}
                  value={this.state.ReportName ? this.state.ReportName : null}
                  showClearButton
                  marginRight={2}
                />

                <HelpBlock marginBottom={1} marginTop={3}>
                  Select an Export Destination
                </HelpBlock>

                <Dropdown
                  placeholder="select"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.state.ExportDestination}
                  onChange={(x: any) => this.onExportDestinationChanged(x)}
                  options={destinations}
                />
              </Flex>
            </>
          )}

          {this.props.Data!.ScheduleType === ScheduleType.iPushPull && (
            <>
              <Flex flexDirection="column" padding={1}>
                <HelpBlock marginBottom={1}>Select a Report to Export</HelpBlock>
                <Dropdown
                  disabled={allReports.length == 0}
                  style={{ minWidth: 300 }}
                  options={availableReports}
                  className="ab-DashboardToolbar__Export__select"
                  placeholder="Select Report"
                  onChange={(iPushPullReportName: string) =>
                    this.onIPushPullSelectedReportChanged(iPushPullReportName)
                  }
                  value={this.state.IPushPullReportName ? this.state.IPushPullReportName : null}
                  showClearButton
                  marginRight={2}
                />

                <HelpBlock marginBottom={1} marginTop={3}>
                  Select an ipushpull Folder
                </HelpBlock>

                <Dropdown
                  disabled={availableFolders.length == 0}
                  style={{ minWidth: 300 }}
                  options={availableFolders}
                  className="ab-DashboardToolbar__Export__select"
                  onChange={(folder: string) => this.onFolderChanged(folder)}
                  value={this.state.Folder ? this.state.Folder : null}
                  placeholder="Select Folder"
                  marginRight={2}
                />
                <HelpBlock marginBottom={1} marginTop={3}>
                  Select an ipushpull Page
                </HelpBlock>

                <Dropdown
                  disabled={allReports.length == 0}
                  style={{ minWidth: 300 }}
                  options={this.state.AvailablePages}
                  className="ab-DashboardToolbar__Export__select"
                  placeholder="Select Page"
                  onChange={(page: string) => this.onPageChanged(page)}
                  value={this.state.Page ? this.state.Page : null}
                  showClearButton
                  marginRight={2}
                />

                <HelpBlock marginBottom={1} marginTop={3}>
                  Choose whether to send ipushpull Data as 'Snapshot' (One-off report) or 'Live
                  Data' (updating as Grid updates)
                </HelpBlock>

                <Flex flex={7} flexDirection="row" alignItems="center">
                  <Radio
                    marginRight={3}
                    marginLeft={2}
                    value="Snapshot"
                    checked={this.state.IPushPullTransmission === 'Snapshot'}
                    onChange={(_, e: any) => this.onIPushPullTransmissionChanged(e)}
                  >
                    Snapshot (one off report)
                  </Radio>
                  <Radio
                    value="Live Data"
                    checked={this.state.IPushPullTransmission === 'Live Data'}
                    onChange={(_, e: any) => this.onIPushPullTransmissionChanged(e)}
                  >
                    Live Data (real-time updates)
                  </Radio>
                </Flex>
              </Flex>
            </>
          )}
          {this.props.Data!.ScheduleType === ScheduleType.Glue42 && (
            <>
              <Flex flexDirection="column" padding={1}>
                <HelpBlock marginBottom={1}>Select a Report to Export</HelpBlock>
                <Dropdown
                  disabled={allReports.length == 0}
                  style={{ minWidth: 300 }}
                  options={availableReports}
                  className="ab-DashboardToolbar__Export__select"
                  placeholder="Select Report"
                  onChange={(glue42ReportName: string) =>
                    this.onGlue42SelectedReportChanged(glue42ReportName)
                  }
                  value={this.state.Glue42ReportName ? this.state.Glue42ReportName : null}
                  showClearButton
                  marginRight={2}
                />

                <HelpBlock marginBottom={1} marginTop={3}>
                  Choose whether to send Glue42 Data as 'Snapshot' (One-off report) or 'Live Data'
                  (updating as Grid updates)
                </HelpBlock>

                <Flex flex={7} flexDirection="row" alignItems="center">
                  <Radio
                    marginRight={3}
                    marginLeft={2}
                    value="Snapshot"
                    checked={this.state.Glue42Transmission === 'Snapshot'}
                    onChange={(_, e: any) => this.onGlue42TransmissionChanged(e)}
                  >
                    Snapshot (one off report)
                  </Radio>
                  <Radio
                    value="Live Data"
                    checked={this.state.Glue42Transmission === 'Live Data'}
                    onChange={(_, e: any) => this.onGlue42TransmissionChanged(e)}
                  >
                    Live Data (real-time updates)
                  </Radio>
                </Flex>
              </Flex>
            </>
          )}
        </WizardPanel>
      </div>
    );
  }

  private onHeaderChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Header: e.value } as ScheduleSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMessageChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Msg: e.value } as ScheduleSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMessageTypeChanged(value: any) {
    this.setState({ MessageType: value } as ScheduleSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onShowAsPopupChanged(checked: boolean) {
    this.setState({ ShowPopup: checked } as ScheduleSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onSelectedReportChanged(reportName: string) {
    if (StringExtensions.IsNotNullOrEmpty(reportName) && reportName !== 'Select Report') {
      this.setState({ ReportName: reportName } as ScheduleSettingsWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ ReportName: EMPTY_STRING } as ScheduleSettingsWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
  }

  private onExportDestinationChanged(value: any) {
    this.setState(
      { ExportDestination: value as ExportDestination } as ScheduleSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onIPushPullSelectedReportChanged(reportName: string) {
    if (StringExtensions.IsNotNullOrEmpty(reportName) && reportName !== 'Select Report') {
      this.setState({ IPushPullReportName: reportName } as ScheduleSettingsWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ IPushPullReportName: EMPTY_STRING } as ScheduleSettingsWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
  }
  private onFolderChanged(folder: string) {
    if (StringExtensions.IsNotNullOrEmpty(folder) && folder !== 'Select Folder') {
      let avaialablePages = this.props.Adaptable.api.iPushPullApi.getPagesForIPushPullDomain(
        folder
      );
      this.setState(
        {
          Folder: folder,
          AvailablePages: avaialablePages,
          Page: EMPTY_STRING,
        } as ScheduleSettingsWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else {
      this.setState(
        {
          Folder: EMPTY_STRING,
          AvailablePages: [],
          Page: EMPTY_STRING,
        } as ScheduleSettingsWizardState,
        () => this.props.UpdateGoBackState()
      );
    }
  }
  private onPageChanged(page: string) {
    if (StringExtensions.IsNotNullOrEmpty(page) && page !== 'Select Page') {
      this.setState({ Page: page } as ScheduleSettingsWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ Page: EMPTY_STRING } as ScheduleSettingsWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
  }

  private onIPushPullTransmissionChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ IPushPullTransmission: e.value } as ScheduleSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onGlue42SelectedReportChanged(reportName: string) {
    if (StringExtensions.IsNotNullOrEmpty(reportName) && reportName !== 'Select Report') {
      this.setState({ Glue42ReportName: reportName } as ScheduleSettingsWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ Glue42ReportName: EMPTY_STRING } as ScheduleSettingsWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
  }

  private onGlue42TransmissionChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Glue42Transmission: e.value } as ScheduleSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    switch (this.props.Data.ScheduleType) {
      case ScheduleType.Reminder:
        return this.state.MessageType != null && StringExtensions.IsNotNullOrEmpty(this.state.Msg);
      case ScheduleType.Report:
        return (
          StringExtensions.IsNotNullOrEmpty(this.state.ReportName) &&
          StringExtensions.IsNotNullOrEmpty(this.state.ExportDestination)
        );
      case ScheduleType.iPushPull:
        return (
          StringExtensions.IsNotNullOrEmpty(this.state.IPushPullReportName) &&
          StringExtensions.IsNotNullOrEmpty(this.state.Page) &&
          StringExtensions.IsNotNullOrEmpty(this.state.Folder)
        );
      case ScheduleType.Glue42:
        return StringExtensions.IsNotNullOrEmpty(this.state.Glue42ReportName);
    }
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    switch (this.props.Data.ScheduleType) {
      case ScheduleType.Reminder:
        (this.props.Data as ReminderSchedule)!.Alert.Header = this.state.Header;
        (this.props.Data as ReminderSchedule)!.Alert.Msg = this.state.Msg;
        (this.props
          .Data as ReminderSchedule)!.Alert.AlertDefinition.MessageType = this.state.MessageType;
        (this.props
          .Data as ReminderSchedule)!.Alert.AlertDefinition.AlertProperties.ShowPopup = this.state.ShowPopup;
        break;

      case ScheduleType.Report:
        (this.props.Data as ReportSchedule)!.ReportName = this.state.ReportName;
        (this.props.Data as ReportSchedule)!.ExportDestination = this.state.ExportDestination;
        break;

      case ScheduleType.iPushPull:
        (this.props
          .Data as IPushPullSchedule)!.IPushPullReport.ReportName = this.state.IPushPullReportName;
        (this.props.Data as IPushPullSchedule)!.IPushPullReport.Folder = this.state.Folder;
        (this.props.Data as IPushPullSchedule)!.IPushPullReport.Page = this.state.Page;
        (this.props.Data as IPushPullSchedule)!.Transmission = this.state.IPushPullTransmission;
        break;

      case ScheduleType.Glue42:
        (this.props.Data as Glue42Schedule)!.Glue42Report.ReportName = this.state.Glue42ReportName;
        (this.props.Data as Glue42Schedule)!.Transmission = this.state.Glue42Transmission;
        break;
    }
  }

  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
