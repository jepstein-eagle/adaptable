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
import {
  OpenFinReport,
  OpenFinSchedule,
} from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';
import { ButtonExport } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonExport';
import { ButtonLogin } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonLogin';
import { ButtonPlay } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonPlay';
import { ButtonSchedule } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonSchedule';
import { EMPTY_STRING } from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import { ButtonPause } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonPause';
import ObjectFactory from '@adaptabletools/adaptable/src/Utilities/ObjectFactory';
import { ButtonNewPage } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonNewPage';
import { ButtonLogout } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonLogout';

interface OpenFinToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<OpenFinToolbarControlComponent> {
  onOpenFinSendSnapshot: (OpenFinreport: OpenFinReport) => OpenFinRedux.OpenFinSendSnapshotAction;

  onOpenFinStartLiveData: (OpenFinreport: OpenFinReport) => OpenFinRedux.OpenFinStartLiveDataAction;

  onOpenFinStopLiveData: () => OpenFinRedux.OpenFinStopLiveDataAction;

  onNewOpenFinSchedule: (OpenFinSchedule: OpenFinSchedule) => PopupRedux.PopupShowScreenAction;

  onShowOpenFinLogin: () => PopupRedux.PopupShowScreenAction;

  Columns: AdaptableColumn[];
  Reports: Report[] | undefined;
  SystemReports: Report[] | undefined;
  CurrentLiveOpenFinReport: OpenFinReport | undefined;
  IsOpenFinRunning: boolean;
  IsOpenFinAvailable: boolean;
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
    if (this.props.Adaptable) {
      this.props.Adaptable.api.eventApi.on('LiveDataChanged', this.onLiveDataChanged);
    }
  }

  public componentWillUnmount() {
    if (this.props.Adaptable) {
      this.props.Adaptable.api.eventApi.off('LiveDataChanged', this.onLiveDataChanged);
    }
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

  getOpenFinApi() {
    return this.props.Adaptable.api.pluginsApi.getPluginApi('OpenFinapi');
  }

  render(): any {
    let allReports: Report[] = this.props
      .SystemReports!.filter(s => this.props.Adaptable.ReportService.IsSystemReportActive(s))
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

    let content = this.props.IsOpenFinRunning ? (
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
        <ButtonExport
          marginLeft={1}
          className="ab-DashboardToolbar__OpenFin__export"
          onClick={() => this.onOpenFinSendSnapshot()}
          tooltip="Send Snapshot to OpenFin"
          disabled={isLiveOpenFinReport || !isCompletedReport}
          AccessLevel={this.props.AccessLevel}
        />
        {isCompletedReport && (
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
              disabled={isLiveOpenFinReport || !isCompletedReport}
              AccessLevel={this.props.AccessLevel}
            />
          </Flex>
        )}{' '}
        <ButtonLogout
          marginLeft={1}
          className="ab-DashboardToolbar__OpenFin_logout"
          onClick={() => this.getOpenFinApi().logoutFromOpenFin()}
          tooltip="Logout"
          disabled={isLiveOpenFinReport}
          AccessLevel={this.props.AccessLevel}
        />
      </Flex>
    ) : (
      <ButtonLogin
        marginLeft={1}
        className="ab-DashboardToolbar__OpenFin__login"
        onClick={() => this.props.onShowOpenFinLogin()}
        tooltip="Login to OpenFin"
        AccessLevel={this.props.AccessLevel}
      >
        {' '}
        Login
      </ButtonLogin>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__OpenFin"
        headerText={StrategyConstants.OpenFinStrategyFriendlyName}
        showConfigureButton={false} // later : isOpenFinRunning
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

  private onOpenFinSendSnapshot() {
    this.props.onOpenFinSendSnapshot(this.createOpenFinReportFromState());
  }

  private onOpenFinStartLiveData() {
    this.props.onOpenFinStartLiveData(this.createOpenFinReportFromState());
  }

  private onNewOpenFinSchedule() {
    let OpenFinSchedule: OpenFinSchedule = ObjectFactory.CreateOpenFinSchedule(
      this.createOpenFinReportFromState()
    );
    this.props.onNewOpenFinSchedule(OpenFinSchedule);
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
    CurrentLiveOpenFinReport: state.OpenFin.CurrentLiveOpenFinReport,
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    IsOpenFinAvailable: state.OpenFin.IsOpenFinAvailable,
    IsOpenFinRunning: state.OpenFin.IsOpenFinRunning,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<OpenFinToolbarControlComponentProps> {
  return {
    onOpenFinSendSnapshot: (OpenFinreport: OpenFinReport) =>
      dispatch(OpenFinRedux.OpenFinSendSnapshot(OpenFinreport)),

    onOpenFinStartLiveData: (OpenFinreport: OpenFinReport) =>
      dispatch(OpenFinRedux.OpenFinStartLiveData(OpenFinreport)),
    onOpenFinStopLiveData: () => dispatch(OpenFinRedux.OpenFinStopLiveData()),

    onNewOpenFinSchedule: (OpenFinSchedule: OpenFinSchedule) =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ScheduleStrategyId,
          ScreenPopups.SchedulePopup,
          {
            action: 'New',
            source: 'Toolbar',
            value: OpenFinSchedule,
          }
        )
      ),

    onShowOpenFinLogin: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.OpenFinStrategyId,
          ScreenPopups.OpenFinLoginPopup,
          null,
          {
            footer: false,
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
