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
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';
import Dropdown from '../../components/Dropdown';
import DropdownButton from '../../components/DropdownButton';
import icons from '../../components/icons';
import join from '../../components/utils/join';
import { ReactComponentLike } from 'prop-types';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';

import ObjectFactory from '../../Utilities/ObjectFactory';
import { LiveDataChangedEventArgs } from '../../types';
import { LiveDataChangedInfo } from '../../Api/Events/LiveDataChanged';

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

  onNewReportSchedule: (reportSchedule: ReportSchedule) => PopupRedux.PopupShowScreenAction;

  Columns: AdaptableColumn[];
  Reports: Report[] | undefined;
  SystemReports: Report[] | undefined;
  CurrentReport: string | undefined;
  // LiveReports: LiveReport[];
}

class ExportToolbarControlComponent extends React.Component<
  ExportToolbarControlComponentProps,
  {}
> {
  public componentDidMount() {
    this.props.api.eventApi.on('LiveDataChanged', this.onLiveDataChanged);
  }

  public componentWillUnmount() {
    this.props.api.eventApi.off('LiveDataChanged', this.onLiveDataChanged);
  }

  onLiveDataChanged = (liveDataChangedEventArgs: LiveDataChangedEventArgs) => {
    let liveDataChangedInfo: LiveDataChangedInfo = liveDataChangedEventArgs.data[0].id;
    if (
      liveDataChangedInfo.LiveDataTrigger == 'Connected' ||
      liveDataChangedInfo.LiveDataTrigger == 'Disconnected'
    ) {
      this.forceUpdate();
    }
  };

  render(): any {
    const selectReportString: string = 'Select a Report';
    let allReports: Report[] = this.props
      .SystemReports!.filter(s =>
        this.props.api.internalApi.getReportService().IsSystemReportActive(s)
      )
      .concat(this.props.Reports);
    let currentReport: Report = this.props.api.exportApi.getReportByName(this.props.CurrentReport);
    let savedReport: Report | undefined = allReports.find(s => s.Name == this.props.CurrentReport);
    let currentReportId = StringExtensions.IsNullOrEmpty(this.props.CurrentReport)
      ? selectReportString
      : this.props.CurrentReport;
    let availableReports: any[] = allReports.map(report => {
      return {
        label: report.Name,
        value: report.Name,
        // onClick: () => this.onSelectedReportChanged(report.Name),
      };
    });

    let csvMenuItem = {
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.CSV, false),
      label: 'CSV',
    };

    let excelMenuItem = {
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.Excel, false),
      label: 'Excel',
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
    /*
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
    }*/

    let deleteMessage: string = "Are you sure you want to delete '";
    if (savedReport != null) {
      deleteMessage = deleteMessage + savedReport.Name + "'?";
    }

    const exportItems = [
      this.props.api.exportApi.canExportToExcel() && excelMenuItem,
      csvMenuItem,
      clipboardMenuItem,
      jsonMenuItem,
      this.props.api.internalApi
        .getReportService()
        .IsReportDestinationActive(ExportDestination.OpenfinExcel) && openfinExcelMenuItem,
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
        {/*
        <DropdownButton
          marginRight={2}
          columns={['label']}
          className="ab-DashboardToolbar__Export__select"
          items={availableReports}
          placeholder="Select"
          disabled={availableReports.length == 0}
          variant={'text'}
          tone={'neutral'}
        >
          {currentReport ? currentReport.Name : 'Select Report'}
        </DropdownButton>
*/}
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
            this.props.accessLevel == 'ReadOnly' ? GeneralConstants.READ_ONLY_STYLE : '',
            'ab-DashboardToolbar__Export__controls'
          )}
          alignItems="stretch"
        >
          <ButtonEdit
            onClick={() => this.props.onEditReport()}
            tooltip="Edit Report"
            className="ab-DashboardToolbar__Export__edit"
            disabled={
              savedReport == null ||
              this.props.api.internalApi.getReportService().IsSystemReport(savedReport) ||
              savedReport.ReportColumnScope == 'CustomColumns'
            }
            accessLevel={this.props.accessLevel}
          />

          <ButtonNew
            variant="text"
            className="ab-DashboardToolbar__Export__new"
            tone="neutral"
            children={null}
            onClick={() => this.props.onNewReport()}
            tooltip="Create New Report"
            accessLevel={this.props.accessLevel}
          />

          <ButtonDelete
            tooltip="Delete Report"
            className="ab-DashboardToolbar__Export__delete"
            disabled={
              savedReport == null ||
              this.props.api.internalApi.getReportService().IsSystemReport(savedReport)
            }
            ConfirmAction={ExportRedux.ReportDelete(savedReport as Report)}
            ConfirmationMsg={deleteMessage}
            ConfirmationTitle={'Delete Report'}
            accessLevel={this.props.accessLevel}
          />
          {this.props.api.entitlementsApi.isFunctionFullEntitlement('Schedule') && (
            <ButtonSchedule
              marginLeft={1}
              className="ab-DashboardToolbar__Export__schedule"
              onClick={() => this.onNewReportSchedule()}
              tooltip="Schedule"
              disabled={savedReport == null}
              accessLevel={this.props.accessLevel}
            />
          )}
        </Flex>
      </Flex>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__Export"
        headerText={StrategyConstants.ExportStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onClose={() => this.props.onClose('Export')}
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

function mapStateToProps(state: AdaptableState): Partial<ExportToolbarControlComponentProps> {
  return {
    CurrentReport: state.Export.CurrentReport,
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    //   LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ExportToolbarControlComponentProps> {
  return {
    onApplyExport: (report: Report, exportDestination: ExportDestination) =>
      dispatch(ExportRedux.ExportApply(report, exportDestination)),
    onSelectReport: (Report: string) => dispatch(ExportRedux.ReportSelect(Report)),
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
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup)
      ),
    onClose: (toolbar: AdaptableDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardCloseToolbar(toolbar)),
  };
}

export let ExportToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportToolbarControlComponent);
