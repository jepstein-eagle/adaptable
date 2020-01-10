import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { Report } from '../../PredefinedConfig/ExportState';
import { ExportDestination, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';
import Dropdown from '../../components/Dropdown';
import icons from '../../components/icons';
import join from '../../components/utils/join';
import { ReactComponentLike } from 'prop-types';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import {
  LiveReportUpdatedEventArgs,
  LiveReport,
  LiveReportUpdatedInfo,
} from '../../Api/Events/LiveReportUpdated';
import { IPushPullReport } from '../../PredefinedConfig/IPushPullState';
import { ButtonExport } from '../Components/Buttons/ButtonExport';
import { ButtonLogin } from '../Components/Buttons/ButtonLogin';
import { ButtonPlay } from '../Components/Buttons/ButtonPlay';
import { ButtonStop } from '../Components/Buttons/ButtonStop';

const ExportIcon = icons.export as ReactComponentLike;

interface IPushPullToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<IPushPullToolbarControlComponent> {
  onIPushPullExport: (
    iPushPulleport: IPushPullReport,
    isLiveReport: boolean
  ) => IPushPullRedux.IPushPullExportAction;
  onSelectReport: (iPushPullReport: string) => IPushPullRedux.IPushPullReportSelectAction;
  onNewReport: () => PopupRedux.PopupShowScreenAction;
  onEditReport: () => PopupRedux.PopupShowScreenAction;
  onReportStopLive: (Report: Report) => SystemRedux.ReportStopLiveAction;
  Columns: AdaptableColumn[];
  IPushPullReports: IPushPullReport[] | undefined;
  CurrentIPushPullReport: string | undefined;
  LiveReports: LiveReport[];
}

class IPushPullToolbarControlComponent extends React.Component<
  IPushPullToolbarControlComponentProps,
  {}
> {
  public componentDidMount() {
    if (this.props.Adaptable) {
      this.props.Adaptable.api.eventApi.on(
        'LiveReportUpdated',
        (liveReportUpdatedEventArgs: LiveReportUpdatedEventArgs) => {
          let liveReportUpdatedInfo: LiveReportUpdatedInfo = liveReportUpdatedEventArgs.data[0].id;
          if (
            liveReportUpdatedInfo.LiveReportTrigger == 'Connected' ||
            liveReportUpdatedInfo.LiveReportTrigger == 'Disconnected'
          ) {
            this.forceUpdate();
          }
        }
      );
    }
  }

  render(): any {
    let isIpushPullAvailable = this.props.Adaptable.api.iPushPullApi.isIPushPullAvailable();
    let allReports: IPushPullReport[] = this.props.IPushPullReports;
    let currentIPushPullReport: IPushPullReport = this.props.Adaptable.api.iPushPullApi.getCurrentIPushPullReport();

    let savedIPushPullReport: IPushPullReport | undefined = allReports.find(
      s => s.Report.Name == this.props.CurrentIPushPullReport
    );

    let availableReports: any[] = allReports.map((iPushPullReport: IPushPullReport) => {
      return {
        label: iPushPullReport.Report.Name,
        value: iPushPullReport.Report.Name,
      };
    });

    let isLiveIPushPullReport: boolean = this.props.Adaptable.api.iPushPullApi.isIPushPullReportLive(
      currentIPushPullReport
    );

    let deleteMessage: string = "Are you sure you want to delete '";
    if (savedIPushPullReport != null) {
      deleteMessage = deleteMessage + savedIPushPullReport.Report.Name + "'?";
    }

    let content = isIpushPullAvailable ? (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__Export__wrap">
        <Dropdown
          disabled={allReports.length == 0 || isLiveIPushPullReport}
          style={{ minWidth: 160 }}
          options={availableReports}
          className="ab-DashboardToolbar__Export__select"
          placeholder="Select Report"
          onChange={(reportName: string) => this.onSelectedReportChanged(reportName)}
          value={currentIPushPullReport ? currentIPushPullReport.Report.Name : null}
          showClearButton
          marginRight={2}
        ></Dropdown>

        <ButtonExport
          marginLeft={1}
          className="ab-DashboardToolbar__ColumnFilter__clear"
          onClick={() => this.props.onIPushPullExport(currentIPushPullReport, false)}
          tooltip="Send Snapshot to iPushPull"
          disabled={
            isLiveIPushPullReport ||
            savedIPushPullReport == null ||
            StringExtensions.IsNullOrEmpty(this.props.CurrentIPushPullReport)
          }
          AccessLevel={this.props.AccessLevel}
        />
        {isLiveIPushPullReport ? (
          <ButtonStop
            marginLeft={1}
            className="ab-DashboardToolbar__ColumnFilter__clear"
            onClick={() => this.props.onReportStopLive(currentIPushPullReport.Report)}
            tooltip="Stop sync with iPushPull"
            disabled={
              savedIPushPullReport == null ||
              StringExtensions.IsNullOrEmpty(this.props.CurrentIPushPullReport)
            }
            AccessLevel={this.props.AccessLevel}
          />
        ) : (
          <ButtonPlay
            marginLeft={1}
            className="ab-DashboardToolbar__ColumnFilter__clear"
            onClick={() => this.props.onIPushPullExport(currentIPushPullReport, true)}
            tooltip="Start Sync with iPushPull"
            disabled={
              savedIPushPullReport == null ||
              StringExtensions.IsNullOrEmpty(this.props.CurrentIPushPullReport)
            }
            AccessLevel={this.props.AccessLevel}
          />
        )}
        <Flex
          className={join(
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : '',
            'ab-DashboardToolbar__Export__controls'
          )}
          alignItems="stretch"
        >
          <ButtonEdit
            onClick={() => this.props.onEditReport()}
            tooltip="Edit Report"
            className="ab-DashboardToolbar__Export__edit"
            disabled={
              isLiveIPushPullReport ||
              savedIPushPullReport == null ||
              this.props.Adaptable.ReportService.IsSystemReport(savedIPushPullReport.Report)
            }
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonNew
            variant="text"
            className="ab-DashboardToolbar__Export__new"
            tone="neutral"
            disabled={isLiveIPushPullReport}
            children={null}
            onClick={() => this.props.onNewReport()}
            tooltip="Create New Report"
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonDelete
            tooltip="Delete Report"
            className="ab-DashboardToolbar__Export__delete"
            disabled={
              isLiveIPushPullReport ||
              savedIPushPullReport == null ||
              this.props.Adaptable.ReportService.IsSystemReport(savedIPushPullReport.Report)
            }
            ConfirmAction={IPushPullRedux.IPushPullReportDelete(
              savedIPushPullReport as IPushPullReport
            )}
            ConfirmationMsg={deleteMessage}
            ConfirmationTitle={'Delete Report'}
            AccessLevel={this.props.AccessLevel}
          />
        </Flex>
      </Flex>
    ) : (
      <ButtonLogin
        marginLeft={1}
        className="ab-DashboardToolbar__ColumnFilter__clear"
        onClick={() => this.onLogin()}
        tooltip="Send to iPushPull"
        AccessLevel={this.props.AccessLevel}
      >
        {' '}
        Login
      </ButtonLogin>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__Export"
        headerText={StrategyConstants.IPushPullStrategyFriendlyName}
        glyphicon={StrategyConstants.IPushPullGlyph}
        onClose={() => this.props.onClose(StrategyConstants.IPushPullStrategyId)}
        showConfigureButton={isIpushPullAvailable}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  onLogin(): void {
    this.props.Adaptable.api.iPushPullApi.showIPushPullLogin();
  }

  onSelectedReportChanged(reportName: string) {
    this.props.onSelectReport(reportName);
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    CurrentIPushPullReport: state.IPushPull.CurrentIPushPullReport,
    IPushPullReports: state.IPushPull.IPushPullReports,
    LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onIPushPullExport: (iPushPulleport: IPushPullReport, isLiveReport: boolean) =>
      dispatch(IPushPullRedux.IPushPullExport(iPushPulleport, isLiveReport)),
    onSelectReport: (iPushPullReport: string) =>
      dispatch(IPushPullRedux.IPushPullReportSelect(iPushPullReport)),
    onReportStopLive: (Report: Report) =>
      dispatch(SystemRedux.ReportStopLive(Report, ExportDestination.iPushPull)),
    onNewReport: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.IPushPullStrategyId,
          ScreenPopups.IPushPullPopup,
          {
            action: 'New',
            source: 'Toolbar',
          }
        )
      ),
    onEditReport: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.IPushPullStrategyId,
          ScreenPopups.IPushPullPopup,
          {
            action: 'Edit',
            source: 'Toolbar',
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
