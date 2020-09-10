import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
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
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';

import { ButtonSchedule } from '../Components/Buttons/ButtonSchedule';
import ObjectFactory from '../../Utilities/ObjectFactory';
import { LiveDataChangedEventArgs } from '../../types';
import { LiveDataChangedInfo } from '../../Api/Events/LiveDataChanged';

const ExportIcon = icons.export as ReactComponentLike;

interface ExportToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<ExportToolPanelComponent> {
  onApplyExport: (
    report: Report,
    exportDestination: ExportDestination
  ) => ExportRedux.ExportApplyAction;
  onSelectReport: (Report: string) => ExportRedux.ReportSelectAction;
  onNewReport: () => PopupRedux.PopupShowScreenAction;
  onEditReport: () => PopupRedux.PopupShowScreenAction;
  onNewReportSchedule: (reportSchedule: ReportSchedule) => PopupRedux.PopupShowScreenAction;

  Columns: AdaptableColumn[];
  Reports: Report[] | undefined;
  SystemReports: Report[] | undefined;
  CurrentReport: string | undefined;
  //LiveReports: LiveReport[];
}

interface ExportToolPanelComponentState {
  IsMinimised: boolean;
}

class ExportToolPanelComponent extends React.Component<
  ExportToolPanelComponentProps,
  ExportToolPanelComponentState
> {
  constructor(props: ExportToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }

  public componentDidMount() {
    this.props.api.eventApi.on(
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

  render(): any {
    const selectReportString: string = 'Select a Report';
    let allReports: Report[] = this.props
      .SystemReports!.filter(s =>
        this.props.api.internalApi.getReportService().IsSystemReportActive(s)
      )
      .concat(this.props.Reports);

    let currentReport: Report = this.props.api.exportApi.getCurrentReport();

    let savedReport: Report | undefined = allReports.find(s => s.Name == this.props.CurrentReport);

    let currentReportId = StringExtensions.IsNullOrEmpty(this.props.CurrentReport)
      ? selectReportString
      : this.props.CurrentReport;

    let availableReports: any[] = allReports.map(report => {
      return {
        label: report.Name,
        value: report.Name,
        onClick: () => this.onSelectedReportChanged(report.Name),
      };
    });

    let csvMenuItem = {
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.CSV),
      label: 'CSV',
    };
    let excelMenuItem = {
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.Excel),
      label: 'Excel',
    };

    let jsonMenuItem = {
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.JSON),
      label: 'JSON',
    };
    let clipboardMenuItem = {
      label: 'Clipboard',
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.Clipboard),
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
    }
*/

    let deleteMessage: string = "Are you sure you want to delete '";
    if (savedReport != null) {
      deleteMessage = deleteMessage + savedReport.Name + "'?";
    }

    const exportItems = [
      this.props.api.exportApi.canExportToExcel() && excelMenuItem,
      ,
      csvMenuItem,
      clipboardMenuItem,
      jsonMenuItem,
      this.props.api.internalApi
        .getReportService()
        .IsReportDestinationActive(ExportDestination.OpenfinExcel) && openfinExcelMenuItem,
    ].filter(x => !!x);

    let content = (
      <Flex flexDirection="column" alignItems="stretch" className="ab-ToolPanel__Export__wrap">
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Export__wrap">
          <DropdownButton
            disabled={allReports.length == 0}
            style={{ minWidth: 160 }}
            items={availableReports}
            className="ab-ToolPanel__Export__select"
            showClearButton={!!currentReport}
            marginRight={2}
            marginBottom={1}
            onClear={() => this.onSelectedReportChanged(null)}
          >
            {currentReport?.Name ?? 'Select Report'}
          </DropdownButton>
        </Flex>
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Export_wrap">
          <DropdownButton
            className="ab-ToolPanel__Export__export"
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
              'ab-ToolPanel__Export__controls'
            )}
            alignItems="stretch"
          >
            <ButtonEdit
              onClick={() => this.props.onEditReport()}
              tooltip="Edit Report"
              className="ab-ToolPanel__Export__edit"
              disabled={
                savedReport == null ||
                this.props.api.internalApi.getReportService().IsSystemReport(savedReport)
              }
              accessLevel={this.props.accessLevel}
            />

            <ButtonNew
              variant="text"
              className="ab-ToolPanel__Export__new"
              tone="neutral"
              children={null}
              onClick={() => this.props.onNewReport()}
              tooltip="Create New Report"
              accessLevel={this.props.accessLevel}
            />

            <ButtonDelete
              tooltip="Delete Report"
              className="ab-ToolPanel__Export__delete"
              disabled={
                savedReport == null ||
                this.props.api.internalApi.getReportService().IsSystemReport(savedReport)
              }
              ConfirmAction={ExportRedux.ReportDelete(savedReport as Report)}
              ConfirmationMsg={deleteMessage}
              ConfirmationTitle={'Delete Report'}
              accessLevel={this.props.accessLevel}
            />

            <ButtonSchedule
              marginLeft={1}
              className="ab-DashboardToolbar__Export__schedule"
              onClick={() => this.onNewReportSchedule()}
              tooltip="Schedule"
              disabled={savedReport == null}
              accessLevel={this.props.accessLevel}
            />
          </Flex>
        </Flex>
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel__Export"
        headerText={StrategyConstants.ExportStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('Export')}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
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

function mapStateToProps(state: AdaptableState): Partial<ExportToolPanelComponentProps> {
  return {
    CurrentReport: state.Export.CurrentReport,
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    //  LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ExportToolPanelComponentProps> {
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
    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup)
      ),
  };
}

export let ExportToolPanel = connect(mapStateToProps, mapDispatchToProps)(ExportToolPanelComponent);
