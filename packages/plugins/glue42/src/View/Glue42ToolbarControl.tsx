import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import * as Glue42Redux from '../Redux/ActionReducers/Glue42Redux';
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
  Glue42Report,
  Glue42Schedule,
} from '@adaptabletools/adaptable/src/PredefinedConfig/Glue42State';
import { ButtonExport } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonExport';
import { ButtonLogin } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonLogin';
import { ButtonPlay } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonPlay';
import { ButtonSchedule } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonSchedule';
import { EMPTY_STRING } from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import { ButtonPause } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonPause';
import ObjectFactory from '@adaptabletools/adaptable/src/Utilities/ObjectFactory';
import { ButtonNewPage } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonNewPage';
import { ButtonLogout } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonLogout';

interface Glue42ToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<Glue42ToolbarControlComponent> {
  onGlue42SendSnapshot: (glue42report: Glue42Report) => Glue42Redux.Glue42SendSnapshotAction;

  onGlue42StartLiveData: (glue42report: Glue42Report) => Glue42Redux.Glue42StartLiveDataAction;

  onGlue42StopLiveData: () => Glue42Redux.Glue42StopLiveDataAction;

  onNewGlue42Schedule: (glue42Schedule: Glue42Schedule) => PopupRedux.PopupShowScreenAction;

  onShowGlue42Login: () => PopupRedux.PopupShowScreenAction;

  Columns: AdaptableColumn[];
  Reports: Report[] | undefined;
  SystemReports: Report[] | undefined;
  CurrentLiveGlue42Report: Glue42Report | undefined;
  IsGlue42Running: boolean;
  IsGlue42Available: boolean;
}

interface Glue42ToolbarControlComponentState {
  ReportName: string;
}

class Glue42ToolbarControlComponent extends React.Component<
  Glue42ToolbarControlComponentProps,
  Glue42ToolbarControlComponentState
> {
  constructor(props: Glue42ToolbarControlComponentProps) {
    super(props);
    this.state = {
      ReportName: '',
    };
  }

  public componentDidMount() {
    this.props.api.eventApi.on('LiveDataChanged', this.onLiveDataChanged);
  }

  public componentWillUnmount() {
    this.props.api.eventApi.off('LiveDataChanged', this.onLiveDataChanged);
  }

  onLiveDataChanged = (liveDataChangedEventArgs: LiveDataChangedEventArgs) => {
    let liveDataChangedInfo: LiveDataChangedInfo = liveDataChangedEventArgs.data[0].id;
    if (
      liveDataChangedInfo.ReportDestination == 'Glue42' &&
      (liveDataChangedInfo.LiveDataTrigger == 'Connected' ||
        liveDataChangedInfo.LiveDataTrigger == 'Disconnected')
    ) {
      this.forceUpdate();
    }
  };

  getGlue42Api() {
    return this.props.api.pluginsApi.getPluginApi('glue42');
  }

  render(): any {
    let allReports: Report[] = this.props
      .SystemReports!.filter(s =>
        this.props.api.internalApi.getReportService().IsSystemReportActive(s)
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

    let isLiveGlue42Report: boolean =
      isCompletedReport &&
      this.props.CurrentLiveGlue42Report &&
      this.state.ReportName == this.props.CurrentLiveGlue42Report.ReportName;

    let content = this.props.IsGlue42Running ? (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__Glue42__wrap">
        <Dropdown
          disabled={allReports.length == 0 || isLiveGlue42Report}
          style={{ minWidth: 140 }}
          options={availableReports}
          className="ab-DashboardToolbar__Glue42__select"
          placeholder="Select Report"
          onChange={(reportName: string) => this.onSelectedReportChanged(reportName)}
          value={this.state.ReportName} // do props and update after we change????
          showClearButton
          marginRight={2}
        ></Dropdown>
        <ButtonExport
          marginLeft={1}
          className="ab-DashboardToolbar__Glue42__export"
          onClick={() => this.onGlue42SendSnapshot()}
          tooltip="Send Snapshot to Glue42"
          disabled={isLiveGlue42Report || !isCompletedReport}
          AccessLevel={this.props.AccessLevel}
        />
        {isCompletedReport && (
          <Flex
            className={join(
              this.props.AccessLevel == 'ReadOnly' ? GeneralConstants.READ_ONLY_STYLE : '',
              'ab-DashboardToolbar__Glue42__controls'
            )}
            alignItems="stretch"
          >
            <ButtonSchedule
              marginLeft={1}
              className="ab-DashboardToolbar__Glue42__schedule"
              onClick={() => this.onNewGlue42Schedule()}
              tooltip="Schedule"
              disabled={isLiveGlue42Report || !isCompletedReport}
              AccessLevel={this.props.AccessLevel}
            />
          </Flex>
        )}{' '}
        <ButtonLogout
          marginLeft={1}
          className="ab-DashboardToolbar__Glue42_logout"
          onClick={() => this.getGlue42Api().logoutFromGlue42()}
          tooltip="Logout"
          disabled={isLiveGlue42Report}
          AccessLevel={this.props.AccessLevel}
        />
      </Flex>
    ) : (
      <ButtonLogin
        marginLeft={1}
        className="ab-DashboardToolbar__Glue42__login"
        onClick={() => this.props.onShowGlue42Login()}
        tooltip="Login to Glue42"
        AccessLevel={this.props.AccessLevel}
      >
        {' '}
        Login
      </ButtonLogin>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__Glue42"
        headerText={StrategyConstants.Glue42StrategyFriendlyName}
        showConfigureButton={false} // later : isGlue42Running
        onConfigure={() => this.props.onConfigure()}
      >
        {content || 'no glue42'}
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

  private onGlue42SendSnapshot() {
    this.props.onGlue42SendSnapshot(this.createGlue42ReportFromState());
  }

  private onGlue42StartLiveData() {
    this.props.onGlue42StartLiveData(this.createGlue42ReportFromState());
  }

  private onNewGlue42Schedule() {
    let Glue42Schedule: Glue42Schedule = ObjectFactory.CreateGlue42Schedule(
      this.createGlue42ReportFromState()
    );
    this.props.onNewGlue42Schedule(Glue42Schedule);
  }

  // perhaps this should be props and in real state?
  private createGlue42ReportFromState(): Glue42Report {
    return {
      ReportName: this.state.ReportName,
    };
  }
}

function mapStateToProps(state: AdaptableState): Partial<Glue42ToolbarControlComponentProps> {
  return {
    CurrentLiveGlue42Report: state.System.CurrentLiveGlue42Report,
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    IsGlue42Available: state.System.IsGlue42Available,
    IsGlue42Running: state.System.IsGlue42Running,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<Glue42ToolbarControlComponentProps> {
  return {
    onGlue42SendSnapshot: (glue42report: Glue42Report) =>
      dispatch(Glue42Redux.Glue42SendSnapshot(glue42report)),

    onGlue42StartLiveData: (glue42report: Glue42Report) =>
      dispatch(Glue42Redux.Glue42StartLiveData(glue42report)),
    onGlue42StopLiveData: () => dispatch(Glue42Redux.Glue42StopLiveData()),

    onNewGlue42Schedule: (Glue42Schedule: Glue42Schedule) =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ScheduleStrategyId,
          ScreenPopups.SchedulePopup,
          {
            action: 'New',
            source: 'Toolbar',
            value: Glue42Schedule,
          }
        )
      ),

    onShowGlue42Login: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.Glue42StrategyId,
          ScreenPopups.Glue42LoginPopup,
          null,
          {
            footer: false,
          }
        )
      ),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.Glue42StrategyId, ScreenPopups.Glue42Popup)
      ),
  };
}

export let Glue42ToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(Glue42ToolbarControlComponent);
