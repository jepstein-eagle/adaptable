import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonSchedule } from '../Components/Buttons/ButtonSchedule';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { Report, ReportSchedule } from '../../PredefinedConfig/ExportState';
import { ExportDestination, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';
import Dropdown from '../../components/Dropdown';
import DropdownButton from '../../components/DropdownButton';
import icons from '../../components/icons';
import join from '../../components/utils/join';
import { ReactComponentLike } from 'prop-types';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import {
  LiveReportUpdatedEventArgs,
  LiveReport,
  LiveReportUpdatedInfo,
} from '../../Api/Events/LiveReportUpdated';
import { isIP } from 'net';
import ObjectFactory from '../../Utilities/ObjectFactory';

const ExportIcon = icons.export as ReactComponentLike;

interface ExportToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ExportToolbarControlComponent> {
  onApplyExport: (
    Report: Report,
    exportDestination: ExportDestination,
    isLiveReport: boolean
  ) => ExportRedux.ExportApplyAction;
  onSelectReport: (Report: string) => ExportRedux.ReportSelectAction;
  onNewReport: () => PopupRedux.PopupShowScreenAction;
  onEditReport: () => PopupRedux.PopupShowScreenAction;
  onReportStopLive: (
    Report: Report,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42
  ) => SystemRedux.ReportStopLiveAction;

  onNewReportSchedule: (reportSchedule: ReportSchedule) => PopupRedux.PopupShowScreenAction;

  Columns: AdaptableColumn[];
  Reports: Report[] | undefined;
  SystemReports: Report[] | undefined;
  CurrentReport: string | undefined;
  LiveReports: LiveReport[];
}

class ExportToolbarControlComponent extends React.Component<
  ExportToolbarControlComponentProps,
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
    const selectReportString: string = 'Select a Report';
    let allReports: Report[] = this.props.SystemReports!.concat(this.props.Reports);
    let currentReport: Report = this.props.Adaptable.api.exportApi.getReportByName(
      this.props.CurrentReport
    );
    let savedReport: Report | undefined = allReports.find(s => s.Name == this.props.CurrentReport);
    let currentReportId = StringExtensions.IsNullOrEmpty(this.props.CurrentReport)
      ? selectReportString
      : this.props.CurrentReport;
    let availableReports: any[] = allReports.map(report => {
      return {
        label: report.Name,
        value: report.Name,
      };
    });

    let csvMenuItem = {
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.CSV, false),
      label: 'CSV',
    };

    let jsonMenuItem = {
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.JSON, false),
      label: 'JSON',
    };
    let clipboardMenuItem = {
      label: 'Clipboard',
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.Clipboard, false),
    };

    let openfinExcelMenuItem;
    if (
      this.props.LiveReports.find(
        x => x.Report == currentReport && x.ReportDestination == ExportDestination.OpenfinExcel
      )
    ) {
      openfinExcelMenuItem = {
        onClick: () => this.props.onReportStopLive(currentReport, ExportDestination.OpenfinExcel),
        label: 'Stop Live Openfin Excel',
      };
    } else {
      openfinExcelMenuItem = {
        onClick: () =>
          this.props.onApplyExport(currentReport, ExportDestination.OpenfinExcel, true),
        label: 'Start Live Openfin Excel',
      };
    }

    let isGlueLiveReport: boolean = this.props.Adaptable.ReportService.IsReportLiveReport(
      currentReport,
      ExportDestination.Glue42
    );
    let glue42MenuItem = {
      onClick: () =>
        this.props.onApplyExport(currentReport, ExportDestination.Glue42, isGlueLiveReport),
      label: 'Export to Excel (via Glue42)',
    };

    let deleteMessage: string = "Are you sure you want to delete '";
    if (savedReport != null) {
      deleteMessage = deleteMessage + savedReport.Name + "'?";
    }

    const exportItems = [
      csvMenuItem,
      clipboardMenuItem,
      jsonMenuItem,
      this.props.Adaptable.ReportService.IsReportDestinationActive(
        ExportDestination.OpenfinExcel
      ) && openfinExcelMenuItem,

      this.props.Adaptable.ReportService.IsReportDestinationActive(ExportDestination.Glue42) &&
        glue42MenuItem,
    ].filter(x => !!x);

    let content = (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__Export__wrap">
        <Dropdown
          disabled={allReports.length == 0}
          style={{ minWidth: 160 }}
          options={availableReports}
          className="ab-DashboardToolbar__Export__select"
          placeholder="Select Report"
          onChange={(reportName: string) => this.onSelectedReportChanged(reportName)}
          value={currentReport ? currentReport.Name : null}
          showClearButton
          marginRight={2}
        ></Dropdown>

        <DropdownButton
          className="ab-DashboardToolbar__Export__export"
          columns={['label']}
          variant="text"
          disabled={currentReportId == selectReportString}
          items={exportItems}
        >
          <ExportIcon />
        </DropdownButton>
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
              savedReport == null || this.props.Adaptable.ReportService.IsSystemReport(savedReport)
            }
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonNew
            variant="text"
            className="ab-DashboardToolbar__Export__new"
            tone="neutral"
            children={null}
            onClick={() => this.props.onNewReport()}
            tooltip="Create New Report"
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonDelete
            tooltip="Delete Report"
            className="ab-DashboardToolbar__Export__delete"
            disabled={
              savedReport == null || this.props.Adaptable.ReportService.IsSystemReport(savedReport)
            }
            ConfirmAction={ExportRedux.ReportDelete(savedReport as Report)}
            ConfirmationMsg={deleteMessage}
            ConfirmationTitle={'Delete Report'}
            AccessLevel={this.props.AccessLevel}
          />
          <ButtonSchedule
            marginLeft={1}
            className="ab-DashboardToolbar__Export__schedule"
            onClick={() => this.onNewReportSchedule()}
            tooltip="Schedule"
            disabled={savedReport == null}
            AccessLevel={this.props.AccessLevel}
          />
        </Flex>
      </Flex>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__Export"
        headerText={StrategyConstants.ExportStrategyFriendlyName}
        glyphicon={StrategyConstants.ExportGlyph}
        onClose={() => this.props.onClose(StrategyConstants.ExportStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  onSelectedReportChanged(reportName: string) {
    this.props.onSelectReport(reportName);
  }

  private onNewReportSchedule() {
    let reportSchedule: ReportSchedule = ObjectFactory.CreateReportSchedule(
      this.props.CurrentReport
    );
    this.props.onNewReportSchedule(reportSchedule);
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    CurrentReport: state.Export.CurrentReport,
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onApplyExport: (report: Report, exportDestination: ExportDestination, isLiveReport: boolean) =>
      dispatch(ExportRedux.ExportApply(report, exportDestination, isLiveReport)),
    onSelectReport: (Report: string) => dispatch(ExportRedux.ReportSelect(Report)),
    onReportStopLive: (
      Report: Report,
      exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42
    ) => dispatch(SystemRedux.ReportStopLive(Report, exportDestination)),
    onNewReport: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup, {
          action: 'New',
          source: 'Toolbar',
        })
      ),
    onEditReport: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup, {
          action: 'Edit',
          source: 'Toolbar',
        })
      ),

    onNewReportSchedule: (reportSchedule: ReportSchedule) =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ScheduleStrategyId,
          ScreenPopups.SchedulePopup,
          {
            action: 'New',
            source: 'Toolbar',
            value: reportSchedule,
          }
        )
      ),

    onClose: (toolbar: AdaptableDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardHideToolbar(toolbar)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup)
      ),
  };
}

export let ExportToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportToolbarControlComponent);
