import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import * as IPushPullRedux from '../Redux/ActionReducers/IPushPullRedux';
import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/DashboardRedux';
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
  IPushPullReport,
  IPushPullDomain,
  IPushPullSchedule,
} from '@adaptabletools/adaptable/src/PredefinedConfig/IPushPullState';
import { ButtonExport } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonExport';
import { ButtonLogin } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonLogin';
import { ButtonPlay } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonPlay';
import { ButtonSchedule } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonSchedule';
import { EMPTY_STRING } from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import { ButtonPause } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonPause';
import ObjectFactory from '@adaptabletools/adaptable/src/Utilities/ObjectFactory';
import { ButtonNewPage } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonNewPage';
import { ButtonLogout } from '@adaptabletools/adaptable/src/View/Components/Buttons/ButtonLogout';
import { AdaptableDashboardToolbar } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Types';

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
    this.props.api.eventApi.on('LiveDataChanged', this.onLiveDataChanged);
  }

  public componentWillUnmount() {
    this.props.api.eventApi.off('LiveDataChanged', this.onLiveDataChanged);
  }

  onLiveDataChanged = (liveDataChangedEventArgs: LiveDataChangedEventArgs) => {
    let liveDataChangedInfo: LiveDataChangedInfo = liveDataChangedEventArgs.data[0].id;
    if (
      liveDataChangedInfo.ReportDestination == 'ipushpull' &&
      (liveDataChangedInfo.LiveDataTrigger == 'Connected' ||
        liveDataChangedInfo.LiveDataTrigger == 'Disconnected')
    ) {
      this.forceUpdate();
    }
  };

  getIPPApi() {
    return this.props.api.pluginsApi.getPluginApi('ipushpull');
  }

  render(): any {
    let systemReports: Report[] = this.getIPPApi().includeSystemReports()
      ? this.props.SystemReports
      : [];

    let allReports: Report[] = systemReports!
      .filter(s => this.props.api.internalApi.getReportService().IsSystemReportActive(s))
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
          accessLevel={this.props.accessLevel}
        />
        {isLiveIPushPullReport ? (
          <ButtonPause
            marginLeft={1}
            className="ab-DashboardToolbar__IPushPull__pause"
            onClick={() => this.props.onIPushPullStopLiveData()}
            tooltip="Stop sync with ipushpull"
            disabled={!isLiveIPushPullReport}
            accessLevel={this.props.accessLevel}
          />
        ) : (
          <ButtonPlay
            marginLeft={1}
            className="ab-DashboardToolbar__IPushPull__play"
            onClick={() => this.onIPushPullStartLiveData()}
            tooltip="Start sync with ipushpull"
            disabled={isLiveIPushPullReport || !isCompletedReport}
            accessLevel={this.props.accessLevel}
          />
        )}
        {isCompletedReport && (
          <Flex
            className={join(
              this.props.accessLevel == 'ReadOnly' ? GeneralConstants.READ_ONLY_STYLE : '',
              'ab-DashboardToolbar__IPushPull__controls'
            )}
            alignItems="stretch"
          >
            {this.props.api.entitlementsApi.isFunctionFullEntitlement('Schedule') && (
              <ButtonSchedule
                marginLeft={1}
                className="ab-DashboardToolbar__IPushPull__schedule"
                onClick={() => this.onNewIPushPullSchedule()}
                tooltip="Schedule"
                disabled={isLiveIPushPullReport || !isCompletedReport}
                accessLevel={this.props.accessLevel}
              />
            )}
          </Flex>
        )}{' '}
        <ButtonNewPage
          marginLeft={1}
          className="ab-DashboardToolbar__IPushPull__newpage"
          onClick={() => this.props.onShowAddIPushPullPage()}
          tooltip="New Page"
          disabled={isLiveIPushPullReport}
          accessLevel={this.props.accessLevel}
        />
        <ButtonLogout
          marginLeft={1}
          className="ab-DashboardToolbar__IPushPull__logout"
          onClick={() => this.getIPPApi().logoutFromIPushPull()}
          tooltip="Logout"
          disabled={isLiveIPushPullReport}
          accessLevel={this.props.accessLevel}
        />
      </Flex>
    ) : (
      <ButtonLogin
        marginLeft={1}
        className="ab-DashboardToolbar__IPushPull__login"
        onClick={() => this.props.onShowIPushPullLogin()}
        tooltip="Login to ipushpull"
        accessLevel={this.props.accessLevel}
      >
        {' '}
        Login
      </ButtonLogin>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__IPushPull"
        headerText={StrategyConstants.IPushPullStrategyFriendlyName}
        showConfigureButton={false} // later : isIPushPullRunning
        onConfigure={() => this.props.onConfigure()}
        onClose={() => this.props.onClose('IPushPull')}
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
      let avaialablePages = this.getIPPApi().getPagesForIPushPullDomain(folder);
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
    CurrentLiveIPushPullReport: state.System.CurrentLiveIPushPullReport,
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    IPushPullDomainsPages: state.System.IPushPullDomainsPages || [],
    IsIPushPullRunning: state.System.IsIPushPullRunning,
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
          undefined,
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
          undefined,
          {
            footer: false,
          }
        )
      ),

    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.IPushPullStrategyId,
          ScreenPopups.IPushPullPopup
        )
      ),
    onClose: (toolbar: AdaptableDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardCloseToolbar(toolbar)),
  };
}

export let IPushPullToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(IPushPullToolbarControlComponent);
