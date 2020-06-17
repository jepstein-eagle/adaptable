import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import * as OpenFinRedux from '../Redux/ActionReducers/OpenFinRedux';
import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import { PanelDashboard } from '@adaptabletools/adaptable/src/View/Components/Panels/PanelDashboard';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import { Report } from '@adaptabletools/adaptable/src/PredefinedConfig/ExportState';
import { Flex } from 'rebass';
import Dropdown from '@adaptabletools/adaptable/src/components/Dropdown';
import join from '@adaptabletools/adaptable/src/components/utils/join';
import {
  LiveDataChangedEventArgs,
  LiveDataChangedInfo,
} from '@adaptabletools/adaptable/src/Api/Events/LiveDataChanged';
import { OpenFinReport } from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';

import { ButtonPlay } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonPlay';
import { ButtonSchedule } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonSchedule';
import { EMPTY_STRING } from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import { ButtonPause } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonPause';

import { OpenFinApi } from '@adaptabletools/adaptable/src/Api/OpenFinApi';
import { CreateEmptyOpenFinSchedule } from '@adaptabletools/adaptable/src/Utilities/ObjectFactory';

interface OpenFinToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<OpenFinToolbarControlComponent> {
  onOpenFinStartLiveData: (OpenFinreport: OpenFinReport) => OpenFinRedux.OpenFinStartLiveDataAction;

  onOpenFinStopLiveData: (OpenFinreport: OpenFinReport) => OpenFinRedux.OpenFinStopLiveDataAction;

  onNewOpenFinSchedule: () => PopupRedux.PopupShowScreenAction;

  Columns: AdaptableColumn[];
  Reports: Report[] | undefined;
  SystemReports: Report[] | undefined;
  CurrentLiveOpenFinReport: OpenFinReport | undefined;
  IsOpenFinRunning: boolean;
}

interface OpenFinToolbarControlComponentState {
  ReportName: string;
}

class OpenFinToolbarControlComponent extends React.Component<
  OpenFinToolbarControlComponentProps,
  OpenFinToolbarControlComponentState
> {
  constructor(props: OpenFinToolbarControlComponentProps) {
    super(props);
    this.state = {
      ReportName: '',
    };
  }

  public componentDidMount() {
    this.props.Api.eventApi.on('LiveDataChanged', this.onLiveDataChanged);
  }

  public componentWillUnmount() {
    this.props.Api.eventApi.off('LiveDataChanged', this.onLiveDataChanged);
  }

  onLiveDataChanged = (liveDataChangedEventArgs: LiveDataChangedEventArgs) => {
    let liveDataChangedInfo: LiveDataChangedInfo = liveDataChangedEventArgs.data[0].id;
    if (
      liveDataChangedInfo.ReportDestination == 'OpenFin' &&
      (liveDataChangedInfo.LiveDataTrigger == 'Connected' ||
        liveDataChangedInfo.LiveDataTrigger == 'Disconnected')
    ) {
      this.forceUpdate();
    }
  };

  getOpenFinApi(): OpenFinApi {
    return this.props.Api.pluginsApi.getPluginApi('openfin');
  }

  render(): any {
    let allReports: Report[] = this.props
      .SystemReports!.filter(s =>
        this.props.Api.internalApi.getReportService().IsSystemReportActive(s)
      )
      .concat(this.props.Reports);

    let availableReports: any[] = allReports.map(report => {
      return {
        label: report.Name,
        value: report.Name,
      };
    });

    // this is clearly ridiculous!
    // im getting tired...
    let isCompletedReport: boolean = StringExtensions.IsNotNullOrEmpty(this.state.ReportName);

    let isLiveOpenFinReport: boolean =
      isCompletedReport &&
      this.props.CurrentLiveOpenFinReport &&
      this.state.ReportName == this.props.CurrentLiveOpenFinReport.ReportName;

    let content = (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__OpenFin__wrap">
        <Dropdown
          disabled={allReports.length == 0 || isLiveOpenFinReport}
          style={{ minWidth: 140 }}
          options={availableReports}
          className="ab-DashboardToolbar__OpenFin__select"
          placeholder="Select Report"
          onChange={(reportName: string) => this.onSelectedReportChanged(reportName)}
          value={this.state.ReportName} // do props and update after we change????
          showClearButton
          marginRight={2}
        ></Dropdown>
        {isLiveOpenFinReport ? (
          <ButtonPause
            marginLeft={1}
            className="ab-DashboardToolbar__OpenFin__pause"
            onClick={() => this.getOpenFinApi().stopLiveData()}
            tooltip="Stop sync with OpenFin"
            disabled={!isLiveOpenFinReport}
            AccessLevel={this.props.AccessLevel}
          />
        ) : (
          <ButtonPlay
            marginLeft={1}
            className="ab-DashboardToolbar__OpenFin__play"
            onClick={() => this.onOpenFinStartLiveData()}
            tooltip="Start sync with OpenFin"
            disabled={isLiveOpenFinReport || !isCompletedReport}
            AccessLevel={this.props.AccessLevel}
          />
        )}

        <Flex
          className={join(
            this.props.AccessLevel == 'ReadOnly' ? GeneralConstants.READ_ONLY_STYLE : '',
            'ab-DashboardToolbar__OpenFin__controls'
          )}
          alignItems="stretch"
        >
          <ButtonSchedule
            marginLeft={1}
            className="ab-DashboardToolbar__OpenFin__schedule"
            onClick={() => this.onNewOpenFinSchedule()}
            tooltip="Schedule"
            AccessLevel={this.props.AccessLevel}
          />
        </Flex>
      </Flex>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__OpenFin"
        headerText={StrategyConstants.OpenFinStrategyFriendlyName}
        showConfigureButton={false}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  onSelectedReportChanged(reportName: string) {
    if (StringExtensions.IsNotNullOrEmpty(reportName) && reportName !== 'Select Report') {
      this.setState({ ReportName: reportName });
    } else {
      this.setState({ ReportName: EMPTY_STRING });
    }
  }

  private onOpenFinStartLiveData() {
    this.getOpenFinApi().startLiveData(this.createOpenFinReportFromState());
  }

  private onNewOpenFinSchedule() {
    // let OpenFinSchedule: OpenFinSchedule = {
    //   ...ObjectFactory.CreateEmptyBaseSchedule(ScheduleType.OpenFin),
    //   OpenFinReport: this.createOpenFinReportFromState(),
    //   Transmission: 'Live Data',
    // };

    this.props.onNewOpenFinSchedule();
  }

  // perhaps this should be props and in real state?
  private createOpenFinReportFromState(): OpenFinReport {
    return {
      ReportName: this.state.ReportName,
    };
  }
}

function mapStateToProps(state: AdaptableState): Partial<OpenFinToolbarControlComponentProps> {
  return {
    CurrentLiveOpenFinReport: state.System.CurrentLiveOpenFinReport,
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,

    IsOpenFinRunning: !!state.System.CurrentLiveOpenFinReport,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<OpenFinToolbarControlComponentProps> {
  return {
    onNewOpenFinSchedule: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ScheduleStrategyId,
          ScreenPopups.SchedulePopup,
          {
            action: 'New',
            source: 'Toolbar',
            value: CreateEmptyOpenFinSchedule(),
          }
        )
      ),

    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.OpenFinStrategyId, ScreenPopups.OpenFinPopup)
      ),
  };
}

export let OpenFinToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenFinToolbarControlComponent);
