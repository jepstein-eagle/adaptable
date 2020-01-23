import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { Report } from '../../PredefinedConfig/ExportState';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';
import Dropdown from '../../components/Dropdown';
import join from '../../components/utils/join';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import { LiveDataChangedEventArgs, LiveDataChangedInfo } from '../../Api/Events/LiveDataChanged';
import {
  IPushPullReport,
  IPushPullDomain,
  IPushPullSchedule,
} from '../../PredefinedConfig/IPushPullState';
import { ButtonExport } from '../Components/Buttons/ButtonExport';
import { ButtonLogin } from '../Components/Buttons/ButtonLogin';
import { ButtonPlay } from '../Components/Buttons/ButtonPlay';
import { ButtonSchedule } from '../Components/Buttons/ButtonSchedule';
import { EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { ButtonPause } from '../Components/Buttons/ButtonPause';
import ObjectFactory from '../../Utilities/ObjectFactory';
import { ButtonNewPage } from '../Components/Buttons/ButtonNewPage';
import { ButtonLogout } from '../Components/Buttons/ButtonLogout';

interface IPushPullToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<IPushPullToolbarControlComponent> {
  onIPushPullSendSnapshot: (
    iPushPulleport: IPushPullReport
  ) => IPushPullRedux.IPushPullSendSnapshotAction;
  onIPushPullStartLiveData: (
    iPushPulleport: IPushPullReport
  ) => IPushPullRedux.IPushPullStartLiveDataAction;

  onIPushPullStopLiveData: () => IPushPullRedux.IPushPullStopLiveDataAction;

  onNewIPushPullSchedule: (
    iPushPullSchedule: IPushPullSchedule
  ) => PopupRedux.PopupShowScreenAction;

  onShowIPushPullLogin: () => PopupRedux.PopupShowScreenAction;
  onShowAddIPushPullPage: () => PopupRedux.PopupShowScreenAction;

  Columns: AdaptableColumn[];
  Reports: Report[] | undefined;
  SystemReports: Report[] | undefined;
  CurrentLiveIPushPullReport: IPushPullReport | undefined;
  IPushPullDomainsPages: IPushPullDomain[] | undefined;
  IsIPushPullRunning: boolean;
}

interface IPushPullToolbarControlComponentState {
  ReportName: string;
  Page: string;
  Folder: string;
  AvailablePages: string[];
}

class IPushPullToolbarControlComponent extends React.Component<
  IPushPullToolbarControlComponentProps,
  IPushPullToolbarControlComponentState
> {
  constructor(props: IPushPullToolbarControlComponentProps) {
    super(props);
    this.state = {
      ReportName: '',
      Page: '',
      Folder: '',
      AvailablePages: [],
    };
  }

  public componentDidMount() {
    if (this.props.Adaptable) {
      this.props.Adaptable.api.eventApi.on(
        'LiveDataChanged',
        (liveDataChangedEventArgs: LiveDataChangedEventArgs) => {
          let liveDataChangedInfo: LiveDataChangedInfo = liveDataChangedEventArgs.data[0].id;
          if (
            liveDataChangedInfo.LiveDataTrigger == 'Connected' ||
            liveDataChangedInfo.LiveDataTrigger == 'Disconnected'
          ) {
            this.forceUpdate();
          }
        }
      );
    }
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

    let availableFolders: any[] = this.props.IPushPullDomainsPages.map(
      (iPushPullDomain: IPushPullDomain) => {
        return {
          label: iPushPullDomain.Name,
          value: iPushPullDomain.Name,
        };
      }
    );

    // this is clearly ridiculous!
    // im getting tired...
    let isCompletedReport: boolean =
      StringExtensions.IsNotNullOrEmpty(this.state.ReportName) &&
      StringExtensions.IsNotNullOrEmpty(this.state.Folder) &&
      StringExtensions.IsNotNullOrEmpty(this.state.Page);

    let isLiveIPushPullReport: boolean =
      isCompletedReport &&
      this.props.CurrentLiveIPushPullReport &&
      this.state.ReportName == this.props.CurrentLiveIPushPullReport.ReportName &&
      this.state.Folder == this.props.CurrentLiveIPushPullReport.Folder &&
      this.state.Page == this.props.CurrentLiveIPushPullReport.Page;

    let content = this.props.IsIPushPullRunning ? (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__IPushPull__wrap">
        <Dropdown
          disabled={allReports.length == 0 || isLiveIPushPullReport}
          style={{ minWidth: 140 }}
          options={availableReports}
          className="ab-DashboardToolbar__IPushPull__select"
          placeholder="Select Report"
          onChange={(reportName: string) => this.onSelectedReportChanged(reportName)}
          value={this.state.ReportName} // do props and update after we change????
          showClearButton
          marginRight={2}
        ></Dropdown>
        <Dropdown
          disabled={allReports.length == 0 || isLiveIPushPullReport}
          style={{ minWidth: 140 }}
          options={availableFolders}
          className="ab-DashboardToolbar__IPushPull__select"
          onChange={(folder: string) => this.onFolderChanged(folder)}
          value={this.state.Folder}
          placeholder="Select Folder"
          marginRight={2}
        ></Dropdown>
        <Dropdown
          disabled={allReports.length == 0 || isLiveIPushPullReport}
          style={{ minWidth: 140 }}
          options={this.state.AvailablePages}
          className="ab-DashboardToolbar__IPushPull__select"
          placeholder="Select Page"
          onChange={(page: string) => this.onPageChanged(page)}
          value={this.state.Page ? this.state.Page : null}
          showClearButton
          marginRight={2}
        ></Dropdown>
        <ButtonExport
          marginLeft={1}
          className="ab-DashboardToolbar__IPushPull__export"
          onClick={() => this.onIPushPullSendSnapshot()}
          tooltip="Send Snapshot to ipushpull"
          disabled={isLiveIPushPullReport || !isCompletedReport}
          AccessLevel={this.props.AccessLevel}
        />
        {isLiveIPushPullReport ? (
          <ButtonPause
            marginLeft={1}
            className="ab-DashboardToolbar__IPushPull__pause"
            onClick={() => this.props.onIPushPullStopLiveData()}
            tooltip="Stop sync with ipushpull"
            disabled={!isLiveIPushPullReport}
            AccessLevel={this.props.AccessLevel}
          />
        ) : (
          <ButtonPlay
            marginLeft={1}
            className="ab-DashboardToolbar__IPushPull__play"
            onClick={() => this.onIPushPullStartLiveData()}
            tooltip="Start Sync with ipushpull"
            disabled={isLiveIPushPullReport || !isCompletedReport}
            AccessLevel={this.props.AccessLevel}
          />
        )}
        {isCompletedReport && (
          <Flex
            className={join(
              this.props.AccessLevel == AccessLevel.ReadOnly
                ? GeneralConstants.READ_ONLY_STYLE
                : '',
              'ab-DashboardToolbar__IPushPull__controls'
            )}
            alignItems="stretch"
          >
            <ButtonSchedule
              marginLeft={1}
              className="ab-DashboardToolbar__IPushPull__schedule"
              onClick={() => this.onNewIPushPullSchedule()}
              tooltip="Schedule"
              disabled={isLiveIPushPullReport || !isCompletedReport}
              AccessLevel={this.props.AccessLevel}
            />
          </Flex>
        )}{' '}
        <ButtonNewPage
          marginLeft={1}
          className="ab-DashboardToolbar__IPushPull__newpage"
          onClick={() => this.props.onShowAddIPushPullPage()}
          tooltip="New Page"
          disabled={isLiveIPushPullReport}
          AccessLevel={this.props.AccessLevel}
        />
        <ButtonLogout
          marginLeft={1}
          className="ab-DashboardToolbar__IPushPull__logout"
          onClick={() => this.props.Adaptable.api.iPushPullApi.logoutFromIPushPull()}
          tooltip="Logout"
          disabled={isLiveIPushPullReport}
          AccessLevel={this.props.AccessLevel}
        />
      </Flex>
    ) : (
      <ButtonLogin
        marginLeft={1}
        className="ab-DashboardToolbar__IPushPull__login"
        onClick={() => this.props.onShowIPushPullLogin()}
        tooltip="Send to ipushpull"
        AccessLevel={this.props.AccessLevel}
      >
        {' '}
        Login
      </ButtonLogin>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__IPushPull"
        headerText={StrategyConstants.IPushPullStrategyFriendlyName}
        glyphicon={StrategyConstants.IPushPullGlyph}
        onClose={() => this.props.onClose(StrategyConstants.IPushPullStrategyId)}
        showConfigureButton={false} // later : isIPushPullRunning
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

  private onFolderChanged(folder: string) {
    if (StringExtensions.IsNotNullOrEmpty(folder) && folder !== 'Select Folder') {
      let avaialablePages = this.props.Adaptable.api.iPushPullApi.getPagesForIPushPullDomain(
        folder
      );
      this.setState({
        Folder: folder,
        AvailablePages: avaialablePages,
        Page: EMPTY_STRING,
      });
    } else {
      this.setState({
        Folder: EMPTY_STRING,
        AvailablePages: [],
        Page: EMPTY_STRING,
      });
    }
  }

  private onPageChanged(page: string) {
    if (StringExtensions.IsNotNullOrEmpty(page) && page !== 'Select Page') {
      this.setState({ Page: page });
    } else {
      this.setState({ Page: EMPTY_STRING });
    }
  }

  private onIPushPullSendSnapshot() {
    this.props.onIPushPullSendSnapshot(this.createIPushPullReportFromState());
  }

  private onIPushPullStartLiveData() {
    this.props.onIPushPullStartLiveData(this.createIPushPullReportFromState());
  }

  private onNewIPushPullSchedule() {
    let iPushPullSchedule: IPushPullSchedule = ObjectFactory.CreateIPushPullSchedule(
      this.createIPushPullReportFromState()
    );
    this.props.onNewIPushPullSchedule(iPushPullSchedule);
  }

  // perhaps this should be props and in real state?
  private createIPushPullReportFromState(): IPushPullReport {
    return {
      ReportName: this.state.ReportName,
      Folder: this.state.Folder,
      Page: this.state.Page,
    };
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    CurrentLiveIPushPullReport: state.IPushPull.CurrentLiveIPushPullReport,
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    IPushPullDomainsPages: state.IPushPull.IPushPullDomainsPages,
    IsIPushPullRunning: state.IPushPull.IsIPushPullRunning,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onIPushPullSendSnapshot: (iPushPullReport: IPushPullReport) =>
      dispatch(IPushPullRedux.IPushPullSendSnapshot(iPushPullReport)),
    onIPushPullStartLiveData: (iPushPullReport: IPushPullReport) =>
      dispatch(IPushPullRedux.IPushPullStartLiveData(iPushPullReport)),
    onIPushPullStopLiveData: () => dispatch(IPushPullRedux.IPushPullStopLiveData()),

    onNewIPushPullSchedule: (iPushPullSchedule: IPushPullSchedule) =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ScheduleStrategyId,
          ScreenPopups.SchedulePopup,
          {
            action: 'New',
            source: 'Toolbar',
            value: iPushPullSchedule,
          }
        )
      ),

    onShowIPushPullLogin: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.IPushPullStrategyId,
          ScreenPopups.IPushPullLoginPopup,
          null,
          {
            footer: false,
          }
        )
      ),

    onShowAddIPushPullPage: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.IPushPullStrategyId,
          ScreenPopups.IPushPullAddPagePopup,
          null,
          {
            footer: false,
          }
        )
      ),

    onClose: (toolbar: AdaptableDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardHideToolbar(toolbar)),

    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.IPushPullStrategyId,
          ScreenPopups.IPushPullPopup
        )
      ),
  };
}

export let IPushPullToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(IPushPullToolbarControlComponent);
